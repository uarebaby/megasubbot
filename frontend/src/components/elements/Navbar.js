import { Container, Nav, Navbar, Button, Form, NavDropdown} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from "../../services/auth";
import React ,{ useState, useEffect } from "react";
import {
  getUserEmail, getUserToken, setUserData, getUserData
} from '../../redux/userSlice'
import { useSelector, useDispatch } from 'react-redux'



function NavBarMain(prop) {
  const navigate = useNavigate();
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  let email = "";
  const logout_event = async () =>
  {
    await AuthService.logout();
    navigate("/");
    window.location.reload();
  };
  
 // console.log(userData);
 // if(prop.userdetail)
 // {
 //   email = prop.userdetail.email;
 // }
  if (userData.xtoken && userData.email )
  {
    email = userData.email
  }

  return (
    <Navbar expand="md" className="bg-body-tertiary py-3 fixed-top" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#home" className="fs-4 text-white mb-0">
            <img
              alt=""
              src={prop.logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Megasubbot
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {userData.xtoken !== "" ? 
            <>
            <Nav.Link href="#features">Backtest</Nav.Link>
            <Nav.Link href="/strategymain">Strategy</Nav.Link>
            <NavDropdown title="Settings" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">API Settings</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
              
            </NavDropdown>
            </>:<></>}
            { userData.xtoken !== "" ? <Nav.Link href="./logout" className="d-block d-md-none">Log-out</Nav.Link>
            :<> <Nav.Link href="./register" className="d-block d-md-none">Sign-up</Nav.Link> 
            <Nav.Link href="./login" className="d-block d-md-none">Login</Nav.Link> </> }
            
          </Nav>
          <Nav className="ms-auto link-light d-flex">
            <Container fluid="md">
              <Form className="d-flex d-none d-md-block">
                { email != "" ? <><Form.Label className = "me-2" >{ email } </Form.Label> {'  '} </> : <></>}
                { userData.xtoken !== "" ? <Button variant="danger" className = "me-2" onClick={logout_event }>Log-out</Button>:
                <> 
                <Button variant="primary" className = "me-2" onClick={()=> navigate("/register")}>Sign-up</Button>{' '}
                <Button variant="primary" onClick={()=> navigate("/login")}>Login</Button>{' '}
                 </> }
              </Form>
            </Container>
          </Nav>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>

  );
}

export default NavBarMain;
