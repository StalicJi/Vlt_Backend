<template>
  <NuxtLayout>
    <div class="relative">
      <div class="flex min-h-screen">
        <SideBar class="shadow-r" />
        <div class="h-100vh w-full flex flex-col bg-white">
          <Header :userName="userName" class="h-16 shadow-btm" />
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
  data() {
    return {
      decryptedToken: "",
      userName: "",
    };
  },
  mounted() {
    this.getUrlToken();
  },
  methods: {
    getUrlToken() {
      const key = "ji3g4rupul4";
      const tokenPart = window.location.search.substring(1);
      const tokenArray = tokenPart.split("&");
      const token = tokenArray[0].split("=")[1];

      try {
        const bytes = CryptoJS.AES.decrypt(token, key);
        const stringOfToken = bytes.toString(CryptoJS.enc.Utf8);
        const decryptedToken = JSON.parse(stringOfToken);

        this.decryptedToken = decryptedToken;
        this.userName = decryptedToken.userName;

        // console.log(this.userName);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<!-- <script setup lang="ts">
import Header from "./components/Header.vue";
import SideBar from "./components/Sidebar.vue";
import CryptoJS from "crypto-js";
// import { defineProps } from "vue";

useHead({
  title: "後端管理系統",
  // meta: [{ name: "description", content: "My amazing site." }],
});

const route = useRoute();

let decryptedToken = "";

const getUrlToken = () => {
  const key = "ji3g4rupul4";

  const tokenPart = route.fullPath.split("?")[1];
  const tokenArray = tokenPart.split("&");
  const token = tokenArray[0].split("=")[1];

  try {
    const bytes = CryptoJS.AES.decrypt(token, key);
    const stringOfToken = bytes.toString(CryptoJS.enc.Utf8);
    decryptedToken = JSON.parse(stringOfToken);
    console.log(decryptedToken);
  } catch (error) {
    console.error(error);
  }
};

onMounted(getUrlToken);
</script> -->
