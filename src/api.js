import axios from "axios";

export default axios.create({
  baseURL: `https://192.168.1.243/`, //育聖筆電,
  // baseURL: `https://192.168.1.172/`, //公司桌機
  // baseURL: `https://125.229.197.3:10443/`, //遠端

  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer your_access_token", // 如果需要身份驗證，添加Authorization
  },
});
