import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import GithubConfirm from "./routes/GithubConfirm";
import Home from "./routes/Home";
import KakaoConfirm from "./routes/KakaoConfirm";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";
import UploadPhotos from "./routes/UploadPhotos";
import UploadRoom from "./routes/UploadRoom";

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
      {
        path: "api/v2/rooms/upload",
        element: <UploadRoom />,
      },
      {
        path: "api/v2/rooms/:roomPk",
        element: <RoomDetail />,
      },
      {
        path: "api/v2/rooms/:roomPk/photos",
        element: <UploadPhotos />,
      },
      {
        path: "api/v2/social",
        children: [
          {
            path: "github",
            element: <GithubConfirm />,
          },
          { path: "kakao", element: <KakaoConfirm /> },
        ],
      },
    ],
  },
]);

export default router;
