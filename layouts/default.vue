<template>
  <div class="flex min-h-screen">
    <Sidebar class="shadow-r" />
    <div class="h-100vh w-full flex flex-col bg-white">
      <Header class="h-16 shadow-btm" />
      <NuxtPage class="flex-1 top-4" />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
export default {};
</script>
