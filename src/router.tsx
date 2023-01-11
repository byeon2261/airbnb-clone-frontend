import { createBrowserRouter } from "react-router-dom";
import Root from "./components/root";
import Home from "./routes/home";
import NotFound from "./routes/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

export default router;
