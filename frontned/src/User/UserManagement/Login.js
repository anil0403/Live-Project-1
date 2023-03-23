import { useState } from "react";
import { userLogin } from "../../Api/ApiHandler";
const Login = (props) => {
  // defininf sates
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const login = (e) => {
    e.preventDefault();
    userLogin(email, password).then((response) => {
      props.loginState(response.state, response.token, response.voter_data);
      // console.log("response data")
      // console.log(response.token);
      // console.log(`token = ${response.token}`)
      sessionStorage.setItem("voterInfo", JSON.stringify(response.voter_data));
      // sessionStorage.setItem("voterInfo",response.voter_data);

      setAlert(response.message);
      setEmail("");
      setPassword("");
    });
  };

  return (
    <>
      <form onSubmit={login}>
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div class="alert">{alert}</div>
    </>
  );
};

export default Login;
