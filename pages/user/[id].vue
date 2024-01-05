<template>
  <div class="grid grid-flow-row p-7">
    <!-- Head -->
    <div class="flex-btw">
      <PageTitle icon-name="person" page-title="個人專案統計" />
      <div class="flex-arr w-96">
        <h1 class="ml-4 border p-2">姓名：邱育聖</h1>
        <h1 class="ml-4">部門：資訊部</h1>
        <h1 class="ml-4">職稱：工程師</h1>
        <!-- <div>id :{{ $route.params.id }}</div> -->
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
              {{ ProjecBusinessNumber }}
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
import Button from "../../components/element/Button.vue";
import ProjectSelect from "../../components/ProjectSelect.vue";
import PageTitle from "../../components/element/PageTitile.vue";
import YearOfCal from "../components/YearOfCal.vue";
import * as echarts from "echarts";

export default {
  components: {
    Button,
    ProjectSelect,
    YearOfCal,
    PageTitle,
  },

  data() {
    return {
      ProjecBusinessNumber: 0,
      ProjectExecutingNumber: 0,
      ProjectWarrantygNumber: 0,
      ProjectClosethecaseNumber: 0,
    };
  },
  mounted() {
    const userId = this.$route.params.id;
    axios
      .get("https://192.168.1.243/api/ProjectAnalysis/GetProjectData") //dev
      .then((response) => {
        this.ProjectNumber = response.data[0].projectNumber;
        this.ProjecBusinessNumber = response.data[0].projecBusinessNumber;
        this.ProjectExecutingNumber = response.data[0].projectExecutingNumber;
        this.ProjectWarrantygNumber = response.data[0].projectWarrantygNumber;
        this.ProjectClosethecaseNumber =
          response.data[0].projectClosethecaseNumber;

        this.initBarChart();
      })
      .catch((error) => console.error(error));
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

        tooltip: {
          trigger: "axis",
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

    goToStuffTabel() {
      this.$router.push("user");
    },
  },
};
</script>
