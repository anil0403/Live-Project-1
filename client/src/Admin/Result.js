import { useState, useEffect } from "react";
import { getVote, getCategory } from "../Api/ApiHandler";
import VoteResultComponent from "../components/VoteResultTable";
const Result = (props) => {
  // const token = props.token;
  const refreshData = sessionStorage.getItem("refreshData");
  const [voteData, setVoteData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    getVote().then((response) => {
      //   console.log(response.data);
      setVoteData([...response.data]);

      getCategory().then((response) => {
        setCategoryData([...response.data]);
        // console.log(response.data);
      });
    });
  }, [refreshData]);
  return (
    <div>
      {categoryData.length > 0 &&
        categoryData.map((item) => {
          const filteredData = voteData.filter(
            (data) => item.name === data.category_name
          );
          return (
            <div className="container-item" key={item.id}>
              <h2>{item.name}</h2>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Party</th>
                    <th>Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 &&
                    filteredData.map((data) => (
                      <VoteResultComponent key={data.r_id} item={data} />
                    ))}
                </tbody>
              </table>
            </div>
          );
        })}
    </div>
  );
};

export default Result;
