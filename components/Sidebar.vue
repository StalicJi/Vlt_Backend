<template>
  <div class="flex flex-col bg-[#126992]">
    <div class="flex items-center justify-center w-full h-16">
      <img
        class="w-7 h-7 mr-2"
        src="../public/images/VLT_logo.png"
        alt="logo"
      />
      <h1 class="text-xl text-white">後台管理系統</h1>
    </div>
    <div class="border-b border-gray-400" />
    <Menu class="my-10" />
  </div>
</template>

<script setup lang="ts">
import Menu from "../components/Menu.vue";
</script>
