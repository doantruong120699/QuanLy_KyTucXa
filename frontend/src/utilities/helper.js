export const getAuth = () => {
  const auth = localStorage.getItem("user");
  return typeof auth === "string" ? JSON.parse(auth) : null;
};
export const setAuth = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
