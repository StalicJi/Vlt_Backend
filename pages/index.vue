<template>
  <div class="grid grid-flow-row p-7">
    <!-- Head -->
    <div class="flex-btw">
      <PageTitle icon-name="bar_chart" page-title="專案統計" />
      <div class="flex">
        <Button
          buttonText="專案查詢"
          @click="$router.push({ path: '/project' })"
          class="ml-2"
        />
        <Button
          buttonText="個人查詢"
          @click="$router.push({ path: '/user' })"
          class="ml-2"
        />
      </div>
    </div>

    <!-- Section -->
    <div class="mt-8 grid grid-flow-col grid-cols-5 gap-4">
      <div class="col-span-2 grid grid-flow-row grid-rows-5 gap-4">
        <!-- <ProjectSelect class="row-span-1" /> -->

        <div class="row-span-2 grid grid-cols-2 grid-flow-row gap-4">
          <AllStaCard
            bgColorClass="bg-[#ad7596]"
            borderColor="border-[#ad7596]"
            label="業務中"
            iconName="library_books"
            :value="parseInt(ProjecBusinessNumber)"
          />
          <AllStaCard
            bgColorClass="bg-[#87AD75]"
            borderColor="border-[#87AD75]"
            label="執行中"
            iconName="code"
            :value="parseInt(ProjectExecutingNumber)"
          />
          <AllStaCard
            bgColorClass="bg-[#047AE7]"
            borderColor="border-[#047AE7]"
            label="保固中"
            iconName="construction"
            :value="parseInt(ProjectWarrantygNumber)"
          />
          <AllStaCard
            bgColorClass="bg-[#e3a74d]"
            borderColor="border-[#e3a74d]"
            label="結案"
            iconName="assignment_turned_in"
            :value="parseInt(ProjectClosethecaseNumber)"
          />
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
import API from "../src/api";
import Button from "../components/element/Button.vue";
import ProjectSelect from "../components/ProjectSelect.vue";
import PageTitle from "../components/element/PageTitle.vue";
import YearOfCal from "../components/YearOfCal.vue";
import AllStaCard from "../components/element/AllStatisticsCard.vue";
import * as echarts from "echarts";

export default {
  components: {
    Button,
    ProjectSelect,
    YearOfCal,
    PageTitle,
    AllStaCard,
  },

  setup() {
    const router = useRouter();
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
    API.post("api/ProjectAnalysis/GetProjectData", {
      id: "All",
    })
      .then((response) => {
        this.ProjectNumber = response.data[0].projectNumber;
        this.ProjecBusinessNumber = response.data[0].projecBusinessNumber;
        this.ProjectExecutingNumber = response.data[0].projectExecutingNumber;
        this.ProjectWarrantygNumber = response.data[0].projectWarrantygNumber;
        this.ProjectClosethecaseNumber =
          response.data[0].projectClosethecaseNumber;

        this.initBarChart();
      })
      .catch((error) => console.error("Error fetching project data:", error));
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
  },
};
</script>
