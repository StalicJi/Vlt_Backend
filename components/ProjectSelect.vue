<template>
  <div
    class="border w-full bg-[#126992] rounded-md drop-shadow-lg pt-2 pb-4 px-4"
  >
    <div class="flex-btw">
      <p class="text-white">專案選擇器</p>
      <Button buttonText="查詢" @click="projectSearch(this.valueSingle)" />
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

  props: {
    id: {
      type: String,
      default: "",
    },
    project_id: {
      type: String && Number,
    },
    handelSearch: {
      type: Function,
    },
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

  mounted() {
    if (this.$route.path === "/project") {
      this.getAllSelect();
    } else if (this.$route.path === `/user/${this.id}/selectstaffpoject`) {
      this.getIdSelect(this.id);
    } else {
      console.log("The selector is not in a valid link");
    }
  },

  methods: {
    getAllSelect() {
      API.post("api/ProjectAnalysis/ProjectSelector", {
        id: "All",
      })
        .then((response) => {
          const allSelectData = response.data;
          let options = [];

          allSelectData.forEach((data) => {
            options.push(`${data.pj_name} (${data.pj_id})`);
          });

          this.options = options;
          this.valueSingle = "請選擇專案...";
        })
        .catch((error) =>
          console.error("Error fetching all project data:", error)
        );
    },

    getIdSelect(userid) {
      API.post("api/ProjectAnalysis/ProjectSelector", {
        id: userid,
      })
        .then((response) => {
          if (response) {
            const staffSelectData = response.data;
            let options = [];

            staffSelectData.forEach((data) => {
              options.push(`${data.pj_name} (${data.pj_id})`);
              // console.log(options);
            });

            this.options = options;
            this.valueSingle = "請選擇專案...";
          } else {
            this.valueSingle = "此員工無專案紀錄...";
          }
        })
        .catch((error) =>
          console.error("Error fetching project data with user id :", error)
        );
    },

    // projectSearch(project_id) {
    //   if (this.$route.path === `/user/${this.id}`)
    //     this.$router.push({
    //       path: `/user/${this.id}/${project_id}`,
    //     });

    //   if (this.$route.path === "/project") console.log("專案各別查詢:搜尋專案");
    // },
  },
};
</script>
