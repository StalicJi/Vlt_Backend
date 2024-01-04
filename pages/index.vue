<template>
  <div class="grid grid-flow-row p-7">
    <!-- Head -->
    <div class="flex-btw">
      <div class="flex items-center">
        <VaIcon name="bar_chart" size="28px" color="textPrimary" />
        <h1 class="text-2xl">專案統計</h1>
      </div>
      <div>
        <Button buttonText="個人專案查詢" @click="goToStuffTabel" />
      </div>
    </div>

    <!-- Section -->
    <div class="mt-8 grid grid-flow-col grid-cols-5 gap-4">
      <div class="col-span-2 grid grid-flow-row grid-rows-6 gap-4">
        <ProjectSelect class="row-span-1" />

        <div class="row-span-2 grid grid-cols-2 grid-flow-row gap-4">
          <div class="bg-[#ad7596] flex rounded-md drop-shadow-lg">
            <div class="flex-1 flex-center flex-col">
              <p class="text-white mb-1">業務中</p>
              <VaIcon name="library_books" size="3rem" color="#fff" />
            </div>
            <p
              class="flex-1 flex-center text-[4rem] text-white font-bold text-shadow"
            >
              {{ ProjectNumber }}
            </p>
          </div>
          <div class="bg-[#87AD75] flex rounded-md drop-shadow-lg">
            <div class="flex-1 flex-center flex-col">
              <p class="text-white mb-1">執行中</p>
              <VaIcon name="code" size="3rem" color="#fff" />
            </div>
            <p
              class="flex-1 flex-center text-[4rem] text-white font-bold text-shadow"
            >
              {{ ProjectExecutingNumber }}
            </p>
          </div>
          <div class="bg-[#047AE7] flex rounded-md drop-shadow-lg">
            <div class="flex-1 flex-center flex-col">
              <p class="text-white mb-1">保固中</p>
              <VaIcon name="construction" size="3rem" color="#fff" />
            </div>
            <p
              class="flex-1 flex-center text-[4rem] text-white font-bold text-shadow"
            >
              {{ ProjectWarrantygNumber }}
            </p>
          </div>
          <div class="bg-[#e3a74d] flex rounded-md drop-shadow-lg">
            <div class="flex-1 flex-center flex-col">
              <p class="text-white mb-1">結案</p>
              <VaIcon name="assignment_turned_in" size="3rem" color="#fff" />
            </div>
            <p
              class="flex-1 flex-center text-[4rem] text-white font-bold text-shadow"
            >
              {{ ProjectClosethecaseNumber }}
            </p>
          </div>
        </div>

        <!-- 長條圖 -->
        <div class="border rounded-lg row-span-3 drop-shadow-lg bg-white pt-5">
          <div id="barChart" style="height: 100%; width: 100%"></div>
        </div>
      </div>
      <div class="rounded-md drop-shadow-lg col-span-3 flex">
        <YearOfCal />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Button from "../components/element/Button.vue";
import ProjectSelect from "../components/ProjectSelect.vue";
import YearOfCal from "../components/YearOfCal.vue";
import * as echarts from "echarts";

export default {
  components: {
    Button,
    ProjectSelect,
    YearOfCal,
  },

  data() {
    return {
      ProjectNumber: 0,
      ProjectExecutingNumber: 0,
      ProjectWarrantygNumber: 0,
      ProjectClosethecaseNumber: 0,
    };
  },
  mounted() {
    this.initBarChart();
  },

  methods: {
    initBarChart() {
      const chartDom = document.getElementById("barChart");
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: "當前專案柱狀圖",
          textStyle: { fontSize: "20", fontWeight: "normal" },
          left: "center",
        },
        //小視窗觸發類型
        tooltip: {
          trigger: "axis", //item圖形觸發
          axisPointer: {
            type: "line",
          },
        },
        xAxis: {
          type: "category",
          data: ["業務中", "執行中", "保固中", "結案"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [
              { value: 3, itemStyle: { color: "#ad7596", opacity: 0.8 } },
              { value: 10, itemStyle: { color: "#87AD75", opacity: 0.8 } },
              { value: 5, itemStyle: { color: "#047AE7", opacity: 0.8 } },
              { value: 34, itemStyle: { color: "#e3a74d", opacity: 0.8 } },
            ],
            type: "bar",
          },
        ],
      };

      myChart.setOption(option);
      option && myChart.setOption(option);
    },

    goToStuffTabel() {
      this.$router.push("user");
    },
  },
  // beforeMount() {
  //   axios
  //     // .get("https://localhost:7500/ProjectAnalysis/GetProjectData") //local
  //     .get("https://192.168.1.243/api/ProjectAnalysis/GetProjectData") //dev
  //     .then((response) => {
  //       this.ProjectNumber = response.data[0].projectNumber;
  //       this.ProjectExecutingNumber = response.data[0].projectExecutingNumber;
  //       this.ProjectWarrantygNumber = response.data[0].projectWarrantygNumber;
  //       this.ProjectClosethecaseNumber =
  //         response.data[0].projectClosethecaseNumber;
  //       console.log(data.datasets[0].data);
  //       data.datasets[0].data = [
  //         response.data[0].projectExecutingNumber,
  //         response.data[0].projectWarrantygNumber,
  //         response.data[0].projectClosethecaseNumber,
  //       ];

  //       const canvasTag = document.getElementById("barChart");
  //       if (!canvasTag) {
  //         console.error('Canvas element with ID "barChart" not found.');
  //         return;
  //       }

  //       try {
  //         new Chart(canvasTag, config);
  //       } catch (error) {
  //         console.error("Error initializing Chart.js:", error);
  //       }
  //     })
  //     .catch((error) => console.log("11"));
  // },
};
</script>
