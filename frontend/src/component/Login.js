import React, { Component } from "react";
import axios from "axios";
import { ROOT_URL } from "../config/config";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "ojuu@ojuu11.com", password: "asdf@123" };
  }
  handleChange(e) {
    this.setState({ username: e.target.value });
  }
  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  handleSubmit(e) {
    //call the api here with current state value (this.state.username)
    e.preventDefault();
    const user = {};
    axios
      .post(`${ROOT_URL}/api/login`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        localStorage.setItem('bazaar_token', res.data.user.token);
        window.location = "/"; //This line of code will redirect you once the submission is succeed
      });
  }
  render() {
    return (
      <form>
        <input
          onChange={this.handleChange.bind(this)}
          type="text"
          name="username"
          value={this.state.username}
          placeholder="email"
        />
        <input
          onChange={this.handleChangePassword.bind(this)}
          type="text"
          name="password"
          value={this.state.password}
          placeholder="password"
        />
        <button onClick={this.handleSubmit.bind(this)}>Submit</button>
      </form>
    );
  }
}

export default Login;
