<template>
  <div class="p-4 grid gap-4 grid-flow-row grid-rows-12 flex-1">
    <div class="flex gap-4 w-full row-span-1">
      <VaDateInput background="#fff" color="info" placeholder="請選擇起始日" />
      <VaDateInput background="#fff" color="info" placeholder="請選擇結束日" />
      <Button buttonText="查詢" />
    </div>

    <div class="row-span-5 grid grid-flow-col grid-cols-5 gap-4">
      <div class="grid grid-flow-row grid-rows-6 gap-4 col-span-2 text-white">
        <div class="flex-btw px-4 bg-[#787276] rounded-md drop-shadow-lg">
          <p class="">所有專案進行總工時 :</p>
          <div class="flex-center">
            <!-- *!小時是變數 -->
            <span class="text-3xl drop-shadow-lg">1000</span>
            <p class="pl-2">小時</p>
          </div>
        </div>
        <div
          class="px-4 py-2 bg-[#787276] row-span-5 rounded-md drop-shadow-lg flex flex-col"
        >
          <p class="mb-2">人員專案進行時間</p>
          <div class="border h-full"></div>
        </div>
      </div>

      <div
        class="border border-yellow-300 col-span-3 rounded-md drop-shadow-lg"
      >
        圓餅圖
      </div>
    </div>

    <div class="border row-span-6">長條圖</div>
  </div>
</template>

<script>
import Button from "../components/element/Button.vue";
export default {
  components: {
    Button,
  },
  data() {
    return {
      value: new Date(2000, 0, 1),
    };
  },
};
</script>
