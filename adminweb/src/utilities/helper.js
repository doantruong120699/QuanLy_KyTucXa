import jwt from "jsonwebtoken";
export const getAuth = () => {
  const auth = localStorage.getItem("user");
  return typeof auth === "string" ? JSON.parse(auth) : null;
};
export const setAuth = (token) => {
  const user = jwt.decode(token);
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("user", JSON.stringify(user));
};
