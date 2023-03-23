const sha256 = require("sha256"); //importing sha256 hashing
const currentNodeUrl = process.env.IP_ADDRESS_SERVER;
// const currentNodeUrl = process.argv[3];

const { v4: uuidv4 } = require("uuid");

// defining blockcahin structure
function Blockchain() {
  this.chain = []; // store chain of blocks
  this.pendingTransactions = []; // store pending transactions
  this.createNewBlock(100, "0", "0"); // default parameters for genesis block
  this.currentNodeUrl = currentNodeUrl; // store current node url
  this.networkNodes = [currentNodeUrl]; // store url of all the connected nodes in the netwrok
}

// create a new block (nonce, previousBlockHash, hash)
Blockchain.prototype.createNewBlock = function (
  nonce,
  previousBlockHash,
  hash
) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transactions: this.pendingTransactions,
    nonce: nonce,
    hash: hash,
    previousBlockHash: previousBlockHash,
  };
  this.pendingTransactions = [];
  this.chain.push(newBlock);
  return newBlock;
};

// returns last block
Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
};

// create a transaction
Blockchain.prototype.createNewTransaction = function (
  name, // name
  candidate_address, // candidate unique address
  voter_address, // voter (unique address)
  party_name, // party name
  category_name
) {
  const transactionId = uuidv4().split("-").join("");
  const newTransaction = {
    amount: 1,
    name: name,
    category_name: category_name,
    candidate_address: candidate_address,
    voter_address: voter_address,
    party_name: party_name,
    transactionId: transactionId,
  };
  // console.log(transactionId);
  return newTransaction;
};

// push transaction into pendingTransactions
Blockchain.prototype.addTransactionToPendingTransactions = function (
  transactionObj
) {
  this.pendingTransactions.push(transactionObj);
  return this.getLastBlock()["index"] + 1;
};

// create a block hash (previousBlockHash, currentBlockData, nonce)
Blockchain.prototype.hashBlock = function (
  previousBlockHash,
  currentBlockData,
  nonce
) {
  const dataAsString =
    previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
  const hash = sha256(dataAsString);
  return hash;
};

// generate nonce as proof of work token
Blockchain.prototype.proofOfWork = function (
  previousBlockHash,
  currentBlockData
) {
  let nonce = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  while (hash.substring(0, 1) !== "0") {
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  }
  return nonce;
};
//fing highest count blockchain
Blockchain.prototype.findLongestChain = function (blockchains, maxChainLength) {
  let longestChains = [];

  const counts = {};
  blockchains.forEach((blockchain) => {
    const chainLength = blockchain.chain.length;
    if (chainLength === maxChainLength) {
      longestChains.push(blockchain);
    }
  })
  longestChains.forEach((blockchain) => {

    const hash = blockchain.chain[blockchain.chain.length - 1].hash;
    counts[hash] = (counts[hash] || 0) + 1;
  });

  let highestcounts = 0;
  let highestcountshash = null;
  Object.keys(counts).forEach((hash) => {
    if (counts[hash] > highestcounts) {
      highestcounts = counts[hash];
      highestcountshash = hash;
    }
  });

  let longestChain = null;
  for (let i = 0; i < longestChains.length; i++) {
    const lastBlock = longestChains[i].chain[maxChainLength - 1];
    if (lastBlock.hash === highestcountshash) {
      longestChain = longestChains[i].chain;
      break;
    }
  }

  return longestChain;
};



// implement consensus algorithem (longest chain rule)
Blockchain.prototype.chainIsValid = function (blockchain) {
  let validChain = true; //flag
  for (var i = 1; i < blockchain.length; i++) {
    const currentBlock = blockchain[i];
    const prevBlock = blockchain[i - 1];

    //error on rehashing
    const blockHash = this.hashBlock(
      prevBlock["hash"],
      {
        transactions: currentBlock["transactions"],
        index: currentBlock["index"],
      },
      currentBlock["nonce"]
    );
    // if (blockHash.substring(0, 1) !== '0') validChain = false;

    if (currentBlock["previousBlockHash"] !== prevBlock["hash"])
      validChain = false;
  }

  const genesisBlock = blockchain[0];
  const correctNonce = genesisBlock["nonce"] === 100;
  const correctPreviousHash = genesisBlock["previousBlockHash"] === "0";
  const correctHash = genesisBlock["hash"] === "0";
  const correctTransactions = genesisBlock["transactions"] === 0;
  if (
    !correctNonce ||
    !correctPreviousHash ||
    !correctHash ||
    correctTransactions
  )
    validChain = false;

  return validChain;
};

// vote count
Blockchain.prototype.voteCount = function (
  candidateName,
  candidate_address,
  category_name,
  party_name
) {
  const chain = this.chain;
  let votes = 0;
  let candidate = null;
  let name = null;
  let category = null;
  let party = null;
  // return chain;
  chain.forEach((block) => {
    const transactions = block.transactions;
    // console.log(transactions);
    transactions.forEach((transaction) => {
      candidate = candidate_address;
      name = candidateName;
      party = party_name;
      category = category_name;
      if (candidate_address === transaction.candidate_address) {
        votes = votes + transaction.amount;
      }
    });
  });
  return {
    votes: votes,
    candidate_name: name,
    candidate_address: candidate,
    category_name: category,
    party_name: party,
  };
};

module.exports = Blockchain;
