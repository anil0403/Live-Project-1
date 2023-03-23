import { getFullCandidate } from "../../Api/ApiHandler";
import { useEffect, useState, useCallback } from "react";
import Candidate from "../../components/Candidate";

const ManageCandidate = ({ token }) => {
  const [candidateData, setCandidateData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const refreshData = sessionStorage.getItem("refreshData");

  const refreshHandler = useCallback((refreshData) => {
    setRefresh(refreshData);
  }, []);

  useEffect(() => {
    getFullCandidate(token).then((response) => {
      setCandidateData(response.data || []);
    });
  }, [token, refresh, refreshData]);

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>S.N</th>
          <th>Name</th>
          <th>Address</th>
          <th>DOB</th>
          <th>Category</th>
          <th>Party</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {candidateData.length > 0 &&
          candidateData.map((item) => (
            <Candidate
              key={item.ca_id}
              item={item}
              refreshHandler={refreshHandler}
              token={token}
            />
          ))}
      </tbody>
    </table>
  );
};

export default ManageCandidate;
