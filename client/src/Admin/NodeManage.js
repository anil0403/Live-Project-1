import { useState, useEffect } from "react";
import { registeAndBroadcastNode, getNetworkNodes } from "../Api/ApiHandler";

const NodeManage = (props) => {
  const token = props.token;
  const [alert, setAlert] = useState("");
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [nodes, setNodes] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getNetworkNodes(token).then((response) => {
      console.log(response);
      setNodes(response.data);
    });
  }, [token, refresh]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newNodeUrl = "http://" + ip + ":" + port;
    await registeAndBroadcastNode(newNodeUrl, token).then((response) => {
      console.log(response);
      setAlert(response.data.message);
    });
    setRefresh(!refresh);
  };
  return (
    <div className="node-container">
      <form onSubmit={submitHandler}>
        <label>IP Addres</label>
        <input
          type="text"
          required
          placeholder="Enter IP Address Of Running Node"
          onChange={(e) => setIp(e.target.value)}
        />
        <label>PORT</label>
        <input
          type="number"
          required
          placeholder="Enter Port Number"
          onChange={(e) => setPort(e.target.value)}
        />
        <button type="submit">Connect</button>
      </form>
      <div class="alert">{alert}</div>
      <div className="manage-node">
        <h3>Current Nodes In The Network</h3>
        <ul>
          {nodes.length > 0 &&
            nodes.map((node) => {
              return <li>{node}</li>;
            })}
        </ul>
      </div>
    </div>
  );
};

export default NodeManage;
