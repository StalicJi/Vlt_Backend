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
import axios from "axios";
import Button from "../components/element/Button.vue";
export default {
  components: {
    Button,
  },
  name: "Searchable",

  data() {
    return {
      options: [
    
      ],
      valueSingle: ""
      // options: [],
      // valueSingle: "",
    };
  },

  beforeMount() {
    //POST請求
    axios
      .post("https://192.168.1.243/api/ProjectAnalysis/ProjectSelector", {
        id: "All",
      })
      .then((response) => {
        this.options = response.data.projectNames;
        this.valueSingle = response.data.projectNames[0];
      })
      .catch((error) => console.log("11"));
  },
};
</script>
