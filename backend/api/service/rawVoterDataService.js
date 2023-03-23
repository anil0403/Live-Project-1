const pool = require("../../config/database");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

module.exports = {
  storeRawSData: (data, callBack = () => {}) => {
    const {
      name,
      address,
      email,
      password,
      citizenshipId,
      dob,
      frontImage,
      backImage,
    } = data;

    pool.query(
      `INSERT INTO prevoter (      
        name,
        address,
        email,
        password,
        citizenshipId,
        dob,
        frontImage,
        backImage)
      VALUES(?,?,?,?,?,?,?,?)`,
      [
        name,
        address,
        email,
        password,
        citizenshipId,
        dob,
        frontImage,
        backImage,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getRawData: (callBack = () => {}) => {
    pool.query(
      `SELECT *, CONCAT("/uploads/", frontImage) AS imageUrl1, CONCAT("/uploads/", backImage) AS imageUrl2 FROM prevoter`,
      [],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateRawData: (v_id, callBack = () => {}) => {
    // console.log(`data = ${v_id}`);
    pool.query(
      `UPDATE prevoter
      SET flag = true
      WHERE V_id = ?`,
      [v_id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};

// Get all images
// app.get('/images', (req, res) => {
//   // Retrieve all image data from database
//   db.query('SELECT * FROM images', (err, results) => {
//     if (err) throw err;

//     // Send array of image filenames to client
//     const filenames = results.map(result => result.filename);
//     res.send(filenames);
//   });
// });

// CREATE TABLE verifyvoter (
// 	v_id INT NOT NULL AUTO_INCREMENT,
// 	name VARCHAR(255) NOT NULL,
// 	address VARCHAR(255) NOT NULL,
// 	email VARCHAR(255) NOT NULL UNIQUE,
// 	password VARCHAR(255) NOT NULL,
// 	citizenshipid BIGINT NOT NULL,
// 	dob DATE NOT NULL,
// 	frontImage VARCHAR(255) NOT NULL,
// 	backImage VARCHAR(255) NOT NULL,
// 	PRIMARY KEY (v_id)
// );

// formData.append("name", name);
// formData.append("address", address);
// formData.append("email", email);
// formData.append("password", password);
// formData.append("citizenshipId", citizenshipId);
// formData.append("dob", dob);
// formData.append("frontImage", frontImage);
// formData.append("backImage", backImage);
