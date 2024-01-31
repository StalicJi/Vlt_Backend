export function getTokenFromLocal() {
  let token = null;

  const storedToken = localStorage.getItem("userStatus");

  if (storedToken) {
    token = JSON.parse(storedToken);
  }
  console.log(token);
  return token;
}
