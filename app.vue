<template>
  <NuxtLayout>
    <div class="flex min-h-screen">
      <SideBar class="shadow-r" />
      <div class="h-100vh w-full flex flex-col bg-white">
        <Header class="h-16 shadow-btm" />
        <NuxtPage class="flex-1 top-4" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import SideBar from "./components/Sidebar.vue";

useHead({
  title: "後端管理系統",
  meta: [{ name: "description", content: "My amazing site." }],
});
</script>
