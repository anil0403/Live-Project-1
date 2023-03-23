import { useState } from "react";
import { createParty } from "../../Api/ApiHandler";

const RegisterParty = (props) => {
  const token = props.token;

  // defining state
  const [name, setName] = useState("");
  const [alert, setAlert] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    createParty(name, token)
      .then((response) => {
        setAlert(response.message);
        setName("");
        sessionStorage.setItem("refreshData", Math.random());
      })
      .catch((error) => {
        console.error("Error creating party:", error);
        setAlert("Error creating party");
      });
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="party">Party:</label>
        <input
          type="text"
          id="party"
          name="party"
          placeholder="Enter name of party"
          maxLength={50}
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <button type="submit">Add Party</button>
      </form>
      <div className="alert">{alert}</div>
    </>
  );
};

export default RegisterParty;
