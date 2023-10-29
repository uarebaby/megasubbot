import NavBarMain  from './components/elements/Navbar';
import Loginform  from './components/pages/Loginform';
import Dashboard  from './components/pages/Dashboard';
import Registerform  from './components/pages/Registerform';
//import { Container } from 'react-bootstrap';
//import { Container, Form, FloatingLabel, Button} from 'react-bootstrap';
import logo from './staticfile/logo.svg';
import { Routes, Route, Navigate  } from "react-router-dom";


function App() {
  let user = localStorage.getItem('user');
  
  if(user) {
    user = JSON.parse(user);
  }
  return (
    <>
      <NavBarMain logo={logo} userdetail = {user} />
      {/*<Loginform logo={logo} /> */}
      <Routes>
        <Route path="/" element={user ? <Dashboard logo={logo} /> : <Navigate to="/login" /> } />
        <Route path="login" element={user ? <Navigate to="/dashboard" />: <Loginform logo={logo} />} />
        <Route path="register" element={ <Registerform logo={logo} /> } />
        <Route path="dashboard" element={user ? <Dashboard logo={logo} /> : <Navigate to="/login" /> } />

      </Routes>
      
    </>
  );
}
//<Route exact path="/login">
//  {localStorage.getItem("auth_token") ? <Redirect to="/" /> : <Route path="/login" element={<Login />}/>}
//</Route>

export default App;
