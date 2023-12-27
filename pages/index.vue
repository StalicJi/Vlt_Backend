<template>
  <div class="flex flex-col p-7">
    <!-- Head -->
    <div class="flex-btw">
      <div class="flex items-center">
        <VaIcon name="bar_chart" size="28px" color="textPrimary" />
        <h1 class="text-2xl">專案統計</h1>
      </div>
      <div>
        <Button buttonText="個人專案查詢" />
      </div>
    </div>

    <!-- Section -->
    <div class="mt-8 flex-1 grid grid-flow-col grid-cols-5 gap-4">
      <div class="col-span-2 grid grid-flow-row grid-rows-6 gap-4">
        <ProjectSelect class="row-span-1 h-full" />
        <div class="border border-yellow-600 row-span-2">全部專案統計</div>
        <div class="border border-blue-600 row-span-3">當前專案長條圖</div>
      </div>
      <div class="border border-green-600 col-span-3">right</div>
    </div>
  </div>
</template>

<script>
import Button from "../components/element/Button.vue";
import ProjectSelect from "../components/ProjectSelect.vue";
export default {
  components: {
    Button,
    ProjectSelect,
  },
};
</script>
