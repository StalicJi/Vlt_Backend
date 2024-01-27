<template>
  <div class="p-7">
    <div>
      <PageTitle icon-name="search" page-title="專案各別查詢" />
      <ProjectSelect class="mt-8" @selectId="getSelectPjId" />
    </div>
    <div class="grid grid-flow-col grid-cols-6 mt-8 gap-4">
      <ProjectInfoCard
        className="col-span-1"
        title="負責人"
        :cnt="projectManager"
      />
      <ProjectInfoCard className="col-span-1" title="型態" :cnt="projectType" />
      <ProjectInfoCard
        className="col-span-1"
        title="狀態"
        :cnt="projectStatus"
      />
      <ProjectInfoCard
        className="col-span-1"
        title="總花費時間 (小時)"
        :cnt="totalHours"
      />
      <ProjectInfoCard className="col-span-2" title="客戶" :cnt="customer" />
    </div>
    <div class="w-full mt-8" v-if="users.length > 0">
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
            :key="user.staffid"
            class="text-center border-b-2 hover:bg-gray-200"
          >
            <td class="py-2">{{ user.staffid }}</td>
            <td class="py-2">{{ user.staffidname }}</td>
            <td class="py-2">{{ user.dep }}</td>
            <td class="py-2">{{ user.job }}</td>
            <td class="py-2">{{ user.hour }}</td>
          </tr>
        </tbody>
      </table>
      <div class="w-full flex justify-center mt-10">
        <Button
          buttonText="進階圖表"
          btnColor="bg-rose-700"
          @click="goAdvCharts(projectId)"
        />
      </div>
    </div>
    <div v-else></div>
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
      users: [],
      projectManager: "",
      projectStatus: "",
      projectType: "",
      totalHours: "",
      customer: "",
    };
  },

  mounted() {
    this.getProjectInfo();
    this.getProjectTeam();
  },

  methods: {
    getProjectInfo(project_id) {
      API.post("api/ProjectAnalysis/GetindividualProjectInformation", {
        id: project_id,
      })
        .then((response) => {
          if (response.status === 204) {
            this.projectManager = "無資料";
            this.projectStatus = "無資料";
            this.projectType = "無資料";
            this.totalHours = "無資料";
            this.customer = "無資料";
          } else {
            this.projectManager = response.data.pm;
            this.projectStatus = response.data.projectStatus;
            this.projectType = response.data.projectType;
            this.totalHours = response.data.totalHours;
            this.customer = response.data.customer;
          }
        })
        .catch((error) => {
          this.projectManager = "-";
          this.projectStatus = "-";
          this.projectType = "-";
          this.totalHours = "-";
          this.customer = "-";
          console.error(error);
        });
    },

    getProjectTeam(project_id) {
      API.post(
        "api/ProjectAnalysis/GetindividualProjectInformationPersonList",
        {
          id: project_id,
        }
      )
        .then((response) => {
          if (response.status === 204) {
            this.users = [];
          } else {
            this.users = response.data;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getSelectPjId(pj_id) {
      this.projectId = pj_id;
      this.getProjectInfo(this.projectId);
      this.getProjectTeam(this.projectId);
    },

    goAdvCharts(pj_id) {
      //shoud reload next page to get params
      window.location.href = `/project/adv_charts/${pj_id}`;
    },
  },
};
</script>
