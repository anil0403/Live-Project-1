const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");
const coin = new Blockchain();
const rp = require("request-promise");
var express = require("express");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { getFullCandidate } = require("../api/service/candidateService");
const { CreateVote } = require("../api/service/voteService");
//creating blockchain endpoint

module.exports = {
  // return entire  blockchain data
  getBlockchain: (callBack = () => {}) => {
    return callBack(null, coin);
  },

  // create transaction and add transaction to pendingTransactions
  transaction: (data, callBack = () => {}) => {
    const newTransaction = data.newTransaction;
    const networkNodeUrl = data.networkNodeUrl;
    if (networkNodeUrl != coin.currentNodeUrl) {
      const blockIndex =
        coin.addTransactionToPendingTransactions(newTransaction);
      return callBack(null, {
        note: `Transaction will be added in block ${blockIndex}`,
      });
    } else {
      return callBack("request on same node");
    }
  },

  // broadcast transaction to all over the network
  transactionBroadcast: (data, callBack = () => {}) => {
    const trasactionArray = data.transaction;
    const token = data.token;
    const requestPromises = [];
    trasactionArray.forEach((item) => {
      // console.log("-------------------------");
      // console.log(item);
      const newTransaction = coin.createNewTransaction(
        item.name, // name
        item.candidate_address, // candidate unique address
        item.voter_address, // voter (unique address)
        item.party_name, // party name
        item.category_name // category name
      );
      coin.addTransactionToPendingTransactions(newTransaction);

      // coin.networkNodes.forEach((networkNodeUrl) => {
      //   const requestOptions = {
      //     uri: networkNodeUrl + "/transaction",
      //     method: "POST",
      //     body: {
      //       networkNodeUrl: coin.currentNodeUrl,
      //       newTransaction: newTransaction,
      //     },
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //     json: true,
      //   };
      //   requestPromises.push(rp(requestOptions));
      //   Promise.all(requestPromises).then((data) => {
      //     // return;
      //     return callBack(null, {
      //       note: "Transaction created and broadcasted successfully!",
      //     });
      //   });
      // });
    });

    // mining
    // http://localhost:3001/mine
    const mineRequestPromises = [];
    const mineRequestOption = {
      uri: coin.currentNodeUrl + "/mine",
      method: "POST",
      body: {
        token: token,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },

      json: true,
    };

    mineRequestPromises.push(rp(mineRequestOption));
    Promise.all(mineRequestPromises).then((data) => console.log(data));
  },

  // mine a block
  mine: (data, callBack = () => {}) => {
    const token = data.token;
    const lastBlock = coin.getLastBlock();
    const previousBlockHash = lastBlock["hash"];
    const currentBlockData = {
      index: lastBlock["index"] + 1,
      transactions: coin.pendingTransactions,
    };

    const nonce = coin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = coin.hashBlock(
      previousBlockHash,
      currentBlockData,
      nonce
    );
    const newBlock = coin.createNewBlock(nonce, previousBlockHash, blockHash);

    const requestPromises = [];
    coin.networkNodes.forEach((networkNodeUrl) => {
      const requestOptions = {
        uri: networkNodeUrl + "/receive-new-block",
        method: "POST",
        body: {
          newBlock: newBlock,
          networkNodeUrl: coin.currentNodeUrl,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        json: true,
      };
      requestPromises.push(rp(requestOptions));
    });
    Promise.all(requestPromises).then((data) => {
      return callBack(null, {
        note: "New Block Mined  and broadcast Successfully!",
        block: newBlock,
      });
    });
  },

  // the nodes present in the network recieve newblock and push into their chain
  receiveNewBlock: (data, callBack = () => {}) => {
    const newBlock = data.newBlock;
    const networkNodeUrl = data.networkNodeUrl;
    const lastBlock = coin.getLastBlock();
    const isNotSameNode = networkNodeUrl != coin.currentNodeUrl;
    const correctHash = lastBlock.hash === newBlock.previousBlockHash;
    const correctIndex = lastBlock["index"] + 1 === newBlock["index"];
    // console.log(isNotSameNode);
    if (correctHash && correctIndex && isNotSameNode) {
      coin.chain.push(newBlock);
      coin.pendingTransactions = [];
      return callBack(null, {
        note: "New Block received and accepted",
        newBlock: newBlock,
      });
    } else {
      console.log("block rejected");
      return callBack(null, {
        note: "New Block Rejected",
      });
    }
  },

  // register and broadcast
  registerBroadcast: async (data, callBack = () => {}) => {
    const { allNetworkNodes, token } = data;

    allNetworkNodes.forEach((newNodeUrl) => {
      if (!coin.networkNodes.includes(newNodeUrl)) {
        coin.networkNodes.push(newNodeUrl);
      }
    });

    const regNodesPromises = coin.networkNodes.map((networkNodeUrl) => {
      const requestOptions = {
        uri: `${networkNodeUrl}/register-node`,
        method: "POST",
        body: { allNetworkNodes: [...coin.networkNodes, coin.currentNodeUrl] },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        json: true,
      };
      return rp(requestOptions);
    });

    try {
      const data = await Promise.all(regNodesPromises);
      console.log(data);

      return callBack(null, {
        allNetworkNodes: [...coin.networkNodes, coin.currentNodeUrl],
      });
    } catch (error) {
      return callBack(error);
    }
  },

  // all the nodes of the network receive new node, register it and return their details
  registerNode: (allNetworkNodes, callBack = () => {}) => {
    allNetworkNodes.forEach((newNodeUrl) => {
      const nodeNotAlreadyPresent = !coin.networkNodes.includes(newNodeUrl);
      const notCurrentNode = coin.currentNodeUrl !== newNodeUrl;

      if (nodeNotAlreadyPresent && notCurrentNode) {
        coin.networkNodes.push(newNodeUrl);
      }
    });

    return callBack(null, {
      message: "New node registered successfully.",
    });
  },

  // implement consensus algorithm (longest chain rule)
  consensus: (callBack = () => {}) => {
    console.log(`${coin.networkNodes}`);
    const requestPromises = [];
    coin.networkNodes.forEach((networkNodeUrl) => {
      const requestOptions = {
        uri: networkNodeUrl + "/blockchain",
        method: "GET",
        json: true,
      };

      requestPromises.push(rp(requestOptions));
    });
    Promise.all(requestPromises).then((blockchains) => {
      const currentChainLength = coin.chain.length;
      let maxChainLength = currentChainLength;
      let newPendingTransactions = null;
      const counts = {};

      blockchains.forEach((blockchain) => {
        if (blockchain.chain.length > maxChainLength) {
          maxChainLength = blockchain.chain.length;
          newPendingTransactions = blockchain.pendingTransactions;
        }
      });

      const newLongestChain = coin.findLongestChain(
        blockchains,
        maxChainLength
      );
      if (
        !newLongestChain ||
        (newLongestChain && !coin.chainIsValid(newLongestChain))
      ) {
        return callBack(null, {
          note: "current chain has not been replaced",
          chain: coin.chain,
        });
      } else if (newLongestChain && coin.chainIsValid(newLongestChain)) {
        coin.chain = newLongestChain;
        coin.newPendingTransactions = newPendingTransactions;
        return callBack(null, {
          note: "this chain hass been replaced",
          chain: coin.chain,
        });
      }
    });
  },
  // return all nodes in the network (network nodes)
  returnNodesUrl: (callBack = () => {}) => {
    const urls = coin.networkNodes;
    // console.log(`urls = ${urls}`);
    return callBack(null, urls);
  },
  // count total votes of each candidte
  countVote: async (callBack = () => {}) => {
    //count votes
    const voteObject = [];
    getFullCandidate((error, results) => {
      if (error) {
        return null;
      } else {
        const candidates = results;
        candidates.forEach((candidate) => {
          // console.log(candidate.party_name);
          // console.log(candidate.name);

          const vote = coin.voteCount(
            candidate.name,
            candidate.candidate_address,
            candidate.category_name,
            candidate.party_name
          );
          CreateVote(vote);
          // voteObject.push(
          //   coin.voteCount(
          //     candidate.name,
          //     candidate.candidate_address,
          //     candidate.category_name,
          //     candidate.party_name
          //   )
          // );
        });
        // console.log(voteObject);
        return callBack(null, "Result Published");
      }
    });
  },
  broadcast: async (data, callBack = () => {}) => {
    const { newNodeUrl, token } = data;
    data.allNetworkNodes = [...coin.networkNodes, coin.currentNodeUrl];

    // register broadcast
    const registerNode = {
      uri: `${newNodeUrl}/register-and-broadcast-node`,
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: true,
    };

    const registerNodeResponse = await rp(registerNode);
    const allNetworkNodes = registerNodeResponse.data.allNetworkNodes;

    allNetworkNodes.forEach((networkNodeUrl) => {
      const nodeNotAlreadyPresent = !coin.networkNodes.includes(networkNodeUrl);
      const notCurrentNode = coin.currentNodeUrl !== networkNodeUrl;
      if (nodeNotAlreadyPresent && notCurrentNode) {
        coin.networkNodes.push(networkNodeUrl);
      }
    });

    // implementing consensus algorithm after adding new nodes each time
    console.log(coin.networkNodes);
    const nodeRequestPromises = coin.networkNodes.map((node) => {
      const nodeConsensus = {
        uri: `${node}/consensus`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        json: true,
      };
      return rp(nodeConsensus);
    });

    const responses = await Promise.all(nodeRequestPromises);
    console.log(responses);

    return callBack(null, {
      message: "node created and broadcasted successfully",
    });
  },
};
