<template>
  <div class="grid gap-4 grid-flow-row grid-rows-12 flex-1">
    <div class="flex gap-4 w-full row-span-1 h-12 justify-between">
      <div class="flex h-full w-[80%] gap-4">
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
      </div>
      <Button buttonText="查詢" @click="findChart" />
    </div>

    <div class="flex gap-4">
      <Button
        buttonText="專案時間柱狀圖"
        class="bg-[#126992] yBarBtnBg"
        @click="showYBarChartCnt"
      />
      <Button
        buttonText="工作型態圓餅圖"
        class="pieBtnBg"
        @click="showPieChartCnt"
      />
    </div>
    <div
      class="row-span-11 gap-4 border rounded-lg drop-shadow-lg bg-white px-10"
    >
      <!-- 橫向柱狀圖 -->
      <div class="pt-8 h-full" :class="{ hidden: showPieChart }">
        <p class="text-center text-xl pb-8">
          專案進行總時間 ({{ formatDate(new Date(pjSearchStartTime)) }} ~
          {{ formatDate(new Date(pjSearchEndTime)) }})
        </p>
        <div id="yBarChart" style="height: 85%; width: 100%"></div>
      </div>
      <!-- 圓餅圖 -->
      <div class="pt-8 h-full" :class="{ hidden: !showPieChart }">
        <p class="text-center text-xl pb-8">
          工作型態圓餅圖 ({{ formatDate(new Date(pjSearchStartTime)) }} ~
          {{ formatDate(new Date(pjSearchEndTime)) }})
        </p>
        <div id="pieChart" style="height: 85%; width: 100%"></div>
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

  props: {
    id: {
      type: String,
    },
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
      pjSearchStartTime: "",
      pjSearchEndTime: "",
      myChart2: null,
    };
  },

  mounted() {
    const date = new Date();
    const year = date.getFullYear();
    let start = year + "-01-01T00:00:00.000Z";
    let end = year + "-12-31T00:00:00.000Z";

    this.pjSearchStartTime = this.startdate.toISOString();
    this.pjSearchEndTime = this.endtdate.toISOString();
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
      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

      if (this.endtdate < this.startdate) {
        alert("結束時間應晚於起始時間");
      } else if (this.startdate <= twoYearsAgo) {
        alert("搜尋區間應在兩年以內");
      } else if (this.endtdate >= date) {
        alert("結束時間應早於當前時間");
      } else {
        this.pjSearchStartTime = this.startdate.toISOString();
        this.pjSearchEndTime = this.endtdate.toISOString();

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
      if (this.$route.path === "/") {
        API.post("ProjectAnalysis/GetUnfixedInstrumentPanel", {
          id: "All",
          startdate: start,
          enddate: end,
        })
          .then((response) => {
            let yLabel = [];
            let personValue = [];
            let series = [];

            for (let key in response.data.personhours) {
              if (response.data.personhours.hasOwnProperty(key)) {
                yLabel.push(key);
                personValue.push(response.data.personhours[key]);
                // console.log(personValue);
              }
            }

            for (let i = 0; i < response.data.projectList.length; i++) {
              let seriesdata = [];
              for (let j = 0; j < personValue.length; j++) {
                if (
                  Object.keys(personValue[j]).includes(
                    response.data.projectList[i]
                  )
                ) {
                  seriesdata.push(personValue[j][response.data.projectList[i]]);
                  // console.log(seriesdata);
                } else {
                  seriesdata.push(0);
                  // console.log(seriesdata);
                }
              }

              series.push({
                name: response.data.projectList[i],
                type: "bar",
                data: seriesdata,
              });
            }
            this.initYBarChart(yLabel, series);
            this.showPieChart = !this.showPieChart;

            this.$nextTick(() => {
              this.initPieChart();
              this.showPieChart = !this.showPieChart;
            });
          })
          .catch((error) => console.error(error));
      } else if (this.$route.path === `/user/${this.id}`) {
        API.post("ProjectAnalysis/GetUnfixedInstrumentPanelPerson", {
          id: this.id,
          startdate: start,
          enddate: end,
        })
          .then((response) => {
            let yLabel = [];

            let seriesdata = [];
            let series = [];

            const personhoursData = response.data.personhours;
            for (const projectName in personhoursData) {
              if (personhoursData.hasOwnProperty(projectName)) {
                const hours = personhoursData[projectName];
                seriesdata.push(hours);
              }
              yLabel.push(projectName);
            }

            series.push({
              name: yLabel,
              type: "bar",
              data: seriesdata,
            });

            this.initYBarChart(yLabel, series);
            this.showPieChart = !this.showPieChart;
            this.$nextTick(() => {
              this.initPieChart();
              this.showPieChart = !this.showPieChart;
            });
          })
          .catch((error) => console.error(error));
      } else {
        console.log("error path");
      }
    },

    creatinitPieChart(start, end) {
      if (this.$route.path === "/") {
        API.post("ProjectAnalysis/GetUnfixedInstrumentPanel", {
          id: "All",
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
            setTimeout(() => {
              this.initPieChart(worktypesdata);
            }, 800);
          })
          .catch((error) => console.log(error));
      } else if (this.$route.path === `/user/${this.id}`) {
        API.post("ProjectAnalysis/GetUnfixedInstrumentPanelPerson", {
          id: this.id,
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
            setTimeout(() => {
              this.initPieChart(worktypesdata);
            }, 800);
          })
          .catch((error) => console.error(error));
      } else {
        console.log("error path");
      }
    },

    // 橫向長條圖
    initYBarChart(yLabel, series) {
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
            fontSize: 16,
          },
        },
        yAxis: {
          type: "category",
          inverse: true,
          data: yLabel,
          axisLabel: {
            margin: 20,
            fontSize: 16,
            formatter: function (value) {
              if (value.length > 4) {
                return value.substring(0, 4) + "...";
              } else {
                return value;
              }
            },
          },
        },
        series: series,
      };

      option && myChart.setOption(option);
    },

    // 圓餅圖
    initPieChart(datalist) {
      const chartDom = document.getElementById("pieChart");
      if (!chartDom) return;

      const myChart2 = echarts.init(chartDom);

      const option = {
        tooltip: {
          show: true,
          formatter: "{c} 小時",
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
            label: {
              fontSize: 16,
            },
          },
        ],
      };
      option && myChart2.setOption(option);
    },

    //圖表按鈕切換狀態
    updateChartBackground(areaColor, workColor) {
      const yBarBtnBg = document.querySelector(".yBarBtnBg");
      const pieBtnBg = document.querySelector(".pieBtnBg");
      yBarBtnBg.style.background = areaColor;
      pieBtnBg.style.background = workColor;
    },
    showYBarChartCnt() {
      this.showPieChart = false;
      this.updateChartBackground("#126992", "#6B7280");
    },

    showPieChartCnt() {
      this.showPieChart = true;
      this.updateChartBackground("#6B7280", "#126992");
    },

    //時間顯示畫面的格式調整
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}/${month}/${day}`;
    },
  },
};
</script>
