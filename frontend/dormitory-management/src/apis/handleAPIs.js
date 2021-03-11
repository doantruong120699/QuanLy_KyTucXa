import axios from "axios";

async function requestLogin(user) {
  console.log("api");
  const body = {
    username: user.username,
    password: user.password,
  };
  return await axios({
    headers: { "Access-Control-Allow-Origin": "*" },
    method: "POST",
    url: "api/auth/login/",
    data: body,
  });
}
export { requestLogin };
