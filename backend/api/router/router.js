const router = require("express").Router();

//importing controllers

const {
  createCategory,
  getCategory,
  getCategoryById,
  deleteCategory,
} = require("../controller/categoryController");
const {
  createCandidate,
  getCandidate,
  getCandidateById,
  getCandidateByCategory,
  deleteCandidate,
  getFullCandidate,
} = require("../controller/candidateController");
const {
  createVoter,
  getVoter,
  getVoterByEmail,
  deleteVoter,
  updateVoterByVoterAddress,
} = require("../controller/voterController");
const {
  CreateVote,
  DeleteVote,
  GetVote,
} = require("../controller/voteController");

const {
  createParty,
  getParty,
  deletePartyById,
} = require("../controller/partyController");

const {
  createAdmin,
  deleteAdmin,
  getAdmin,
} = require("../controller/adminController");

const { login } = require("../../auth/adminLoginController");

const { userLogin } = require("../../auth/userLoginController");

const { adminCheckToken } = require("../../auth/adminTokenValidation");

const { userCheckToken } = require("../../auth/userTokenValidation");

const {
  storeRawSData,
  getRawData,
  updateRawData,
} = require("../controller/rawVoterDataController");

// router for category

router.post("/create-category", adminCheckToken, createCategory);
router.get("/get-category", getCategory);
router.get("/get-category-by-id/:id", adminCheckToken, getCategoryById);
router.delete("/delete-category", adminCheckToken, deleteCategory);

// router for candidate

router.post("/create-candidate", adminCheckToken, createCandidate);
router.get("/get-candidate", adminCheckToken, getCandidate);
router.get("/get-candidate-by-id/:id", adminCheckToken, getCandidateById);
router.get(
  "/get-candidate-by-category/:category",
  adminCheckToken,
  getCandidateByCategory
);
router.delete("/delete-candidate", adminCheckToken, deleteCandidate);
router.get("/get-full-candidate", adminCheckToken, getFullCandidate);

// router for voter

router.post("/create-voter", createVoter);
router.get("/get-voter", adminCheckToken, userCheckToken, getVoter);
router.delete("/delete-voter", adminCheckToken, deleteVoter);
router.post("/get-voter-by-email", getVoterByEmail);
router.patch(
  "/update-voter-by-voter-address",
  userCheckToken,
  updateVoterByVoterAddress
);

//router for vote
router.post("/create-vote", CreateVote);
router.delete("/delete-vote", DeleteVote);
router.get("/get-vote", GetVote);

// router for party
router.post("/create-party", adminCheckToken, createParty);
router.get("/get-party", adminCheckToken, getParty);
router.delete("/delete-party", adminCheckToken, deletePartyById);

// admin
router.post("/create-admin", createAdmin);
router.delete("/delete-admin", adminCheckToken, deleteAdmin);
router.get("/get-admin", adminCheckToken, getAdmin);

//admin login
router.post("/admin-login", login);

//user login
router.post("/user-login", userLogin);

// sote raw voter info
router.post("/store-raw-voter", storeRawSData);
router.get("/get-raw-data", adminCheckToken, getRawData);
router.patch("/update-raw-data", adminCheckToken, updateRawData);

module.exports = router;
