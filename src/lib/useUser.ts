import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { IUser } from "../type";

export default function useUser() {
  const { isLoading, data, isError, error } = useQuery<IUser>(["me"], getMe, {
    retry: false,
  });
  console.log("data >>>: ", data);
  console.log("error >>>: ", error);
  console.log("isError >>>: ", isError);
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
