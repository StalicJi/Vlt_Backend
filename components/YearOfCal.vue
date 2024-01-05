<template>
  <div class="grid gap-4 grid-flow-row grid-rows-12 flex-1">
    <!-- !時間選擇 -->
    <div class="flex gap-4 w-full row-span-1 h-12">
      <Button
        buttonText="專案時間"
        @click="showYBarChartCnt"
        :class="{
          'focus:bg-black': activeChart === 'bar',
          'focus:bg-gray': activeChart !== 'bar',
        }"
      />
      <Button
        buttonText="工作型態"
        @click="showPieChartCnt"
        :class="{
          'focus:bg-black': activeChart === 'pie',
          'focus:bg-gray': activeChart !== 'pie',
        }"
      />
      <VaDateInput
        id="datetest"
        background="#fff"
        color="info"
        placeholder="請選擇起始日"
        v-model="startdate"
      />
      <VaDateInput
        background="#fff"
        color="info"
        placeholder="請選擇結束日"
        v-model="endtdate"
      />
      <Button buttonText="查詢" @click="findChart" />
    </div>

    <div
      class="row-span-11 gap-4 border rounded-lg drop-shadow-lg bg-white px-10"
    >
      <!-- 橫向柱狀圖 -->
      <div class="pt-4 h-full" :class="{ hidden: showPieChart }">
        <p class="text-center text-xl pb-4">專案進行總時間</p>
        <div id="yBarChart" style="height: 100%; width: 100%"></div>
      </div>
      <!-- 圓餅圖 -->
      <div class="pt-4 h-full" :class="{ hidden: !showPieChart }">
        <p class="text-center text-xl pb-4">工作型態圓餅圖</p>
        <div id="pieChart" style="height: 90%; width: 100%"></div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../src/api";
import Button from "../components/element/Button.vue";
import * as echarts from "echarts";

export default {
  components: {
    Button,
  },

  data() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return {
      value: new Date(year, 0, 1),
      startdate: new Date(year, 0, 1),
      endtdate: new Date(year, month, day),
      showPieChart: false,
      activeChart: "bar",
    };
  },

  mounted() {
    const date = new Date();
    const year = date.getFullYear();
    let start = year + "-01-01T00:00:00.000Z";
    let end = year + "-12-31T00:00:00.000Z";

    this.creatinitYBarChart(new Date(start), new Date(end));
    this.showPieChart = !this.showPieChart;
    this.$nextTick(() => {
      this.creatinitPieChart(
        new Date(this.startdate).toISOString(),
        new Date(this.endtdate).toISOString()
      );
      this.showPieChart = !this.showPieChart;
    });
  },

  methods: {
    findChart() {
      const date = new Date();
      console.log(date);
      console.log(this.endtdate);
      if (this.endtdate < this.startdate || this.endtdate >= date) {
        alert("錯誤!!結束時間應晚於起始時間");
      } else {
        this.creatinitYBarChart(
          new Date(this.startdate).toISOString(),
          new Date(this.endtdate).toISOString()
        );
        this.creatinitPieChart(
          new Date(this.startdate).toISOString(),
          new Date(this.endtdate).toISOString()
        );
      }
    },

    // -------------------Chart-------------------
    creatinitYBarChart(start, end) {
      API.post("api/ProjectAnalysis/PostProjectData", {
        projectnamedata: "2012-16",
        startdate: start,
        enddate: end,
      })
        .then((response) => {
          let person = [];
          let personvalue = [];
          let series = [];

          for (var key in response.data.personhours) {
            if (response.data.personhours.hasOwnProperty(key)) {
              person.push(key);
              personvalue.push(response.data.personhours[key]);
            }
          }
          for (let i = 0; i < response.data.projectList.length; i++) {
            let seriesdata = [];
            for (let j = 0; j < personvalue.length; j++) {
              if (
                Object.keys(personvalue[j]).includes(
                  response.data.projectList[i]
                )
              ) {
                seriesdata.push(personvalue[j][response.data.projectList[i]]);
              } else {
                seriesdata.push(0);
              }
            }

            series.push({
              name: response.data.projectList[i],
              type: "bar",
              data: seriesdata,
            });
          }

          let worktypesdata = [];

          let worktypeskeys = Object.keys(response.data.worktypes);

          for (let i = 0; i < worktypeskeys.length; i++) {
            worktypesdata.push({
              value: response.data.worktypes[worktypeskeys[i]],
              name: worktypeskeys[i],
            });
          }
          this.initYBarChart(person, series);
          this.showPieChart = !this.showPieChart;
          this.$nextTick(() => {
            this.initPieChart(worktypesdata);
            this.showPieChart = !this.showPieChart;
          });
        })
        .catch((error) => console.error(error));
    },

    creatinitPieChart(start, end) {
      API.post("api/ProjectAnalysis/PostProjectData", {
        projectnamedata: "2012-16",
        startdate: start,
        enddate: end,
      })
        .then((response) => {
          let worktypesdata = [];

          let worktypeskeys = Object.keys(response.data.worktypes);

          for (let i = 0; i < worktypeskeys.length; i++) {
            worktypesdata.push({
              value: response.data.worktypes[worktypeskeys[i]],
              name: worktypeskeys[i],
            });
          }

          this.initPieChart(worktypesdata);
        })
        .catch((error) => console.log(error));
    },

    // 橫向長條圖
    initYBarChart(person, series) {
      $(".finddate").click((e) => {
        const date = new Date();

        if (this.endtdate < this.startdate || this.endtdate >= date) {
          console.log("myChart");
        } else {
          // console.log(this.endtdate);
          myChart.clear();
        }
      });

      const chartDom = document.getElementById("yBarChart");
      if (!chartDom) return;

      const myChart = echarts.init(chartDom);

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          type: "scroll",
          top: "top",
          textStyle: {
            fontSize: 16,
          },
          data: series,
        },
        grid: {
          left: 100,
        },
        toolbox: {
          show: true,
        },
        xAxis: {
          type: "value",
          name: "小時",
          axisLabel: {
            formatter: "{value}",
          },
        },
        yAxis: {
          type: "category",
          inverse: true,
          data: person,
          axisLabel: {
            margin: 20,
          },
        },
        series: series,
      };

      option && myChart.setOption(option);
    },

    // 圓餅圖
    initPieChart(datalist) {
      $(".finddate").click((e) => {
        const date = new Date();
        console.log(date);
        if (this.endtdate < this.startdate || this.endtdate >= date) {
          console.log("myChart");
        } else {
          myChart2.clear();
        }
      });
      const chartDom = document.getElementById("pieChart");
      if (!chartDom) return;

      const myChart2 = echarts.init(chartDom);
      const option = {
        tooltip: {
          show: true,
        },
        legend: {
          type: "scroll",
          top: "top",
          textStyle: {
            fontSize: 16,
          },
        },
        series: [
          {
            type: "pie",
            data: datalist,
          },
        ],
      };
      option && myChart2.setOption(option);
    },

    showYBarChartCnt() {
      this.activeChart = "bar";
      this.showPieChart = false;
    },

    showPieChartCnt() {
      this.activeChart = "pie";
      this.showPieChart = true;
    },
  },
};
</script>
