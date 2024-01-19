<template>
  <div
    class="border w-full bg-[#126992] rounded-md drop-shadow-lg pt-2 pb-4 px-4"
  >
    <div class="flex-btw">
      <p class="text-white">專案選擇器</p>
      <Button buttonText="查詢" @click="projectSearch" />
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
    selectedProjectId: {
      type: String,
      default: "",
    },
  },
  name: "Searchable",

  data() {
    return {
      options: [],
      valueSingle: "",
      selectPj_id: "",
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

  watch: {
    valueSingle(newValue) {
      const reversedValue = newValue.split("").reverse().join("");
      const extractedSubstring = reversedValue.slice(1, 8);
      const finalResult = extractedSubstring.split("").reverse().join("");
      this.selectPj_id = finalResult;
    },
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

    projectSearch() {
      if (this.$route.path === `/user/${this.id}`)
        this.$router.push({
          path: `/user/${this.id}/${project_id}`,
        });

      if (this.$route.path === "/project") {
        // console.log(this.selectPj_id);
        this.$emit("selectId", this.selectPj_id);
      }
    },
  },
};
</script>
