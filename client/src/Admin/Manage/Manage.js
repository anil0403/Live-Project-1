import ManageCandidate from "./ManageCandidate";
import ManageCategory from "./ManageCategory";
import ManageParty from "./ManageParty";
import ManageVoter from "./ManageVoter";

import { countVote, deleteVote } from "../../Api/ApiHandler";

const Manage = (props) => {
  const { token, loginState } = props;

  const logout = () => {
    loginState(false);
  };

  const publish = (e) => {
    deleteVote(token)
      .then((response) => {
        console.log("Votes cleared");
        sessionStorage.setItem("refreshData", Math.random());
      })
      .then(() => {
        countVote(token)
          .then((response) => {
            console.log("Votes published");
            sessionStorage.setItem("refreshData", Math.random());
          });
      });
  };

  const clear = (e) => {
    deleteVote(token).then((response) => {
      console.log("Votes cleared");
      sessionStorage.setItem("refreshData", Math.random());
    });
  };

  return (
    <div>
      <button onClick={logout} type="submit">
        Logout
      </button>
      <button onClick={publish} className="publish-btn" type="submit">
        Publish Vote
      </button>
      <button onClick={clear} className="clear-btn" type="submit">
        Clear Vote
      </button>
      <div className="container-item">
        <h2>Manage Party</h2>
        <ManageParty token={token} />
      </div>

      <div className="container-item">
        <h2>Manage Category</h2>
        <ManageCategory token={token} />
      </div>
      <div className="container-item">
        <h2>Manage Candidate</h2>
        <ManageCandidate token={token} />
      </div>
      <div className="container-item">
        <h2>Manage Voter</h2>
        <ManageVoter token={token} />
      </div>
    </div>
  );
};

export default Manage;
