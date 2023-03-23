const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const {
  createVoter,
  getVoterByEmail,
  getVoter,
  deleteVoter,
  updateVoterByVoterAddress,
} = require("../service/voterService");

module.exports = {
  createVoter: (req, res) => {
    const salt = genSaltSync(10);
    req.body.voter_address = uuidv4().split("-").join(salt).split(".").join("");
    req.body.voter_id = Math.floor(Math.random() * 900000) + 100000;
    createVoter(req.body, (error, results) => {
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
        message: "Voter Created sucessfully",
      });
    });
  },
  updateVoterByVoterAddress: (req, res) => {
    // console.log(`voter id = ${req.body.id}`);
    updateVoterByVoterAddress(req.body, (error, results) => {
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

  getVoterByEmail: (req, res) => {
    getVoterByEmail(req.body.email, (error, results) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: "Database connection failed",
          status: false,
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
        status: true,
      });
    });
  },

  getAd: (req, res) => {
    getVoterByEmail(req.body.email, (error, results) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: "Database connection failed",
          status: false,
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
        status: true,
      });
    });
  },

  getVoter: (req, res) => {
    getVoter((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  deleteVoter: (req, res) => {
    deleteVoter(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully",
      });
    });
  },
};
