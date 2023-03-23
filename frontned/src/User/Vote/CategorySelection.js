import CandidateSelection from "./CandidateSelection";
import { useState, useEffect } from "react";
import { getFullCandidate } from "../../Api/ApiHandler";
const CategorySelection = (props) => {
  const token = props.token;
  const item = props.item;

  const [candidateData, setCandidateData] = useState([]);

  useEffect(() => {
    getFullCandidate(token).then((response) => {
      setCandidateData(response.data);
      // console.log("candidate data");
      // console.log(response.data);
    });
  }, [token]);

  const categoryHandler = (e) => {
    // console.log(e.target.value);
    const data = e.target.value;
    const [name, candidate_address, category_name, party_name] =
      data.split(",");
    const voteObj = {
      name: name,
      candidate_address: candidate_address,
      category_name: category_name,
      party_name: party_name,
    };
    props.filterVoteData(voteObj);
  };

  return (
    <div class="form-item">
      <label for="category">{item.name}:</label>
      <select name="category" id="category" onChange={categoryHandler}>
        <option value="null" hidden selected disabled>
          Choose your candidate
        </option>
        {candidateData.map((data) => {
          if (item.name === data.category_name) {
            return <CandidateSelection key={data.ca_id} data={data} />;
          } else {
            return null;
          }
        })}
      </select>
    </div>
  );
};

export default CategorySelection;
