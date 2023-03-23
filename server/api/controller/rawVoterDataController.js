const {
  storeRawSData,
  getRawData,
  updateRawData,
} = require("../service/rawVoterDataService");
const multer = require("multer");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const fileExt = file.originalname.split(".").pop();
    const validExt = ["jpg", "jpeg", "png"];

    if (validExt.includes(fileExt)) {
      cb(null, file.fieldname + "-" + Date.now() + "." + fileExt);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

const upload = multer({ storage: storage });

module.exports = {
  storeRawSData: (req, res) => {
    upload.fields([{ name: "frontImage" }, { name: "backImage" }])(
      req,
      res,
      (err) => {
        if (err) {
          console.log("Failed to upload images");
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Failed to upload images",
          });
        }
        const frontImage = req.files["frontImage"][0].filename;
        const backImage = req.files["backImage"][0].filename;
        req.body.frontImage = frontImage;
        req.body.backImage = backImage;

        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);

        storeRawSData(req.body, (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).json({
              success: 0,
              message: "Database connection failed",
            });
          }
          return res.status(200).json({
            success: 1,
            data: "Voter raw data added successfully",
          });
        });
      }
    );
  },
  getRawData: (req, res) => {
    getRawData((error, results) => {
      if (error) {
        // console.log(error)
        return res.status(500).json({
          success: 0,
          message: "Database connection failed",
        });
      }
      // console.log(results);
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  updateRawData: (req, res) => {
    updateRawData(req.body.v_id, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: "Database Connection failed",
        });
      }
      return res.status(200).json({
        success: 1,
        data: "prevoter table updated",
      });
    });
  },
};
