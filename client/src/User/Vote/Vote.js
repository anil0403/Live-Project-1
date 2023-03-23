import { useState, useEffect } from "react";
import { getCategory } from "../../Api/ApiHandler";
import CategorySelection from "./CategorySelection";
import {
  transactionBraodcast,
  getVoterByEmail,
  updateVoterByVoterAddress,
} from "../../Api/ApiHandler";
const Vote = (props) => {
  const token = props.token;
  // console.log(`token = ${token}`);

  const voterInfo = JSON.parse(sessionStorage.getItem("voterInfo"));
  const refreshData = sessionStorage.getItem("refreshData");

  // console.log(` voterInfo= ${voterInfo}`);

  // defining sates
  // const [voterId, setVoterId] = useState("");
  const [alert, setAlert] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [filterVoteData, setfilterVoteData] = useState([]);
  const [buttonState, setButtonState] = useState(false);

  //logout function
  const logout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    props.loginState(false);
  };

  // fetching category
  useEffect(() => {
    getCategory(token).then((response) => {
      setCategoryData(response.data);
      console.log(`category data = ${response.data}`);
    });
    getVoterByEmail(voterInfo.email).then((response) => {
      if (response.data.flag === 1) {
        setAlert("Already Voted");
        setButtonState(false);
      } else {
        setButtonState(true);
      }
    });
  }, [token, refreshData, voterInfo.email]);

  // vote data filter function
  const filterVoteDataHandler = (data) => {
    const newFilteredData = filterVoteData.filter((item) => {
      if (item.category_name !== data.category_name) {
        // console.log(`item = ${item}`)
        return item;
      } else return null;
    });
    setfilterVoteData([...newFilteredData, data]);
  };

  // console.log(filterVoteData);

  // voter id handler

  // vote handler function
  const voteHandler = (e) => {
    e.preventDefault();
    setButtonState(false);
    const transaction = [];
    filterVoteData.forEach((item) => {
      transaction.push({
        ...item,
        voter_address: voterInfo.voter_address,
      });
    });
    //sending transaction
    transactionBraodcast(transaction, token).then((response) => {
      console.log(response);
    });
    // updated voter as voted
    updateVoterByVoterAddress(voterInfo.voter_address, token).then(
      (response) => {
        console.log(response);
      }
    );
    setAlert("You Have Successfully Voted");
    sessionStorage.setItem("refreshData", Math.random());
  };

  return (
    <div class="vote-container">
      <div class="voter-info-container">
        <span class="head">Voter Information</span>
        <span class="name">Name = {voterInfo.name}</span>
        <span class="address">Address = {voterInfo.address}</span>
        <span class="email">Email = {voterInfo.email}</span>
        <span class="email">DOB = {voterInfo.dob.substring(0, 10)}</span>
        <span class="voter-id">Voter Id = {voterInfo.voter_id}</span>
      </div>

      <button onClickCapture={logout} type="submit">
        Logout
      </button>

      <div class="vote-form-container">
        <h2>Please Choose the Candidates and Enter Voter Id </h2>
        <form onSubmit={voteHandler}>
          <div class="form-item-container">
            {categoryData.map((item) => {
              return (
                <CategorySelection
                  key={item.c_id}
                  item={item}
                  token={token}
                  filterVoteData={filterVoteDataHandler}
                />
              );
            })}
          </div>

          <label for="voter-id">Voter Id:</label>
          <input
            type="number"
            id="voter-id"
            name="voter-id"
            placeholder="Enter your voter id"
            value={voterInfo.voter_id}
            disabled
            required
          />
          <button disabled={!buttonState} type="submit">
            Cast your vote
          </button>
        </form>
        <div class="alert"> {alert} </div>
      </div>
    </div>
  );
};

export default Vote;
