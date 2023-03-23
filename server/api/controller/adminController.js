const {
  createAdmin,
  deleteAdmin,
  getAdmin,
} = require("../service/adminService");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");

module.exports = {
  createAdmin: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);

    body.password = hashSync(body.password, salt);
    console.log(body.password);
    createAdmin(body, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: "Database connection failed",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "Admin sucessfully added",
      });
    });
  },
  getAdmin: (req, res) => {
    getAdmin((error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: "Database connection failed",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  deleteAdmin: (req, res) => {
    deleteAdmin(req.body.id, (error, results) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: "Data Connection faied",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
