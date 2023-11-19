import { Container, Form, FloatingLabel, Button, Alert} from 'react-bootstrap';
import React, { useState } from "react";
import AuthService from "../../services/auth";


function Loginform(prop) {
  const [user, setUser] = useState({"email" : localStorage.getItem("rememberUser")  , "password" : null});
  const [loading, setLoad] = useState(false);
  const [checkRemember, setcheckRemember] = useState(localStorage.getItem('rememberUser')!=null);


  let rememberUser = localStorage.getItem('rememberUser');
  if(rememberUser)
  {
    //setUser({"email" : rememberUser , "password" : user.password});
    //setcheckRemember(true);
  }

  function handleSubmit(event) {

    event.preventDefault();
    //console.log(user)
    setLoad(true);
    
    if(checkRemember) 
    {
      localStorage.setItem('rememberUser',user.email);
    }
    else if(!checkRemember && rememberUser)
    {
      localStorage.removeItem('rememberUser');
    }
    AuthService.login(user.email, user.password).then(
        (response) => {
          //this.props.router.navigate("/profile");
          //Show success and delay and redirect
          console.log(response.message);
          prop.showMsg("success",response.message);
          //toast.success(response.message);
          setTimeout(() => {  window.location.reload(); }, 4000);
          //console.log(response)
        },
        error => {

          console.log(error);
          try{
            prop.showMsg("error",error.response.data.message);
            //toast.error(error.response.data.message);
          }
          catch(e)
          {
            prop.showMsg("error","Network Error!");
            //toast.error("Network Error!");
          }
          
          setLoad(false);
          //Handle show error
        }
      )
    
  }

 
  
  
  return (
    <Container fluid className = 'd-flex align-items-center py-4 bg-body-tertiary vsc-initialized h-100'>
        <main className="form-signin w-100 m-auto">
          <Form onSubmit={handleSubmit}>
          <fieldset disabled={loading}>
            <img className="" src={prop.logo} alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" value={user.email} onChange={e => setUser({"email" : e.target.value , "password" : user.password})}  />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" onChange={e => setUser({"email" : user.email, "password" : e.target.value })} />
              </FloatingLabel>
            
          
            <div class="form-check text-start my-3">
              <Form.Check // prettier-ignore
                type="checkbox"
                id={`default-checkbox`}
                label={`Remember me`}
                checked={checkRemember}
                onChange={e => setcheckRemember(e.target.checked)}
              />
            </div>
            <Button variant="primary" className = "w-100 py-2" type="submit">Login</Button>{' '}
            </fieldset>
          </Form>
          
        </main>
      </Container>
    

  );
}

export default Loginform;
