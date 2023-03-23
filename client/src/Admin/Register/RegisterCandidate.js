import { useState, useEffect } from "react";
import { getCategory } from "../../Api/ApiHandler";
import { getParty } from "../../Api/ApiHandler";
import { createCandidate } from "../../Api/ApiHandler";

const RegisterCandidate = (props) => {
  const token = props.token;
  // defining states
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [citizenshipId, setCitizenshipId] = useState("");
  const [dob, setDob] = useState("");
  const [category, setCategory] = useState("");
  const [party, setParty] = useState("");
  const [alert, setAlert] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [partyData, setPartyData] = useState([]);

  const refreshData = sessionStorage.getItem("refreshData");
  // const refreshDelete = sessionStorage.getItem("delete");

  // fetching Categories and
  useEffect(() => {
    getParty(token).then((response) => {
      setPartyData(response.data || []);

    });
    getCategory(token).then((response) => {
      setCategoryData(response.data || []);

    });
  }, [token, refreshData]);

  const submitHandler = (e) => {
    e.preventDefault();
    createCandidate(
      name,
      address,
      citizenshipId,
      dob,
      category,
      party,
      token
    ).then((response) => {
      setAlert(response.message);
      sessionStorage.setItem("refreshData", Math.random());
    });
    console.log({
      name: name,
      address: address,
      dob: dob,
      citizenshipId: citizenshipId,
      c_id: category,
      p_id: party,
    });

    setName("");
    setAddress("");
    setDob("");
    setCitizenshipId("");
    setCategory("");
    setParty("");
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="full-name">Full Name:</label>
        <input
          type="text"
          id="full-name"
          name="full-name"
          placeholder="Enter your full name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Enter your address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          required
        />
        <label htmlFor="citizenshipId">Citizenship ID:</label>
        <input
          type="number"
          id="citizenshipId"
          name="citizenshipId"
          placeholder="Enter your citizenship ID"
          onChange={(e) => setCitizenshipId(e.target.value)}
          value={citizenshipId}
          required
        />
        <label htmlFor="dob">Date of birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          placeholder="Enter your Date of birth"
          onChange={(e) => setDob(e.target.value)}
          value={dob}
          required
        />
        <label htmlFor="category">Category:</label>
        <label>
          <select
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled selected>
              Choose Category
            </option>
            {categoryData.length > 0 &&
              categoryData.map((item) => {
                return (
                  <option key={item.c_id} value={item.c_id}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </label>
        <label htmlFor="party">Party:</label>
        <label>
          <select
            name="party"
            id="party"
            onChange={(e) => setParty(e.target.value)}
          >
            <option value="" disabled selected>
              Choose Party
            </option>
            {partyData.length > 0 &&
              partyData.map((item) => {
                return (
                  <option key={item.p_id} value={item.p_id}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </label>
        <button type="submit">Add Candidate</button>
      </form>
      <div className="alert" aria-live="polite">
        {alert}
      </div>
    </>
  );
};
export default RegisterCandidate;
