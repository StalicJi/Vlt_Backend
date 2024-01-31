<template>
  <NuxtLayout>
    <div class="relative">
      <div class="flex min-h-screen">
        <SideBar class="shadow-r" />
        <div class="h-100vh w-full flex flex-col bg-white">
          <Header class="h-16 shadow-btm" />
          <NuxtPage class="flex-1 top-4" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts">
import Header from "./components/Header.vue";
import SideBar from "./components/Sidebar.vue";
import CryptoJS from "crypto-js";
import { getTokenFromLocal } from "~/utils/getToken";

export default {
  components: {
    Header,
    SideBar,
  },
  setup() {
    useHead({
      title: "後端管理系統",
      // meta: [{ name: "description", content: "My amazing site." }],
    });
  },

  mounted() {
    this.getUrlToken();
  },

  methods: {
    setCookie(name: string, value: any, days: any) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = "expires=" + date.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    },

    //解密後將資訊存到local
    getUrlToken() {
      const key = "ji3g4rupul4";
      const tokenPart = window.location.search.substring(1);
      const tokenArray = tokenPart.split("&");
      const token = tokenArray[0].split("=")[1];

      try {
        const bytes = CryptoJS.AES.decrypt(token, key);
        const stringOfToken = bytes.toString(CryptoJS.enc.Utf8);
        const decryptedToken = JSON.parse(stringOfToken);

        //正式 ----------------------------------------------

        localStorage.setItem("userStatus", JSON.stringify(decryptedToken));

        const redirectPath = [
          "DepManager",
          "GeneralManager",
          "ViceGeneralManager",
        ].includes(decryptedToken.groupId)
          ? "/"
          : `/user/${decryptedToken.staffId}`;

        window.location.href = redirectPath;

        //測試 -----------------------------------------------
        // const tokenObject = getTokenFromLocal();

        // localStorage.setItem(
        //   "userStatus",
        //   JSON.stringify({
        //     depId: "2",
        //     expiration: "2024-01-31T11:04:09.604Z",
        //     groupId: "sysUser",
        //     staffId: "1120401",
        //     userName: "紀宗文",
        //   })
        // );

        // localStorage.setItem(
        //   "userStatus",
        //   JSON.stringify({
        //     depId: "2",
        //     expiration: "2024-01-31T11:04:09.604Z",
        //     groupId: "AssistanManager",
        //     staffId: "1120401",
        //     userName: "紀宗文",
        //   })
        // );

        // const redirectPath = [
        //   "DepManager",
        //   "GeneralManager",
        //   "ViceGeneralManager",
        // ].includes(tokenObject.groupId)
        //   ? "/"
        //   : `/user/${tokenObject.staffId}`;

        // window.location.href = redirectPath;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
