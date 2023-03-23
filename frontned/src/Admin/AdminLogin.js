import { useState } from "react";
import { adminLogin } from "../Api/ApiHandler";

const AdminLogin = (props) => {
  // defining states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const login = (e) => {
    e.preventDefault();
    adminLogin(username, password).then((response) => {
      props.loginState(response.state, response.token);
      setAlert(response.data);
    });
  };
  return (
    <div class="container">
      <div class="form-container">
        <div id="login-form" class="form-content active">
          <h2>Admin Login</h2>
          <form onSubmit={login}>
            <label for="text">Username</label>
            <input
              type="text"
              id="text"
              name="email"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          <div class="alert">{alert}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
