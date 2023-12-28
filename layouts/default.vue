<template>
  <div class="flex">
    <Sidebar class="shadow-r" />
    <div class="h-screen w-full flex flex-col bg-white">
      <Header class="h-16 shadow-btm" />
      <NuxtPage class="flex-1" />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
export default {};
</script>
