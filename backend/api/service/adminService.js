const pool = require("../../config/database");

module.exports = {
  createAdmin: (data, callBack = () => {}) => {
    pool.query(
      `INSERT INTO Admin (username, password) VALUES(?,?)`,
      [data.username, data.password],
      (error, results, field) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAdminByUsername: (username, callBack = () => {}) => {
    pool.query(
      ` SELECT * FROM Admin WHERE username = ?`,
      [username],
      (error, results, field) => {
        if (error) {
          console.log(error);
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getAdmin: (callBack = () => {}) => {
    pool.query(` SELECT * FROM Admin`, [], (error, results, field) => {
      if (error) {
        console.log(error);
        callBack(error);
      }
      return callBack(null, results);
    });
  },
  deleteAdmin: (id, callBack = () => {}) => {
    pool.query(
      `DELETE FROM Admin WHERE a_id = ?`,
      [id],
      (error, results, field) => {
        if (error) {
          console.log(error);
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
