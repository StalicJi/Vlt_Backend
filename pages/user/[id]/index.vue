<template>
  <div class="grid grid-flow-row p-7">
    <!-- Head -->
    <div class="flex-btw">
      <div class="flex">
        <PageTitle icon-name="person" :page-title="titleUserName" />
        <Button
          buttonText="專案查詢"
          @click="
            $router.push({
              path: `/user/${$route.params.id}/selectstaffpoject`,
            })
          "
          class="ml-4"
        />
      </div>
      <div class="flex-btw w-80">
        <h1 class="ml-4 text-xl">部門：{{ searchDepName }}</h1>
        <h1 class="ml-4 text-xl">職稱：{{ searchJobName }}</h1>
      </div>
    </div>

    <!-- Section -->
    <div class="mt-8 grid grid-flow-col grid-cols-5 gap-4">
      <div class="col-span-2 grid grid-flow-row grid-rows-5 gap-4">
        <div class="row-span-2 grid grid-cols-2 grid-flow-row gap-4">
          <AllStaCard
            bgColorClass="bg-[#ad7596]"
            borderColor="border-[#ad7596]"
            label="業務中"
            iconName="library_books"
            :value="parseInt(ProjecBusinessNumber)"
            @card-click="handleCardClick"
          />
          <AllStaCard
            bgColorClass="bg-[#87AD75]"
            borderColor="border-[#87AD75]"
            label="執行中"
            iconName="code"
            :value="parseInt(ProjectExecutingNumber)"
            @card-click="handleCardClick"
          />
          <AllStaCard
            bgColorClass="bg-[#047AE7]"
            borderColor="border-[#047AE7]"
            label="保固中"
            iconName="construction"
            :value="parseInt(ProjectWarrantygNumber)"
            @card-click="handleCardClick"
          />
          <AllStaCard
            bgColorClass="bg-[#e3a74d]"
            borderColor="border-[#e3a74d]"
            label="結案"
            iconName="assignment_turned_in"
            :value="parseInt(ProjectClosethecaseNumber)"
            @card-click="handleCardClick"
          />
        </div>

        <!-- 長條圖 -->
        <div class="border rounded-lg row-span-3 drop-shadow-lg bg-white pt-5">
          <div id="barChart" style="height: 100%; width: 100%"></div>
        </div>
      </div>
      <div class="rounded-md drop-shadow-lg col-span-3 flex">
        <YearOfCal :id="$route.params.id" />
      </div>
    </div>
  </div>
</template>

<script>
import API from "../../../src/api";
import Button from "../../../components/element/Button.vue";
import ProjectSelect from "../../../components/ProjectSelect.vue";
import PageTitle from "../../../components/element/PageTitle.vue";
import YearOfCal from "../../../components/YearOfCal.vue";
import AllStaCard from "../../../components/element/AllStatisticsCard.vue";
import * as echarts from "echarts";
import { checkPath } from "~/utils/routerControll";

export default {
  components: {
    Button,
    ProjectSelect,
    YearOfCal,
    PageTitle,
    AllStaCard,
  },

  data() {
    return {
      ProjecBusinessNumber: 0,
      ProjectExecutingNumber: 0,
      ProjectWarrantygNumber: 0,
      ProjectClosethecaseNumber: 0,
      searchUserName: "",
      searchDepName: "",
      searchJobName: "",
      titleUserName: "",
    };
  },

  beforeMount() {
    checkPath();
  },

  mounted() {
    this.getStaffInfo();
    this.getStaffProjectData();
  },

  methods: {
    getStaffInfo() {
      API.post("/api/ProjectAnalysis/PostStaffData", {
        Staffid: this.$route.params.id,
      })
        .then((response) => {
          const userId = response.data[0].staff_id;
          // console.log(userId);

          if (userId === this.$route.params.id) {
            this.searchUserName = response.data[0].name;
            this.searchDepName = response.data[0].dep_name;
            this.searchJobName = response.data[0].jobname;
            this.titleUserName = String(
              "個人專案統計" + " : " + " " + response.data[0].name
            );
          } else {
            console.error("User ID mismatch");
          }
        })
        .catch((error) => {
          this.titleUserName = "查無此人";
          console.error("Error fetching user data:", error);
        });
    },

    getStaffProjectData() {
      API.post("/api/ProjectAnalysis/GetProjectData", {
        id: this.$route.params.id,
      })
        .then((response) => {
          this.ProjectNumber = response.data[0].projectNumber;
          this.ProjecBusinessNumber = response.data[0].projecBusinessNumber;
          this.ProjectExecutingNumber = response.data[0].projectExecutingNumber;
          this.ProjectWarrantygNumber = response.data[0].projectWarrantygNumber;
          this.ProjectClosethecaseNumber =
            response.data[0].projectClosethecaseNumber;

          this.initYBarChart();
        })
        .catch((error) => console.error("Error fetching project data:", error));
    },

    initYBarChart() {
      const chartDom = document.getElementById("barChart");
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: "當前專案柱狀圖",
          textStyle: { fontSize: "20", fontWeight: "normal" },
          left: "center",
        },

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        xAxis: {
          type: "category",
          axisLabel: {
            fontSize: 16,
          },
          data: ["業務中", "執行中", "保固中", "結案"],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 16,
          },
        },
        series: [
          {
            data: [
              {
                value: this.ProjecBusinessNumber,
                itemStyle: { color: "#ad7596", opacity: 0.8 },
              },
              {
                value: this.ProjectExecutingNumber,
                itemStyle: { color: "#87AD75", opacity: 0.8 },
              },
              {
                value: this.ProjectWarrantygNumber,
                itemStyle: { color: "#047AE7", opacity: 0.8 },
              },
              {
                value: this.ProjectClosethecaseNumber,
                itemStyle: { color: "#e3a74d", opacity: 0.8 },
              },
            ],
            type: "bar",
          },
        ],
      };

      myChart.setOption(option);
      option && myChart.setOption(option);
    },

    handleCardClick(label) {
      this.goAllInfoPage(label);
    },

    goAllInfoPage(label) {
      this.$router.push({
        path: `/user/${this.$route.params.id}/projectstatus`,
        query: { status: label },
      });
    },
  },
};
</script>
