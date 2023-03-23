import { useEffect, useState, useCallback } from "react";
import { getCategory } from "../../Api/ApiHandler";
import Category from "../../components/Category";

const ManageCategory = ({ token }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const refreshData = sessionStorage.getItem("refreshData");

  const refreshHandler = useCallback((data) => {
    setRefresh(data);
  }, []);

  useEffect(() => {
    getCategory(token).then((response) => {
      setCategoryData(response.data || []);
    });
  }, [token, refresh, refreshData]);

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>S.N</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {categoryData.length > 0 &&
          categoryData.map((item) => (
            <Category
              key={item.cat_id}
              token={token}
              refreshHandler={refreshHandler}
              item={item}
            />
          ))}
      </tbody>
    </table>
  );
};

export default ManageCategory;
