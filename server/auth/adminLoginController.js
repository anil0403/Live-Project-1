const { getAdminByUsername } = require("../api/service/adminService");
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  login: (req, res) => {
    const body = req.body;
    getAdminByUsername(body.username, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid username or password",
          state: false,
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h",
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
          state: true,
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid username or password",
          state: false,
        });
      }
    });
  },
};
