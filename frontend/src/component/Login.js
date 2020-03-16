import React, { useContext } from "react";
import { loginApi } from "../utils/api";
import { UserContext } from "./context/userContext";

export function Login() {
  const { user, setUser } = useContext(UserContext);
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // handleChange(e) {
  //   this.setState({ username: e.target.value });
  // }
  // handleChangePassword(e) {
  //   this.setState({ password: e.target.value });
  // }
  // handleSubmit = async (e) => {
  //   //call the api here with current state value (this.state.username)
  //   e.preventDefault();
  //   const user = {};

  //   // axios
  //   //   .post(`${ROOT_URL}/api/login`, {
  //   //     username: this.state.username,
  //   //     password: this.state.password
  //   //   })
  //   //   .then(res => {
  //   //     console.log(res);
  //   //     console.log(res.data);
  //   //     localStorage.setItem('bazaar_token', res.data.user.token);
  //   //     window.location = "/"; //This line of code will redirect you once the submission is succeed
  //   //   });
  // }

  const authHandler = async () => {
    try {
      setLoading(true);
      const result = await loginApi({
        username: userEmail,
        password: userPassword
      });
      if (!result.error) {
        console.log(result);
        setUser(result.user);
      } else {
        console.log(result);
      }
    } catch (err) {
      setLoading(false);
      //showError(err.message);
    }
  };

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        authHandler();
      }}
    >
      <header>Sign in</header>
      <br />
      <formgroup>
        <input
          type="email"
          name="email"
          value={userEmail}
          placeholder="ojuu@ojuu11.com"
          onChange={e => setUserEmail(e.target.value)}
        />
      </formgroup>
      <formgroup>
        <input
          type="password"
          name="password"
          value={userPassword}
          placeholder="asdf@123"
          onChange={e => setUserPassword(e.target.value)}
        />
      </formgroup>
      <button type="submit" disabled={loading} block={"true"}>
        {loading ? "Loading..." : "Sign In"}
      </button>
    </form>
  );
}

export default Login;
