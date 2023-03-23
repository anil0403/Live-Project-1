const {
  createCategory,
  getCategory,
  getCategoryById,
  deleteCategory,
} = require("../service/categoryService");

module.exports = {
  createCategory: (req, res) => {
    createCategory(req.body, (error, results) => {
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
        message: "Category added successfully",
      });
    });
  },
  getCategoryById: (req, res) => {
    const id = req.params.id;
    getCategoryById(id, (error, results) => {
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
  getCategory: (req, res) => {
    getCategory((error, results) => {
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
  deleteCategory: (req, res) => {
    console.log("called");
    deleteCategory(req.body, (err, results) => {
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
