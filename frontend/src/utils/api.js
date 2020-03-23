import axios from "axios";
import { ROOT_URL } from "../config/config";

export const loginApi = async formProps => {
  try {
    console.log(formProps);
    //axios.defaults.headers.common["Authorization"] = cookies.get("token");
    const response = await axios.post(`${ROOT_URL}/api/login`, {
      username: formProps.username,
      password: formProps.password
    });
    if (response.status === 200) {
      localStorage.setItem("bazaar_token", response.data.user.token);
      return response.data;
    } else {
      return {
        error: "User name and password incorret"
      };
    }
  } catch (e) {
    return {
      error: "Error"
    };
  }
};

export const productListApi = async formProps => {
  try {
    const response = await axios.get(`${ROOT_URL}/api/products`);
    if (response.status === 200) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
};

export const addProductApi = async formProps => {
  try {
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("bazaar_token");
    const response = await axios.post(`${ROOT_URL}/api/baskets`, {
      formProps
    });
   
  } catch (e) {
    return [];
  }
};
