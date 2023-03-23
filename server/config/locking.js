const zookeeper = require("node-zookeeper-client");
const os = require("os");

const lockPath = "/blockchain-lock-" + os.hostname() + "-seq-";

let zkClient;
const zkClientOptions = {
  sessionTimeout: 30000,
  spinDelay: 1000,
  retries: 5
};

const connectZookeeper = () => {
  zkClient = zookeeper.createClient("192.168.1.92:2181", zkClientOptions);
  zkClient.connect();
  zkClient.once("connected", () => {
    console.log("Connected to ZooKeeper ensemble");
  });
};

connectZookeeper();
module.exports = {
  acquireLock: async () => {
    return new Promise((resolve, reject) => {
      if (!zkClient || !zkClient.getState().name === 'SYNC_CONNECTED') {
        return reject(new Error('ZooKeeper client not connected'));
      }
      zkClient.create(
        lockPath,
        zookeeper.CreateMode.EPHEMERAL_SEQUENTIAL,
        (error, path) => {
          if (error) {
            reject(error);
          } else {
            console.log("Acquired lock:", path);
            zkClient.exists(
              path,
              (event) => {
                if (event) {
                  console.log("Lock state changed:", event);
                } else {
                  console.log("Lock node deleted");
                }
              },
              (error, state) => {
                if (error) {
                  console.error("Failed to set watch on lock node:", error);
                } else {
                  console.log("Watch set on lock node:", state);
                }
              }
            );
            resolve(path);
          }
        }
      );
    });
  },
  releaseLock: async (lockPath) => {
    return new Promise((resolve, reject) => {
      if (!zkClient || !(zkClient.getState().name === 'SYNC_CONNECTED')) {
        return reject(new Error('ZooKeeper client not connected'));
      }
      zkClient.getChildren("/", false, (error, children) => {
        if (error) {
          console.error("Failed to get children:", error);
          return reject(error);
        }
        const lockNodes = children.filter((child) => child.startsWith("blockchain-lock"));
        lockNodes.sort();
        if (lockNodes.length > 0) {
          const firstLockNode = lockNodes[0];
          const lockNodePath = "/" + firstLockNode;
          if (lockNodePath === lockPath) {
            zkClient.remove(lockNodePath, -1, (error, path) => {
              if (error) {
                console.error("Failed to release lock:", error);
                return reject(error);
              } else {
                console.log("Lock released:", path);
                return resolve(path);
              }
            });
          } else {
            console.log(`Not releasing lock for path ${lockPath} as it is no longer the first lock node.`);
            return resolve(null);
          }
        } else {
          console.log(`No lock nodes found.`);
          return resolve(null);
        }
      });
    });
  }

}

// export const acquireLock = async () => {
//   return new Promise((resolve, reject) => {
//     if (!zkClient || !zkClient.getState().name === 'SYNC_CONNECTED') {
//       return reject(new Error('ZooKeeper client not connected'));
//     }
//     zkClient.create(
//       lockPath,
//       zookeeper.CreateMode.EPHEMERAL_SEQUENTIAL,
//       (error, path) => {
//         if (error) {
//           reject(error);
//         } else {
//           console.log("Acquired lock:", path);
//           zkClient.exists(
//             path,
//             (event) => {
//               if (event) {
//                 console.log("Lock state changed:", event);
//               } else {
//                 console.log("Lock node deleted");
//               }
//             },
//             (error, state) => {
//               if (error) {
//                 console.error("Failed to set watch on lock node:", error);
//               } else {
//                 console.log("Watch set on lock node:", state);
//               }
//             }
//           );
//           resolve(path);
//         }
//       }
//     );
//   });
// };

// export const releaseLock = async (lockPath) => {
//   return new Promise((resolve, reject) => {
//     if (!zkClient || !zkClient.getState().name === 'SYNC_CONNECTED') {
//       return reject(new Error('ZooKeeper client not connected'));
//     }
//     zkClient.getChildren("/", false, (error, children) => {
//       if (error) {
//         console.error("Failed to get children:", error);
//         return reject(error);
//       }
//       const lockNodes = children.filter((child) => child.startsWith("blockchain-lock"));
//       lockNodes.sort();
//       if (lockNodes.length > 0) {
//         const firstLockNode = lockNodes[0];
//         const lockNodePath = "/" + firstLockNode;
//         if (lockNodePath === lockPath) {
//           zkClient.remove(lockNodePath, -1, (error, path) => {
//             if (error) {
//               console.error("Failed to release lock:", error);
//               return reject(error);
//             } else {
//               console.log("Lock released:", path);
//               return resolve(path);
//             }
//           });
//         } else {
//           console.log(`Not releasing lock for path ${lockPath} as it is no longer the first lock node.`);
//           return resolve(null);
//         }
//       } else {
//         console.log(`No lock nodes found.`);
//         return resolve(null);
//       }
//     });
//   });
// };
