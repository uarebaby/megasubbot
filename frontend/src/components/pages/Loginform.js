import { Container, Form, FloatingLabel, Button} from 'react-bootstrap';
import React, { useState } from "react";
import AuthService from "../../services/auth"


function Loginform(prop) {
  const [user, setUser] = useState({"email" : null , "password" : null});
  const [loading, setLoad] = useState(false);
  const [msg, setMsg] = useState("");

  function handleSubmit(event) {

    event.preventDefault();
    //console.log(user)
    setLoad(true);
    AuthService.login(user.email, user.password).then(
        (response) => {
          //this.props.router.navigate("/profile");
          //Show success and delay and redirect
          window.location.reload();
          //console.log(response)
        },
        error => {
          console.log(user.email);
          console.log(error.response);

          setLoad(false);
          setMsg()
          //Handle show error
        }
      );
    
  }
  
  
  return (
    <Container fluid className = 'd-flex align-items-center py-4 bg-body-tertiary vsc-initialized h-100'>
        <main className="form-signin w-100 m-auto">
          <Form onSubmit={handleSubmit}>
            <img className="" src={prop.logo} alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" onChange={e => setUser({"email" : e.target.value , "password" : user.password})}  />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" onChange={e => setUser({"email" : user.email, "password" : e.target.value })} />
              </FloatingLabel>
            
          
            <div class="form-check text-start my-3">
              <Form.Check // prettier-ignore
                type="checkbox"
                id={`default-checkbox`}
                label={`Remember me`}
              />
            </div>
            <Button variant="primary" className = "w-100 py-2" type="submit">Login</Button>{' '}
          </Form>
        </main>
      </Container>
    

  );
}

export default Loginform;
