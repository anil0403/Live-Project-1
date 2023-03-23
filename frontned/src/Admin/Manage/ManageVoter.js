import { useState, useEffect } from "react";
import { getVoter } from "../../Api/ApiHandler";
import Voter from "../../components/Voter";

const ManageVoter = (props) => {
  const [voterData, setVoterData] = useState([]);
  const [refresh, setRefresh] = useState("");
  const refreshData = sessionStorage.getItem("refreshData");
  const token = props.token;

  useEffect(() => {
    getVoter(token)
      .then((response) => {
        setVoterData(response.data || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token, refresh, refreshData]);

  const refreshHandler = (refreshData) => {
    setRefresh(refreshData);
  };

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>S.N</th>
          <th>Name</th>
          <th>Address</th>
          <th>Email</th>
          <th>DOB</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {voterData.length > 0 &&
          voterData.map((item) => (
            <Voter
              key={item.id}
              item={item}
              token={token}
              refreshHandler={refreshHandler}
            />
          ))}
      </tbody>
    </table>
  );
};

export default ManageVoter;
