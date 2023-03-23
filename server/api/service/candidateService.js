const pool = require("../../config/database");

module.exports = {
  createCandidate: (data, callBack = () => {}) => {
    pool.query(
      `INSERT INTO Candidate (name, address, citizenshipid, dob, c_id, p_id, candidate_address)
      VALUES(?,?,?,?,?,?,?)`,
      [
        data.name,
        data.address,
        data.citizenshipid,
        data.dob,
        data.c_id,
        data.p_id,
        data.candidate_address,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getCandidateById: (id, callBack = () => {}) => {
    pool.query(
      `SELECT * FROM candidate WHERE ca_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getCandidateByCategory: (data, callBack = () => {}) => {
    pool.query(
      `SELECT * FROM candidate WHERE c_id = ?`,
      [data.c_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getCandidate: (callBack = () => {}) => {
    pool.query(`SELECT * FROM candidate`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },
  getFullCandidate: (callBack = () => {}) => {
    pool.query(
      `SELECT Candidate.ca_id,Candidate.candidate_address, Candidate.name, Candidate.address,candidate.citizenshipid, candidate.dob, Category.name AS category_name, Party.name AS party_name
      FROM Candidate
      JOIN Category ON Candidate.c_id = Category.c_id
      JOIN Party ON Candidate.p_id = Party.p_id`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteCandidate: (data, callBack) => {
    console.log(`ca_id = ${data.ca_id}`);
    pool.query(
      `DELETE FROM candidate WHERE ca_id = ?`,
      [data.ca_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
