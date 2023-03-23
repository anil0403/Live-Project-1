import { useState } from "react";
import { createCategory } from "../../Api/ApiHandler";

const RegisterCategory = (props) => {
  const { token } = props;

  const [name, setName] = useState("");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    createCategory(name, token)
      .then((response) => {
        setAlert(response.message);
        setName("");
        sessionStorage.setItem("refreshData", Math.random());
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Enter category"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <button type="submit">Add Category</button>
      </form>
      {error && <div class="error">{error}</div>}
      {alert && <div class="alert">{alert}</div>}
    </>
  );
};

export default RegisterCategory;
