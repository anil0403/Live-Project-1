import { deleteParty } from "../Api/ApiHandler";
const Party = (props) => {
  const token = props.token;
  const data = props.data;

  const deleteHandler = () => {
    deleteParty(data.p_id, token).then((response) => {
      props.refreshHnadler(Math.random());
      console.log("party deleted");
      sessionStorage.setItem("refreshData", Math.random());
    });
  };
  return (
    <tr>
      <td>{data.p_id}</td>
      <td>{data.name}</td>
      <td className="action" onClickCapture={deleteHandler}>
        Delete
      </td>
    </tr>
  );
};
export default Party;
