export const getAuth = () => {
  const auth = localStorage.getItem("user");
  console.log(auth);
  return typeof auth === "string" ? JSON.stringify(auth) : null;
};
export const setAuth = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
