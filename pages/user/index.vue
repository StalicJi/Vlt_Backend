<template>
  <div class="p-7">
    <div class="flex-btw">
      <PageTitle icon-name="groups" page-title="員工名單" />
      <VaSwitch
        v-model="value"
        true-inner-label="在職"
        false-inner-label="離職"
        color="success"
        size="small"
        class="p-2"
        v-if="!loading"
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
            <th class="py-4">在職狀態</th>
            <th class="py-4"></th>
          </tr>
        </thead>
        <VaInnerLoading
          loading
          class="relative top-12 left-[135%]"
          color="#6b7280"
          v-if="loading"
        />
        <tbody class="w-full">
          <tr
            v-for="user in displayedProjects"
            :key="user.staff_id"
            class="text-center border-b-2 hover:bg-gray-200"
          >
            <td class="py-2">{{ user.staff_id }}</td>
            <td class="py-2">{{ user.name }}</td>
            <td class="py-2">{{ user.dep_name }}</td>
            <td class="py-2">{{ user.jobname }}</td>
            <td class="py-2">
              {{ user.staff_duty === "1" ? "On" : "Off" }}
            </td>
            <td class="flex-center py-2">
              <Button
                buttonText="查詢"
                class="hover:bg-[#126992]"
                @click="goUserId(user.staff_id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <VaPagination
      v-model="currentPage"
      :pages="totalPages"
      :visible-pages="3"
      buttons-preset="secondary"
      color="#6b7280"
      active-page-color="#126992"
      class="justify-center sm:justify-start mt-4"
      v-show="!loading"
    />
  </div>
</template>

<script>
import API from "../../src/api";
import PageTitle from "../../components/element/PageTitle.vue";
import Button from "../../components/element/Button.vue";
import { getTokenFromLocal } from "~/utils/getToken";

export default {
  components: {
    PageTitle,
    Button,
  },

  data() {
    return {
      users: [],
      loading: true,
      currentPage: 1,
      itemsPerPage: 10,
      value: true,
    };
  },

  mounted() {
    this.getAllProjectData();
  },

  computed: {
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    },

    filteredUsers() {
      return this.users.filter((user) => {
        return this.value ? user.staff_duty === "1" : user.staff_duty === "0";
      });
    },

    displayedProjects() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredUsers.slice(startIndex, endIndex);
    },
  },

  methods: {
    getAllProjectData() {
      API.post("ProjectAnalysis/PostStaffData", {
        Staffid: "All",
      })
        .then((response) => {
          const tokenObject = getTokenFromLocal();

          //排序邏輯
          const sortUsersByStaffDuty = (users) => {
            return users.sort((a, b) => b.staff_duty - a.staff_duty);
          };

          // 總/副總權限
          if (
            tokenObject.groupId === "GeneralManager" ||
            tokenObject.groupId === "ViceGeneralManager"
          ) {
            setTimeout(() => {
              this.users = sortUsersByStaffDuty(response.data);
              this.loading = false;
            }, 1000);

            // 部門經理權限
          } else if (tokenObject.groupId === "DepManager") {
            setTimeout(() => {
              this.users = sortUsersByStaffDuty(
                response.data.filter(
                  (user) => user.dep_id === tokenObject.depId
                )
              );
              this.loading = false;
            }, 1000);

            // 經理級以下權限
          } else if (
            ["sysUser", "Cashier", "Supervisor", "AssistanManager"].includes(
              tokenObject.groupId
            )
          ) {
            window.location.href = "/404NotFound";
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    },

    goUserId(id) {
      this.$router.push({
        path: `/user/${id}`,
      });
    },
  },
};
</script>
