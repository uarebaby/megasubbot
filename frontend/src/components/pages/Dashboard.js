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
          //window.location.reload();
          console.log(response)
        },
        error => {
          console.log(user.email);
          console.log(error.response);

          setLoad(false);
          setMsg()
        }
      );
    
  }
  
  
  return (
    <Container fluid className = 'd-flex align-items-center py-4 bg-body-tertiary vsc-initialized h-100'>
        <div>Dashboard</div>
      </Container>
    

  );
}

export default Loginform;
