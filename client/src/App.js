import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./Admin/Admin";
import Result from "./Admin/Result";
import User from "./User/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <User />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/result",
    element: <Result />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
