<template>
  <div class="flex flex-col p-7">
    <!-- Head -->
    <div class="flex-btw">
      <div class="flex items-center">
        <VaIcon name="bar_chart" size="28px" color="textPrimary" />
        <h1 class="text-2xl">專案統計</h1>
      </div>
      <div>
        <Button buttonText="個人專案查詢" />
      </div>
    </div>

    <!-- Section -->
    <div class="mt-8 flex-1 grid grid-flow-col grid-cols-5 gap-4">
      <div class="col-span-2 grid grid-flow-row grid-rows-6 gap-4">
        <ProjectSelect class="row-span-1 h-full" />

        <div class="row-span-2 grid grid-cols-2 grid-flow-row gap-4">
          <div class="bg-[#ad7596] flex rounded-md drop-shadow-lg">
            <div class="flex-1 flex-center flex-col">
              <p class="text-white mb-1">總專案數</p>
              <VaIcon name="library_books" size="3rem" color="#fff" />
            </div>
            <p
              class="flex-1 flex-center text-[4rem] text-white font-bold text-shadow"
            >
              3
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
              11
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
              3
            </p>
          </div>
          <div class="bg-[#787276] flex rounded-md drop-shadow-lg">
            <div class="flex-1 flex-center flex-col">
              <p class="text-white mb-1">結案</p>
              <VaIcon name="assignment_turned_in" size="3rem" color="#fff" />
            </div>
            <p
              class="flex-1 flex-center text-[4rem] text-white font-bold text-shadow"
            >
              21
            </p>
          </div>
        </div>

        <!-- 長條圖 -->
        <div class="border rounded-lg row-span-3 drop-shadow-lg p-4 bg-white">
          <p class="text-center py-4">當前專案長條圖</p>
          <div>
            <canvas id="barChart"></canvas>
          </div>
        </div>
      </div>
      <div class="border border-green-600 col-span-3">right</div>
    </div>
  </div>
</template>

<script>
import Button from "../components/element/Button.vue";
import ProjectSelect from "../components/ProjectSelect.vue";
import Chart from "chart.js/auto";

const labels = ["總專案數", "執行中案數", "保固中專案數", "結案專案數"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "當前專案長條圖",
      data: [32, 11, 3, 21],
      // 色卡透明度加'8f'
      backgroundColor: ["#AD75968f", "#87AD758f", "#047AE78f", "#7872768f"],
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    // responsive: true,
    // maintainAspectRatio: true,
  },
};

export default {
  components: {
    Button,
    ProjectSelect,
  },

  setup() {
    onMounted(() => {
      const canvasTag = document.getElementById("barChart");

      if (!canvasTag) {
        console.error('Canvas element with ID "barChart" not found.');
        return;
      }

      try {
        new Chart(canvasTag, config);
      } catch (error) {
        console.error("Error initializing Chart.js:", error);
      }
    });
  },
};
</script>
