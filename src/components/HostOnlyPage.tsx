import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

interface IHostOnlyPage {
  children: React.ReactNode;
}

export default function HostOnlyPage({ children }: IHostOnlyPage) {
  const { user, isLoggedIn } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      if (!user?.is_host) {
        navigate("/");
      }
    }
  }, [user, isLoggedIn, navigate]);
  return <>{children}</>;
}
