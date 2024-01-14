<template>
  <div class="p-7">
    <div>
      <PageTitle icon-name="search" page-title="專案各別查詢" />
      <ProjectSelect class="mt-8" />
    </div>
    <div class="grid grid-flow-col grid-cols-6 mt-8 gap-4">
      <ProjectInfoCard
        className="col-span-1"
        bgColorClass="bg-gray-500"
        title="負責人"
        cnt="-"
      />
      <ProjectInfoCard
        className="col-span-1"
        bgColorClass="bg-gray-500"
        title="型態"
        cnt="-"
      />
      <ProjectInfoCard
        className="col-span-1"
        bgColorClass="bg-gray-500"
        title="狀態"
        cnt="-"
      />
      <ProjectInfoCard
        className="col-span-1"
        bgColorClass="bg-gray-500"
        title="總花費時間 (小時)"
        cnt="-"
      />
      <ProjectInfoCard
        className="col-span-2"
        bgColorClass="bg-gray-500"
        title="客戶"
        cnt="-"
      />
    </div>
    <div class="w-full mt-8">
      <table class="w-full">
        <thead class="w-full">
          <tr class="text-center border-b-[1px] bg-gray-500 text-white">
            <th class="py-4">員工編號</th>
            <th class="py-4">姓名</th>
            <th class="py-4">部門</th>
            <th class="py-4">職稱</th>
            <th class="py-4">花費時間 (小時)</th>
          </tr>
        </thead>
        <tbody class="w-full">
          <tr
            v-for="user in users"
            :key="user.staff_id"
            class="text-center border-b-2 hover:bg-gray-200"
          >
            <td class="py-2">{{ user.staff_id }}</td>
            <td class="py-2">{{ user.name }}</td>
            <td class="py-2">{{ user.dep_name }}</td>
            <td class="py-2">{{ user.jobname }}</td>
            <td class="py-2">{{ user.total_time }}</td>
          </tr>
        </tbody>
      </table>
      <div class="w-full flex justify-center mt-10">
        <Button
          buttonText="進階圖表"
          btnColor="bg-rose-700"
          @click="goAdvCharts(this.projectId)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import API from "../../src/api";
import PageTitle from "../../components/element/PageTitle.vue";
import Button from "../../components/element/Button.vue";
import ProjectSelect from "~/components/ProjectSelect.vue";
import ProjectInfoCard from "../../components/element/ProjectInfoCard.vue";
export default {
  components: {
    PageTitle,
    ProjectSelect,
    Button,
    ProjectInfoCard,
  },

  data() {
    return {
      projectId: "",
      users: [
        {
          staff_id: 1120401,
          name: "Ashley Mcdaniel",
          dep_name: "資訊部 ",
          jobname: "工程師",
          total_time: "45",
        },
        {
          staff_id: 1110305,
          name: "John Cena",
          dep_name: "資訊部 ",
          jobname: "工程師",
          total_time: "20.5",
        },
        {
          staff_id: 1120401,
          name: "Ashley Mcdaniel",
          dep_name: "資訊部 ",
          jobname: "工程師",
          total_time: "45",
        },
        {
          staff_id: 1110305,
          name: "John Cena",
          dep_name: "資訊部 ",
          jobname: "工程師",
          total_time: "20.5",
        },
      ],
    };
  },

  mounted() {
    this.getAllSelect();
  },

  methods: {
    getAllSelect() {
      API.post("api/ProjectAnalysis/ProjectSelector", {
        id: "All",
      })
        .then((response) => {
          this.options = response.data.projectNames;
          this.projectId = response.data.projectNames[0];
        })
        .catch((error) =>
          console.error("Error fetching all project data:", error)
        );
    },

    goAdvCharts(id) {
      this.$router.push({
        path: `/project/adv_charts/${id}`,
      });
    },
  },
};
</script>
