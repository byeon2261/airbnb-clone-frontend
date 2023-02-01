import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";

const router = createBrowserRouter([
  {
    path: "/api/v2/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "rooms",
        element: <Home />,
      },
      {
        path: "rooms/:roomPk",
        element: <RoomDetail />,
      },
    ],
  },
]);

export default router;
