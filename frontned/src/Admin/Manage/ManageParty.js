import { useEffect, useState } from "react";
import { getParty } from "../../Api/ApiHandler";
import Party from "../../components/Party";

const ManageParty = (props) => {
  const token = props.token;

  // Defining state
  const [parties, setParties] = useState([]);
  const [refresh, setRefresh] = useState("");
  const refreshData = sessionStorage.getItem("refreshData");

  useEffect(() => {
    getParty(token).then((response) => {
      setParties(response.data || []);
    });
  }, [token, refresh, refreshData]);
  const refreshHandler = (data) => {
    setRefresh(data);
  };

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>S.N</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {parties.length > 0 &&
          parties.map((party) => (
            <Party
              key={party.id}
              data={party}
              token={token}
              refreshHandler={refreshHandler}
            />
          ))}
      </tbody>
    </table>
  );
};

export default ManageParty;
