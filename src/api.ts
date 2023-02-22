import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v2/",
  withCredentials: true,
});

export const getRooms = () =>
  instance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  const [ROOMS, roomPk] = queryKey;
  return instance.get(`rooms/${roomPk}`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [ROOMS, roomPk] = queryKey;
  return instance
    .get(`rooms/${roomPk}/reviews`)
    .then((response) => response.data);
};

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export const logOut = () =>
  instance
    .post(`users/log-out`, null, {
      headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
    })
    .then((response) => response.data);

export const githubLogin = (code: string) => {
  return instance
    .post(
      `users/github`,
      { code },
      {
        headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
      }
    )
    .then((response) => response.status);
};

export const kakaoLogin = (code: string) =>
  instance
    .post(
      "users/kakao",
      { code },
      {
        headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
      }
    )
    .then((response) => response.status);

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}
export interface IUsernameLoginSuccess {
  ok: string;
}
export interface IUsernameLoginError {
  error: string;
}

export const usernameLogin = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance.post(
    "users/log-in",
    { username, password },
    {
      headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
    }
  );

export interface ISignUp {
  name: string;
  email: string;
  username: string;
  password: string;
}

export const signUp = ({ name, email, username, password }: ISignUp) => {
  console.log(name, email, username, password);
  instance.post(
    "users/",
    { name, email, username, password },
    {
      headers: { "X-CSRFToken": Cookie.get("csrftoken") || "" },
    }
  );
};
