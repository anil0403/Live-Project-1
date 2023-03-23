const router = require("express").Router();
const {
  getBlockchain,
  transaction,
  transactionBroadcast,
  mine,
  receiveNewBlock,
  registerBroadcast,
  registerNode,
  registerNodesBulk,
  consensus,
  countVote,
  returnNodesUrl,
  boradcast
} = require("./controller");

const { checkToken } = require("../auth/tokenValidation");

const { adminCheckToken } = require("../auth/adminTokenValidation");
const { userCheckToken } = require("../auth/userTokenValidation");

router.get("/blockchain", getBlockchain);
router.post("/transaction", adminCheckToken, transaction);
router.post("/transaction-broadcast", adminCheckToken, transactionBroadcast);
 router.post("/mine", adminCheckToken, userCheckToken, mine);
router.post("/receive-new-block", adminCheckToken, receiveNewBlock);

//nodes synchronization
router.post("/boradcast", adminCheckToken, boradcast);


router.post("/register-and-broadcast-node", adminCheckToken, registerBroadcast);
router.post("/register-node", adminCheckToken, registerNode);
router.post("/register-nodes-bulk", adminCheckToken, registerNodesBulk);

//block verification
router.get("/consensus",adminCheckToken, consensus);

// return network nodes
router.get("/get-network-nodes", adminCheckToken, returnNodesUrl);

//count vote
router.get("/count-vote", adminCheckToken, countVote);
module.exports = router;
