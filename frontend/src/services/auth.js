import axios from "axios";

const API_URL = "http://localhost:5000/";
const HEADERS={
            "Access-Control-Allow-Origin" : "*",
            "Content-Type": "application/json"
}

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login",  {
        "email" : email,
        "password" : password
      }, {
          headers: HEADERS
      })
      .then(response => {
        if (response.data.data.xtoken) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }
        
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email, password) {
    return axios
      .post(API_URL + "register", 
      {
        "email" : email,
        "password" : password
      }, {
        headers: HEADERS
      })
      .then(response => 
      {
        return response.data;
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();