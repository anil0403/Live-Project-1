const pool = require("../../config/database");

module.exports = {
  CreateVote: (data, callBack = () => {}) => {
    pool.query(
      `INSERT INTO result(candidate_name, candidate_address, party_name, category_name, votes) VALUES (?,?,?,?,?)`,
      [
        data.candidate_name,
        data.candidate_address,
        data.party_name,
        data.category_name,
        data.votes,
      ],
      (error, results, fileds) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  DeleteVote: (callBack = () => {}) => {
    // console.log("trucate called");
    pool.query(`truncate result`, [], (error, results, fileds) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  GetVote: (callBack = () => {}) => {
    pool.query(`SELECT * FROM result  ORDER BY votes DESC`, [], (error, results, fileds) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
};
