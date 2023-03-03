import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

export default function useHostOnlyPage() {
  const { user, isLoggedIn } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      if (!user?.is_host) {
        navigate("/");
      }
    }
  }, [user, isLoggedIn, navigate]);
  return;
}
