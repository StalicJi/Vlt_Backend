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
import { getTokenFromLocal } from "~/utils/getToken";

export default {
  components: {
    Header,
    SideBar,
  },
  setup() {
    useHead({
      title: "後端管理系統-專案統計",
      // meta: [{ name: "description", content: "My amazing site." }],
    });
  },

  mounted() {
    this.saveTokenToLocal();
  },

  methods: {
    //從網址提取token
    saveTokenToLocal() {
      try {
        const tokenObject = getTokenFromLocal();
        const route = useRoute();

        if (
          tokenObject!.groupId !== "DepManager" &&
          tokenObject!.groupId !== "GeneralManager" &&
          tokenObject!.groupId !== "ViceGeneralManager" &&
          route.path === "/"
        ) {
          window.location.href = `/user/${tokenObject!.staffId}`;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
