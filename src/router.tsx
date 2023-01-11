import { createBrowserRouter } from "react-router-dom";
import Root from "./components/root";
import Home from "./route/home";
import Users from "./route/users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);

export default router;
