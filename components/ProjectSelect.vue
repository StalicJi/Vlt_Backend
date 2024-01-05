<template>
  <div
    class="border w-full bg-[#126992] rounded-md drop-shadow-lg pt-2 pb-4 px-4"
  >
    <div class="flex-btw">
      <p class="text-white">專案選擇器</p>
      <Button buttonText="查詢" />
    </div>
    <div class="mt-4 px-2">
      <VaSelect
        v-model="valueSingle"
        :options="options"
        highlight-matched-text
        background="#fff"
        class="w-full"
        color="info"
      />
    </div>
  </div>
</template>

<script>
import API from "../src/api";
import Button from "../components/element/Button.vue";
export default {
  components: {
    Button,
  },
  name: "Searchable",

  data() {
    return {
      options: [
        // "員工園地專案統計功能開發",
        // "113年-嘉義市路燈管理系統軟體顧問服務維護",
        // "好水源網站",
        // "臺南市都市發展資訊系統",
        // "屏東7建物",
        // "112年北宜高網站功能增修",
        // "112年晨豐科技官方網站變更設計計畫",
        // "110年度新竹縣公共設施管線位置調查暨系統建置計畫委託資訊服務案",
      ],
      // valueSingle: "員工園地專案統計功能開發",
      valueSingle: "",
    };
  },

  beforeMount() {
    this.$axios;
    API.post("api/ProjectAnalysis/ProjectSelector", {
      id: "All",
    })
      .then((response) => {
        this.options = response.data.projectNames;
        this.valueSingle = response.data.projectNames[0];
      })
      .catch((error) => console.error(error));
  },
};
</script>
