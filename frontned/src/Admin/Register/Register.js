import { useState } from "react";
import RegisterCandidate from "./RegisterCandidate";
import RegisterCategory from "./RegisterCategory";
import RegisterParty from "./RegisterParty";

const Register = (props) => {
  const token = props.token;

  const [activeTab, setActiveTab] = useState("login");

  const showForm = (formName) => {
    setActiveTab(formName);
  };

  return (
    <>
      <div className="form-container">
        <div className="form-tabs">
          <button
            className={`tab ${activeTab === "party" ? "active" : ""}`}
            onClick={() => showForm("party")}
          >
            Add Party
          </button>
          <button
            className={`tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => showForm("login")}
          >
            Add Category
          </button>
          <button
            className={`tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => showForm("register")}
          >
            Add Candidate
          </button>
        </div>

        <div
          id="party-form"
          className={`form-content ${activeTab === "party" ? "active" : ""}`}
        >
          <RegisterParty token={token} />
        </div>

        <div
          id="login-form"
          className={`form-content ${activeTab === "login" ? "active" : ""}`}
        >
          <RegisterCategory key="category-form" token={token} />
        </div>

        <div
          id="register-form"
          className={`form-content ${activeTab === "register" ? "active" : ""}`}
        >
          <RegisterCandidate key="candidate-form" token={token} />
        </div>
      </div>
    </>
  );
};

export default Register;
