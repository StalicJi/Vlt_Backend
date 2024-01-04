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

<script>
import Header from "./components/Header.vue";
import SideBar from "./components/Sidebar.vue";

export default {
  components: {
    Header,
    SideBar,
  },
};
</script>
