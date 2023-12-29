<template>
  <div
    class="border w-full h-28 bg-[#126992] rounded-md drop-shadow-lg py-2 px-4"
  >
    <div class="flex-btw">
      <p class="text-white">專案選擇器</p>
      <Button buttonText="查詢" />
    </div>
    <div class="mt-2 px-2">
      <VaSelect
        v-model="valueSingle"
        :options="options"
        searchable
        highlight-matched-text
        background="#fff"
        class="w-full"
        color="info"
      />
    </div>
  </div>
</template>

<script>
import Button from "../components/element/Button.vue";
export default {
  components: {
    Button,
  },
  name: "Searchable",
  data() {
    return {
      options: [
        "員工園地專案統計功能開發",
        "113年-嘉義市路燈管理系統軟體顧問服務維護",
        "好水源網站",
        "臺南市都市發展資訊系統",
        "屏東7建物",
        "112年北宜高網站功能增修",
        "112年晨豐科技官方網站變更設計計畫",
      ],
      valueSingle: "員工園地專案統計功能開發",
    };
  },
};
</script>
