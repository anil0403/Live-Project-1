import { useState, useEffect } from "react";
import ContainerDescription from "./ContainerDescription";
import Login from "./UserManagement/Login";
import Register from "./UserManagement/Register";
import Vote from "./Vote/Vote";

const User = () => {
  // defining states
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [token, setToken] = useState("");

  //   tab function
  const showForm = (formName) => {
    setActiveTab(formName);
  };

  // loggedin State Handler Function
  const loginStateHandler = (state, token, voterData) => {
    setToken(token);
    setIsLoggedin(state);
    sessionStorage.setItem("isLoggedinUser", JSON.stringify(state));
    sessionStorage.setItem("userToken", token);
  };

  // loggedin State Handler Function
  // const loginStateHandler = (state, token, voterData) => {
  //   setToken(token);
  //   setVoterData(voterData);
  //   setIsLoggedin(state);
  //   sessionStorage.setItem("isLoggedin", JSON.stringify(state));
  //   sessionStorage.setItem("token", token);
  // };

  useEffect(() => {
    const storedIsLoggedin = sessionStorage.getItem("isLoggedinUser");
    const storedToken = sessionStorage.getItem("userToken");
    if (storedIsLoggedin && storedToken) {
      setIsLoggedin(JSON.parse(storedIsLoggedin));
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      {!isLoggedin ? (
        <div class="container">
          <ContainerDescription />

          <div class="form-container">
            {/* switching tabs */}

            <div class="form-tabs">
              <button
                className={`tab ${activeTab === "login" ? "active" : ""}`}
                onClick={() => showForm("login")}
              >
                Login
              </button>
              <button
                className={`tab ${activeTab === "register" ? "active" : ""}`}
                onClick={() => showForm("register")}
              >
                Register
              </button>{" "}
            </div>

            <div
              id="login-form"
              className={`form-content ${
                activeTab === "login" ? "active" : ""
              }`}
            >
              <h2>Login</h2>
              <Login loginState={loginStateHandler} />
            </div>
            <div
              id="register-form"
              className={`form-content ${
                activeTab === "register" ? "active" : ""
              }`}
            >
              <h2>Register</h2>
              <Register />
            </div>
          </div>
        </div>
      ) : (
        <Vote token={token}  loginState={loginStateHandler} />
      )}
    </>
  );
};

export default User;
