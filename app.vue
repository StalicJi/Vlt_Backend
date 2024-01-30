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

<script setup lang="ts">
import Header from "./components/Header.vue";
import SideBar from "./components/Sidebar.vue";
import CryptoJS from "crypto-js";

useHead({
  title: "後端管理系統",
  // meta: [{ name: "description", content: "My amazing site." }],
});

const route = useRoute();

let decryptedToken = "";

const getUrlToken = () => {
  const key = "ji3g4rupul4";
  route.query.token;
  try {
    const bytes = CryptoJS.AES.decrypt(route.query.token, key);
    decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

    console.log(decryptedToken);
  } catch (error) {
    console.error(error);
  }
};

onMounted(getUrlToken);
</script>
