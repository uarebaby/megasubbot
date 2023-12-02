import { Container, Form, FloatingLabel, Button, Table, Row, Col, Alert} from 'react-bootstrap';
import React ,{ useState, useEffect } from "react";
import {
  getUserEmail, getUserToken, setUserData, getUserData
} from '../../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StrategyService from '../../services/strategy';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from 'react-bootstrap/Modal';

function DeletedModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Are you sure you want to delete this strategy?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4></h4>
        <p>
          This strategy and its contents will no longer exist once deleted.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="danger" onClick={props.deleteItem}><DeleteIcon/>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

function CreateStrategyModal(props) {
  const [strategyName, setstrategyName] = useState("");
  const [strategyDescription, setstrategyDescription] = useState("");

  function createItem(event) {
    event.preventDefault();
    StrategyService.createItem(strategyName,strategyDescription).then(
      (response) => {
        props.showMsg("success",response.message);
        props.onHide();
      },
      error => {

        console.log(error);
        try{
          props.showMsg("error",error.response.data.message);
        }
        catch(e)
        {
          props.showMsg("error","Network Error!");
        }
        
      }
    )
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Create new strategy
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
      <Form.Group className="mb-3" controlId="ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Strategy name" onChange={e => setstrategyName(e.target.value )} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={e => setstrategyDescription(e.target.value )} />
      </Form.Group>
    </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="primary" onClick={e => createItem(e) } disabled={ strategyName == ""}><DeleteIcon/>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Strategymain(prop) {
  const navigate = useNavigate();
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const [strategyAllItems, setstrategyAllItems] = useState([]);
  const [modalConfirm, setmodalConfirmShow] = useState(false);
  const [selectedItem, setselectedItem] = useState();
  const [modalForm, setmodalFormShow] = useState(false);

  function deleteHandler(event,strategyId) {
    setselectedItem(strategyId);
    setmodalConfirmShow(true);
  }

  function createNewStrategy(event) {
    setmodalFormShow(true);
  }

  function deleteItem(event) {
    StrategyService.deleteItemsById(selectedItem).then(
      (response) => {
        console.log(response)
        prop.showMsg("success",response.message);
        setselectedItem();
        setmodalConfirmShow(false);
      },
      error => {

        console.log(error);
        try{
          prop.showMsg("error",error.response.data.message);
        }
        catch(e)
        {
          prop.showMsg("error","Network Error!");
        }
        
      }
    )
    setmodalConfirmShow(false);
    setselectedItem();
  }

  useEffect(() => {
    //Runs on every render
    StrategyService.getAllItems().then(
      (response) => {
        //console.log(response)
        setstrategyAllItems(response);
        console.log(strategyAllItems)
      },
      error => {
        console.log(error);
        try{
          prop.showMsg("error",error.response.data.message);
        }
        catch(e)
        {
          prop.showMsg("error","Network Error!");
        }
      }
    )
  },[modalForm, modalConfirm]);

  
  return (
    
    <Container fluid className = 'align-items-center pt-5' >
      <h1 className = 'pt-5'>Strategy</h1>
      <br/>
      <Row>
        <Col sm="6" lg="8"><Button variant="info" onClick={(e) => createNewStrategy(e)}>Create new + </Button></Col>
        <Col sm="5" lg="3"><Form.Control type="text" placeholder="Search" /></Col>
        <Col sm="1" lg="1"><Button variant="primary">Search</Button></Col>
      </Row>
      <br/>
      { strategyAllItems.length > 0 ? 
      <>
      <Table striped hover responsive="sm">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
        { strategyAllItems.map((strategyItem) => (
            <tr>
            <td></td>
            <td>{strategyItem.name}</td>
            <td>{strategyItem.description}</td>
            <td>
            <Button variant="alert" onClick={(e) => deleteHandler(e,strategyItem.id)} ><DeleteIcon color="primary"/></Button>
            </td>
          </tr>
          )) }
          </tbody>
        </Table>
      
      </> 
      : <Alert key="" variant="light">
          <Container className='d-flex justify-content-center' >No data</Container>
        </Alert>
      }

      <DeletedModal
        show={modalConfirm}
        onHide={() => {setmodalConfirmShow(false); setselectedItem();}}
        deleteItem = {deleteItem}
        
      />
      <CreateStrategyModal
        show={modalForm}
        onHide={() => {setmodalFormShow(false);}}
        showMsg = {prop.showMsg}
      />
      </Container>
  );
}

export default Strategymain;
