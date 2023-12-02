import NavBarMain  from './components/elements/Navbar';
import Loginform  from './components/pages/Loginform';
import Dashboard  from './components/pages/Dashboard';
import Registerform  from './components/pages/Registerform';
import Strategymain  from './components/pages/Strategymain';
//import { Container } from 'react-bootstrap';
//import { Container, Form, FloatingLabel, Button} from 'react-bootstrap';
import logo from './staticfile/logo.svg';
import { Routes, Route, Navigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getUserEmail, getUserToken, setUserData, getUserData
} from './redux/userSlice'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  let user = localStorage.getItem('user');

  let showMsg = (type,message) => 
  {
    if(type == "error")
      toast.error(message);
    else if(type == "success")
      toast.success(message);
  }

  if(user) {
    user = JSON.parse(user);
    dispatch(setUserData({
      email: user.email,
      xtoken: user.xtoken
    }))
  }
 // console.log("dddd");
console.log(userData);
  return (
    <>
      <NavBarMain logo={logo} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={user ? <Dashboard logo={logo} showMsg = {showMsg} /> : <Navigate to="/login" /> } />
        <Route path="login" element={user ? <Navigate to="/dashboard" />: <Loginform logo={logo} showMsg = {showMsg} />} />
        <Route path="register" element={ <Registerform logo={logo} showMsg = {showMsg} /> } />
        <Route path="dashboard" element={user ? <Dashboard logo={logo} showMsg = {showMsg} /> : <Navigate to="/login" /> } />
        <Route path="strategymain" element={user ? <Strategymain logo={logo} showMsg = {showMsg} /> : <Navigate to="/login" /> } />
      </Routes>
      
    </>
  );
}
//<Route exact path="/login">
//  {localStorage.getItem("auth_token") ? <Redirect to="/" /> : <Route path="/login" element={<Login />}/>}
//</Route>

export default App;
