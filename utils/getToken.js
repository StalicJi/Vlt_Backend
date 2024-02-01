import CryptoJS from "crypto-js";

export function getTokenFromLocal() {
  let needDecrypt = false;
  const key = "ji3g4rupul4";
  let token = null;
  const tokenPart = window.location.search.substring(1);
  const tokenArray = tokenPart.split("&");
  token = tokenArray[0].split("=")[1];
  let storedToken = localStorage.getItem("userStatus");

  //判斷Url是否攜帶Token
  if (token != "undefined") {
    localStorage.setItem("userStatus", token);
    storedToken = token;
    needDecrypt = true;

    //判斷localStorage是否有Token
  } else if (storedToken != null && storedToken != "undefined") {
    needDecrypt = true;
  }

  try {
    //判斷是否需要解密
    if (needDecrypt) {
      //解密Token
      const bytes = CryptoJS.AES.decrypt(storedToken, key);
      const stringOfToken = bytes.toString(CryptoJS.enc.Utf8);
      const decryptedToken = JSON.parse(stringOfToken);

      if (decryptedToken) {
        const nowDate = new Date();
        const expiration = Date.parse(decryptedToken.expiration);

        //判斷Token是否過期
        if (nowDate >= expiration) {
          localStorage.removeItem("userStatus");
        } else {
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
      }
    }
    // console.log(token);
    return token;
  } catch (error) {
    console.error(error);
  }
}
