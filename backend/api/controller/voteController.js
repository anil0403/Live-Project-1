const { CreateVote, DeleteVote, GetVote } = require("../service/voteService");

module.exports = {
  CreateVote: (req, res) => {
    CreateVote(req.body, (error, results) => {
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
  DeleteVote: (req, res) => {
    DeleteVote((error, results) => {
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
  GetVote: (req, res) => {
    GetVote((error, results) => {
      if (error) {
        console.log(error);
        return res.status(200).json({
          success: 0,
          message: "Database connection failed,",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
