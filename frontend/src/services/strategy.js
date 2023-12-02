import axios from "axios";
import authHeader from "./authheader";

const API_URL = process.env.REACT_APP_API_URL;
const HEADERS = authHeader();


class StrategyService {
  getAllItems() {
    return axios
      .get(API_URL + "strategy",  
      {
          headers: HEADERS
      })
      .then(response => {
        return response.data;
      });
  }

  getItemsById(strategy_id) {
    return axios
      .get(API_URL + "strategy/" + strategy_id.toString() +"/",
      {
          headers: HEADERS
      })
      .then(response => {
        return response.data;
      });
  } 

  deleteItemsById(strategy_id) {
    return axios
      .delete(API_URL + "strategy/" + strategy_id.toString() +"/",
      {
          headers: HEADERS
      })
      .then(response => {
        return response.data;
      });
  }

  createItem(strategy_name,strategy_description) {
    return axios
      .post(API_URL + "strategy",
      {
       "name" : strategy_name,
       "description" : strategy_description
      },
      {
          headers: HEADERS
      })
      .then(response => {
        return response.data;
      });
  } 

  updateItem(strategy_id,strategy_name,strategy_description) {
    return axios
      .put(API_URL + "strategy",
      {
       "id": strategy_id,
       "name" : strategy_name,
       "description" : strategy_description
      },
      {
          headers: HEADERS
      })
      .then(response => {
        return response.data;
      });
  } 



}

export default new StrategyService();