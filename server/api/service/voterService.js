const pool = require("../../config/database");

module.exports = {
  createVoter: (data, callBack = () => {}) => {
    pool.query(
      `INSERT INTO Voter (name, address, email, citizenshipid, dob, password, voter_address,voter_id)
      VALUES(?,?,?,?,?,?,?,?)`,
      [
        data.name,
        data.address,
        data.email,
        data.citizenshipid,
        data.dob,
        data.password,
        data.voter_address,
        data.voter_id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateVoterByVoterAddress: (data, callBack = () => {}) => {
    pool.query(
      `UPDATE voter SET flag = true WHERE voter_address = ?`,
      [data.voter_address],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getVoterByEmail: (email, callBack = () => {}) => {
    pool.query(
      `SELECT * FROM voter WHERE email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getVoter: (callBack = () => {}) => {
    pool.query(`SELECT * FROM voter`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },
  deleteVoter: (data, callBack) => {
    pool.query(
      `DELETE FROM voter WHERE v_id = ?`,
      [data.v_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
