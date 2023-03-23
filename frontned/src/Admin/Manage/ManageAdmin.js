import { useEffect, useState } from "react";
import { getAdmin, deleteAdmin } from "../../Api/ApiHandler";

const ManageAdmin = (props) => {
  const [adminData, setAdminData] = useState([]);
  const [refresh, setRefresh] = useState();
  const token = props.token;

  useEffect(() => {
    getAdmin(token).then((response) => {
      try {
        setAdminData(response.data || []);
        // setAdminData(response.data);
        // console.log(response.data);
      } catch {
        console.log(response);
      }
    });
  }, [token, refresh]);

  const handleDelete = (id) => {
    deleteAdmin(id, token).then((response) => {
      console.log(response);
      setRefresh(Math.random());
    });
  };

  return (
    <div className="admin_container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Admin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {adminData.length > 0 &&
            adminData.map((item) => (
              <tr key={item.a_id}>
                <td>{item.username}</td>
                <td>
                  <button onClick={() => handleDelete(item.a_id)} type="submit">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAdmin;
