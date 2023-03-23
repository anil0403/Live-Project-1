const pool = require("../../config/database");

module.exports = {
  createParty: (data, callBack = () => {}) => {
    pool.query(
      `INSERT INTO Party (name) VALUES(?)`,
      [data.name],
      (error, results, field) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getParty: (callBack = () => {}) => {
    pool.query(`SELECT * FROM party`, [], (error, results, field) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },
  deletePartyById: (data, callBack = () => {}) => {
    pool.query(
      `DELETE FROM party WHERE p_id = ?`,
      [data.p_id],
      (error, results, field) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
