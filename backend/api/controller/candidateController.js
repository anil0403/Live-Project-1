const {
  createCandidate,
  getCandidate,
  getCandidateById,
  getCandidateByCategory,
  deleteCandidate,
  getFullCandidate,
} = require("../service/candidateService");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  createCandidate: (req, res) => {
    const salt = genSaltSync(5);
    req.body.candidate_address = uuidv4()
      .split("-")
      .join(salt)
      .split(".")
      .join("");
    createCandidate(req.body, (error, results) => {
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
        message: "Candidate added sucessfully",
      });
    });
  },
  getCandidateById: (req, res) => {
    const id = req.params.id; //:id
    getCandidateById(id, (error, results) => {
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
  getCandidateByCategory: (req, res) => {
    getCandidateByCategory(req.params, (error, results) => {
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
  getCandidate: (req, res) => {
    getCandidate((error, results) => {
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
  getFullCandidate: (req, res) => {
    getFullCandidate((error, results) => {
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

  deleteCandidate: (req, res) => {
    deleteCandidate(req.body, (err, results) => {
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
