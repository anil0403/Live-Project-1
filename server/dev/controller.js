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
  broadcast,
} = require("./networkNode");
const { acquireLock, releaseLock } = require("../config/locking");

module.exports = {
  getBlockchain: (req, res) => {
    getBlockchain((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.send(results);
      // return res.results;
    });
  },
  transaction: (req, res) => {
    transaction(req.body, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  transactionBroadcast: async (req, res) => {
    try {
      const lockPath = await acquireLock();
      console.log(`lockPath = ${lockPath}`)
      // Perform critical section of code here
      transactionBroadcast(req.body, (error, results) => {
        if (error) {
          console.log(error);
          return;
        }
        return res.status(200).json({
          success: 1,
          data: results,
        });
      });
      setTimeout(() => {
        releaseLock(lockPath);
      }, 4000);
      // res.status(200).json({ message: "Block added to blockchain" });
    } catch (error) {
      console.error("Error acquiring lock:", error);
      res.status(500).json({ error: "Failed to add block to blockchain" });
    }
  },
  mine: (req, res) => {
    mine(req.body, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  receiveNewBlock: (req, res) => {
    receiveNewBlock(req.body, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  registerBroadcast: (req, res) => {
    registerBroadcast(req.body, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "Node sucessfully added to the network",
      });
    });
  },
  registerNode: (req, res) => {
    registerNode(req.body.allNetworkNodes, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  registerNodesBulk: (req, res) => {
    registerNodesBulk(req.body.allNetworkNodes, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  consensus: (req, res) => {
    consensus((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  returnNodesUrl: (req, res) => {
    returnNodesUrl((error, results) => {
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  countVote: (req, res) => {
    countVote((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  boradcast: (req, res) => {
    broadcast(req.body, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "Node sucessfully added to the network",
      });
    });
  },
};
