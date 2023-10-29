import NavBarMain  from './Navbar';
import Loginform  from './Loginform';
//import { Container } from 'react-bootstrap';
//import { Container, Form, FloatingLabel, Button} from 'react-bootstrap';
import logo from './logo.svg';
import { Routes, Route, Navigate  } from "react-router-dom";


function App() {
  const user = localStorage.getItem('user');

  if(!user) {
    return <><NavBarMain logo={logo} /><Loginform logo={logo} /> </>
  }
  return (
    <>
      <NavBarMain logo={logo} />
      {/*<Loginform logo={logo} /> */}
      <Routes>
        <Route path="/" element={ <div> </div> } />
        <Route path="login" element={ <Loginform logo={logo} /> } />
        <Route path="register" element={ <Loginform logo={logo} /> } />
        <Route path="dashboard" element={user ? <Dashboard logo={logo} /> : <Navigate to="/login" /> } />

      </Routes>
      
    </>
  );
}
//<Route exact path="/login">
//  {localStorage.getItem("auth_token") ? <Redirect to="/" /> : <Route path="/login" element={<Login />}/>}
//</Route>

export default App;
