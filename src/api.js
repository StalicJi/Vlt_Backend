import axios from "axios";

export default axios.create({
  // baseURL: `https://192.168.1.243/api/`, //育聖筆電,
  baseURL: `https://192.168.1.172/api/`, //公司桌機
  // baseURL: `https://125.229.197.3:10443/api/`, //遠端
  // baseURL: `https://www.vlt.com.tw/PjChartApi/`, //公司後台

  headers: {
    "Content-Type": "application/json",
  },
});
