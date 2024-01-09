import axios from "axios";

export default axios.create({
  // baseURL: `https://192.168.1.243/`, //育聖電腦的後台
  baseURL: `https://192.168.1.172/`, //遠端的後台

  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer your_access_token", // 如果需要身份驗證，添加Authorization
  },
});
