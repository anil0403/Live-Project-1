import { useState } from "react";
import { createAdmin } from "../../Api/ApiHandler";
import ManageAdmin from "../Manage/ManageAdmin";

const RegisterAdmin = (props) => {
  const token = props.token;

  // defining states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // submit handler function
  const submitHandler = (e) => {
    e.preventDefault();
    createAdmin(username, password, token)
      .then((response) => {
        setMessage(response.message);
        setUsername("");
        setPassword("");
        sessionStorage.setItem("refreshData", Math.random());
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={submitHandler}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button type="submit">Add Admin</button>
      </form>
      {message && <div className="alert">{message}</div>}
      <ManageAdmin token={token} />
    </div>
  );
};

export default RegisterAdmin;
