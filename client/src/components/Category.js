import { deleteCategory } from "../Api/ApiHandler";

const Category = (props) => {
  const deleteHandler = () => {
    deleteCategory(props.item.c_id, props.token).then((response) => {
    //   console.log(response);
      props.refreshHandler(Math.random());
      sessionStorage.setItem("refreshData", Math.random());

    });
  };
  return (
    <tr>
      <td>{props.item.c_id}</td>
      <td>{props.item.name}</td>
      <td onClickCapture={deleteHandler} class="action">
        Delete
      </td>
    </tr>
  );
};

export default Category;
