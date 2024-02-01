import CryptoJS from "crypto-js";

export function getTokenFromLocal() {
  const key = "ji3g4rupul4";
  let token = null;

  const storedToken = localStorage.getItem("userStatus");

  try {
    const bytes = CryptoJS.AES.decrypt(storedToken, key);
    const stringOfToken = bytes.toString(CryptoJS.enc.Utf8);
    const decryptedToken = JSON.parse(stringOfToken);

    if (decryptedToken) {
      //正式
      token = decryptedToken;

      //測試
      // token = {
      //   depId: "2",
      //   expiration: "2024-01-31T11:04:09.604Z",
      //   groupId: "DepManager",
      //   staffId: "1120401",
      //   userName: "紀宗文",
      // };
      // token = {
      //   depId: "2",
      //   expiration: "2024-01-31T11:04:09.604Z",
      //   groupId: "GeneralManager",
      //   staffId: "1120401",
      //   userName: "紀宗文",
      // };
    }
    console.log(token);
    return token;
  } catch (error) {
    console.error(error);
  }
}
