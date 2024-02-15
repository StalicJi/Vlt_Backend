<template>
  <div class="p-7">
    <div>
      <PageTitle icon-name="search" :page-title="pageTitle" />
      <ProjectSelect
        class="mt-8"
        :id="$route.params.id"
        @selectId="getSelectPjId"
      />
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
        bgColorClass="bg-gray-500"
        title="總花費時間(小時)"
        :cnt="totalHours"
      />
      <ProjectInfoCard className="col-span-2" title="客戶" :cnt="customer" />
    </div>
    <div class="grid grid-flow-col grid-cols-8 gap-4 mt-4">
      <ProjectInfoCard
        className="col-start-2 col-end-4"
        title="個人佔總專案數比 (%)"
        :cnt="personHoursCountDown"
      />
      <ProjectInfoCard
        className="col-start-4 col-end-6"
        title="個人花費時數(小時)"
        :cnt="personHoursTime"
      />
      <ProjectInfoCard
        className="col-start-6 col-end-8"
        title="主要從事工作型態"
        :cnt="personWorkType"
      />
    </div>
    <div class="w-full flex justify-center mt-10" v-if="projectId">
      <Button
        buttonText="進階圖表"
        btnColor="bg-rose-700"
        @click="goAdvCharts(projectId)"
      />
    </div>
  </div>
</template>

<script>
import API from "~/src/api";
import ProjectSelect from "~/components/ProjectSelect.vue";
import PageTitle from "~/components/element/PageTitle.vue";
import ProjectInfoCard from "~/components/element/ProjectInfoCard.vue";
import Button from "~/components/element/Button.vue";
import { checkPath } from "~/utils/routerControll";

export default {
  components: {
    ProjectSelect,
    PageTitle,
    ProjectInfoCard,
    Button,
  },

  data() {
    return {
      pageTitle: "個人專案查詢 : ",
      projectManager: "",
      projectStatus: "",
      projectType: "",
      totalHours: "",
      customer: "",
      personHoursCountDown: "-",
      personHoursTime: "-",
      personWorkType: "-",
      projectId: "",
    };
  },

  beforeMount() {
    checkPath();
  },

  mounted() {
    this.getStaffInfo();
    this.getPersonProjectStatus();
    this.getProjectInfo();
  },

  methods: {
    getStaffInfo() {
      API.post("ProjectAnalysis/PostStaffData", {
        Staffid: this.$route.params.id,
      })
        .then((response) => {
          // console.log(response);
          this.pageTitle = String(
            "個人專案查詢" + " : " + " " + response.data[0].name
          );
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getProjectInfo(project_id) {
      API.post("ProjectAnalysis/GetindividualProjectInformation", {
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

    getPersonProjectStatus(project_id) {
      API.post("ProjectAnalysis/GetPersonProjectStatus", {
        id: project_id,
        staffid: this.$route.params.id,
      })
        .then((response) => {
          const fetchData = response.data[0];
          this.personHoursCountDown = fetchData.personHoursCountDown;
          this.personHoursTime = fetchData.personHoursTime;
          this.personWorkType = fetchData.personWorkType;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getSelectPjId(pj_id) {
      this.projectId = pj_id;
      this.getProjectInfo(this.projectId);
      this.getPersonProjectStatus(this.projectId);
    },

    goAdvCharts(pj_id) {
      //should reload next page to get params
      window.location.href = `/PjChart/user/${this.$route.params.id}/selectstaffpoject/${pj_id}`;
    },
  },
};
</script>
