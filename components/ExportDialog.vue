<template>
  <div class="w-[35rem] border p-6 bg-white">
    <h1 class="">選擇匯出日期</h1>
    <div class="flex gap-4 border-t mt-4 py-4">
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
        v-model="enddate"
      />
    </div>
    <div class="flex gap-4 justify-end">
      <Button buttonText="取消" @click="closeDialog" />
      <Button buttonText="匯出" btnColor="bg-green-700" @click="exportExcel" />
    </div>
  </div>
</template>

<script>
import API from "~/src/api";
import Button from "~/components/element/Button.vue";

export default {
  components: {
    Button,
  },
  props: {
    project_id: {
      type: String,
    },
  },

  data() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return {
      startdate: new Date(year, 0, 1),
      enddate: new Date(year, month, day),
      projectTitle: "",
      projectId: "",
      projectSTime: "",
      projectETime: "",
      userId: "",
    };
  },

  mounted() {
    this.setDateRange();
  },

  methods: {
    async setDateRange() {
      this.getProjectId();
      await this.getProjectSTime(this.projectId);
      this.startdate = new Date(this.projectSTime);
      this.enddate = new Date(this.projectETime);
    },

    async getProjectTitle(projectId) {
      return new Promise((resolve, reject) => {
        API.post("ProjectAnalysis/ProjectSelector", {
          id: "All",
        })
          .then((response) => {
            const projectData = response.data;
            projectData.forEach((data) => {
              if (data.pj_id === projectId) {
                this.projectTitle = data.pj_name;
                resolve();
              }
            });
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },

    getStaffId() {
      const router = useRoute();
      const parts = router.fullPath.split("/");
      const userIdIndex = parts.indexOf("user") + 1;
      const userId = userIdIndex >= 0 ? parts[userIdIndex] : null;
      this.userId = userId;
    },

    getProjectId() {
      const router = useRoute();
      const fullPath = router.fullPath;
      const parts = fullPath.split("/");
      const projectId = parts[parts.length - 1];
      this.projectId = projectId;
    },

    getAllProjectDetail(projectId, projectTitle, startDate, endDate) {
      const formData = new FormData();
      formData.append("id", projectId);
      formData.append("staffid", "All");
      formData.append("startdate", startDate);
      formData.append("enddate", endDate);

      API.post(
        "ProjectAnalysis/DownloadindividualProjectInformationExcel",
        formData,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/vnd.ms-excel;charset=utf-8",
          },
        }
      )
        .then((response) => {
          const blob = new Blob([response.data], {
            type: "application/vnd.ms-excel",
          });
          const selectSTime = startDate.split("T")[0];
          const selectETime = endDate.split("T")[0];

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `(${projectId})${projectTitle}${selectSTime} ~ ${selectETime}.xlsx`;
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.error(error));
    },

    getUserProjectDetail(projectId, userId, projectTitle, startDate, endDate) {
      const formData = new FormData();
      formData.append("id", projectId);
      formData.append("staffid", userId);
      formData.append("startdate", startDate);
      formData.append("enddate", endDate);

      API.post(
        "ProjectAnalysis/DownloadindividualProjectInformationExcel",
        formData,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/vnd.ms-excel;charset=utf-8",
          },
        }
      )
        .then((response) => {
          const blob = new Blob([response.data], {
            type: "application/vnd.ms-excel",
          });
          const selectSTime = startDate.split("T")[0];
          const selectETime = endDate.split("T")[0];

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `(${projectId})${projectTitle}${selectSTime} ~ ${selectETime}.xlsx`;
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.error(error));
    },

    async getProjectSTime(projectId) {
      return new Promise((resolve, reject) => {
        API.post("ProjectAnalysis/GetPjStartTime", {
          id: projectId,
        })
          .then((response) => {
            this.projectSTime = response.data.pjStartDate;
            this.projectETime = response.data.pjEndDate;
            resolve();
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },

    closeDialog() {
      this.setDateRange();
      this.$emit("closeDialog");
    },

    adjustDate(date) {
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      nextDate.setHours(nextDate.getHours() - 16);
      return nextDate.toISOString().split(".")[0];
    },

    async getProjectDetails(projectId) {
      await this.getProjectTitle(projectId);
      await this.getProjectSTime(projectId);
    },

    async showConfirmation(
      projectId,
      userId,
      projectTitle,
      startISOString,
      endISOString
    ) {
      if (
        startISOString < this.projectSTime ||
        endISOString > this.projectETime
      ) {
        const message =
          startISOString < this.projectSTime
            ? `起始時間應晚於或等於 ${this.projectSTime.split("T")[0]}`
            : `結束時間應早於或等於 ${this.projectETime.split("T")[0]}`;
        alert(message);
        return;
      }

      if (startISOString > endISOString) {
        alert("起始時間不可大於結束時間");
        return;
      }
      const userConfirmed = window.confirm(
        `確定要匯出 (${projectTitle} (${projectId})) 的Excel表單嗎?`
      );
      if (userConfirmed) {
        if (this.$route.path === `/project/adv_charts/${projectId}`) {
          this.getAllProjectDetail(
            projectId,
            projectTitle,
            startISOString,
            endISOString
          );
        } else {
          this.getUserProjectDetail(
            projectId,
            userId,
            projectTitle,
            startISOString,
            endISOString
          );
        }
      }
    },

    // Excel匯出
    async exportExcel() {
      this.getStaffId();
      this.getProjectId();
      const startISOString = this.adjustDate(this.startdate);
      const endISOString = this.adjustDate(this.enddate);

      await this.getProjectDetails(this.projectId);
      await this.showConfirmation(
        this.projectId,
        this.userId,
        this.projectTitle,
        startISOString,
        endISOString
      );
    },
  },
};
</script>
