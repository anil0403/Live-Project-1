// const currentNodeUrl = process.argv[3];

// const { response } = require("express");
// const rp = require("request-promise");

// function SynchronizeNodes() {
//   // let nodes = [
//   //   "http://192.168.1.94:3001",
//   //   "http://192.168.1.100:3002"
//   // ];

//   // nodes.forEach(item => {
//   //   const nodeRequestOption = {
//   //     uri: item + "/register-and-broadcast-node",
//   //     method: "post",
//   //     body: {
//   //       newNodeUrl: currentNodeUrl,
//   //     },
//   //     json: true,
//   //   };
//   //   const nodeResponse = rp(nodeRequestOption);
//   //   Promise.resolve(nodeResponse).then((response) => {
//   //     // consensus algorithm
//   //     // every time a nodee stated, consensus algortihem triggered
//   //     const nodeConsensus = {
//   //       uri: currentNodeUrl + "/consensus",
//   //       method: "get",
//   //       json: true,
//   //     };
//   //     const nodeConsensusResponse = rp(nodeConsensus);
//   //     Promise.resolve(nodeConsensusResponse).then((response) => {
//   //       // console.log(response);
//   //       //
//   //     });
//   //     console.log(response);
//   //   });
//   // })

//   if (currentNodeUrl != "http://localhost:3001") {
//     const nodeRequestOption = {
//       uri: "http://localhost:3001" + "/register-and-broadcast-node",
//       method: "post",
//       body: {
//         newNodeUrl: currentNodeUrl,
//       },
//       json: true,
//     };
//     const nodeResponse = rp(nodeRequestOption);
//     Promise.resolve(nodeResponse).then((response) => {
//       // consensus algorithm
//       // every time a nodee stated, consensus algortihem triggered
//       const nodeConsensus = {
//         uri: currentNodeUrl + "/consensus",
//         method: "get",
//         json: true,
//       };
//       const nodeConsensusResponse = rp(nodeConsensus);
//       Promise.resolve(nodeConsensusResponse).then((response) => {
//         // console.log(response);
//         //
//       });
//       console.log(response);
//     });
//   }
// }

// module.exports = SynchronizeNodes;
