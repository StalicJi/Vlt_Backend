<template>
  <div class="p-7">
    <div>
      <PageTitle icon-name="search" page-title="專案狀態查詢" />
    </div>

    <div class="flex justify-end gap-4 w-full mt-4">
      <div class="flex items-center gap-4">
        <label>專案狀態 : </label>
        <div class="w-28">
          <VaSelect
            v-model="valueSingle"
            :options="options"
            highlight-matched-text
            background="#fff"
            color="info"
          />
        </div>
      </div>
      <div class="flex gap-4 items-center">
        <label>專案創始日 : </label>
        <div class="w-40">
          <VaDateInput
            id="datetest"
            background="#fff"
            color="info"
            placeholder="請選擇日期"
            v-model="startdate"
          />
        </div>
        <span>~</span>
        <div class="w-40">
          <VaDateInput
            background="#fff"
            color="info"
            placeholder="請選擇日期"
            v-model="enddate"
          />
        </div>
        <Button buttonText="查詢" @click="searchStatus" />
      </div>
    </div>

    <div class="w-full mt-8">
      <table class="w-full">
        <thead class="w-full">
          <tr class="text-center border-b-[1px] bg-gray-500 text-white">
            <th class="py-4">專案編號</th>
            <th class="py-4">專案名稱</th>
            <th class="py-4">客戶</th>
            <th class="py-4">狀態</th>
            <th class="py-4">負責人</th>
            <th class="py-4"></th>
          </tr>
        </thead>

        <VaInnerLoading
          loading
          class="relative top-12 left-[135%]"
          color="#6b7280"
          v-if="loading"
        />

        <tbody class="w-full" v-show="showTable">
          <tr
            class="text-center border-b-2 hover:bg-gray-200"
            v-for="project in displayedProjects"
            :key="project.pjId"
          >
            <td class="py-2">{{ project.pjId }}</td>
            <td class="py-2">{{ project.pjName }}</td>
            <td class="py-2">{{ project.pjCustomer }}</td>
            <td class="py-2">{{ project.pjType }}</td>
            <td class="py-2">{{ project.pjManager }}</td>
            <td class="flex-center py-2">
              <Button
                buttonText="匯出"
                class="bg-green-700"
                @click="exportExcel(project.pjId, project.pjName)"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="projects.length === 0 && !loading"
        class="w-full h-20 flex-center text-lg"
      >
        沒有符合的資料...
      </div>
      <div v-if="error" class="text-red-500 w-full h-20 flex-center text-xl">
        {{ error }}
      </div>
    </div>
    <VaPagination
      v-model="currentPage"
      :pages="totalPages"
      :visible-pages="3"
      buttons-preset="secondary"
      color="#6b7280"
      active-page-color="#126992"
      class="justify-center sm:justify-start mt-4"
      v-show="!loading && projects.length > 0"
    />
  </div>
</template>

<script>
import API from "~/src/api";
import PageTitle from "~/components/element/PageTitle";
import Button from "~/components/element/Button.vue";

export default {
  components: {
    PageTitle,
    Button,
  },
  data() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return {
      startdate: new Date(year, 0, 1),
      enddate: new Date(year, month, day),
      projects: [],
      options: ["業務中", "執行中", "保固中", "結案"],
      valueSingle: "業務中",
      loading: false,
      error: null,
      showTable: true,
      currentPage: 1,
      itemsPerPage: 10,
    };
  },

  created() {
    this.startdate = null;
    this.enddate = new Date();
    this.getProjectStatus(
      this.$route.query.status,
      this.startdate,
      this.enddate
    );
    this.valueSingle = this.$route.query.status;
  },

  computed: {
    totalPages() {
      return Math.ceil(this.projects.length / this.itemsPerPage);
    },

    displayedProjects() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.projects.slice(startIndex, endIndex);
    },

    paginatedProjects() {
      const paginated = [];
      for (let i = 0; i < this.totalPages; i++) {
        const startIndex = i * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        paginated.push(this.projects.slice(startIndex, endIndex));
      }
      return paginated;
    },
  },

  methods: {
    getProjectStatus(selectedOption, startDate, endDate) {
      this.loading = true;
      const typeMapping = {
        業務中: "S",
        執行中: "E",
        保固中: "M",
        結案: "F",
      };

      const selectedType = typeMapping[selectedOption];
      API.post("api/ProjectAnalysis/GetDetailProjectData", {
        id: "All",
        type: selectedType,
        startdate: startDate,
        enddate: endDate,
      })
        .then((response) => {
          setTimeout(() => {
            this.projects = response.data.sort((a, b) => {
              const aId = a.pjId.split("-");
              const bId = b.pjId.split("-");

              const aComparable = parseInt(aId[0] + aId[1]);
              const bComparable = parseInt(bId[0] + bId[1]);

              return bComparable - aComparable;
            });

            this.loading = false;
            this.showTable = true;
          }, 1500);
        })
        .catch((error) => {
          this.loading = false;
          this.error = "Error fetching data. Please try again.....";
          console.error(error);
        });
    },
    exportExcel(projectId, projectName) {
      const userConfirmed = window.confirm(
        `** 確定要匯出Excel表單嗎? **\n\n專案名稱 : (${projectId})${projectName}`
      );
      if (userConfirmed) {
        const formData = new FormData();
        formData.append("id", projectId);
        formData.append("staffid", "All");

        API.post("/api/ProjectAnalysis/DownloadAllProjectDataExcel", formData, {
          responseType: "blob",
          headers: {
            "Content-Type": "application/vnd.ms-excel;charset=utf-8",
          },
        })
          .then((response) => {
            const blob = new Blob([response.data], {
              type: "application/vnd.ms-excel",
            });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${projectName}(${projectId}).xlsx`;
            a.click();
            window.URL.revokeObjectURL(url);
          })
          .catch((error) => console.error(error));
      }
    },

    searchStatus() {
      const date = new Date();
      if (this.enddate < this.startdate) {
        alert("結束時間應晚於起始時間");
      } else if (this.enddate >= date) {
        alert("結束時間應早於當前時間");
      } else {
        this.projects = [];
        this.showTable = false;
        this.currentPage = 1;
        this.getProjectStatus(this.valueSingle, this.startdate, this.enddate);
        this.$router.push({
          path: "/projectstatus",
          query: { status: this.valueSingle },
        });
      }
    },
  },
};
</script>
