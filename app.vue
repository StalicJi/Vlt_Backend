<template>
  <NuxtLayout>
    <div class="relative">
      <div class="flex min-h-screen">
        <SideBar class="shadow-r" />
        <div class="h-100vh w-full flex flex-col bg-white">
          <Header class="h-16 shadow-btm" />
          <NuxtPage class="flex-1 top-4" @openDialog="openDialog" />
        </div>
        <div v-show="isDisplayVisible">
          <div
            class="fixed top-0 left-0 w-full h-screen bg-black opacity-60 z-10"
          />
          <ExportDialog
            class="absolute top-[20%] left-[35%] rounded-sm z-20"
            @closeDialog="closeDialog"
            :project_id="projectId"
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import SideBar from "./components/Sidebar.vue";
import ExportDialog from "~/components/ExportDialog.vue";
import { ref } from "vue";

useHead({
  title: "後端管理系統",
  meta: [{ name: "description", content: "My amazing site." }],
});

// 控制 Dialog
const isDisplayVisible = ref(false);
const projectId = ref("");

const openDialog = (project_id: string) => {
  isDisplayVisible.value = true;
  projectId.value = project_id;
};
const closeDialog = () => {
  isDisplayVisible.value = false;
};
</script>
