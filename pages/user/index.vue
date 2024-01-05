<template>
  <div class="p-7">
    <div class="flex-btw">
      <PageTitle icon-name="groups" page-title="員工名單" />
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
  </div>
</template>

<script>
import API from "../../src/api";
import PageTitle from "../../components/element/PageTitile.vue";
import Button from "../../components/element/Button.vue";
export default {
  components: {
    PageTitle,
    Button,
  },

  data() {
    return {
      users: [
        // {
        //   staff_id: 1120401,
        //   name: "Ashley Mcdaniel",
        //   dep_name: "資訊部 ",
        //   jobname: "工程師",
        // },
        // {
        //   staff_id: 1110809,
        //   name: "邱育聖",
        //   dep_name: "資訊部",
        //   jobname: "工程師",
        // },
        // {
        //   staff_id: 1040506,
        //   name: "Sherman Knowles",
        //   dep_name: "資訊部",
        //   jobname: "工程師",
        // },
        // {
        //   staff_id: 1030423,
        //   name: "Vasquez Lawson",
        //   dep_name: "人事部",
        //   jobname: "人事經理",
        // },
        // {
        //   staff_id: 1120423,
        //   name: "Vasquez Lawson",
        //   dep_name: "人事部",
        //   jobname: "人事經理",
        // },
      ],
    };
  },

  mounted() {
    API.post("api/ProjectAnalysis/PostStaffData", {
      Staffid: "All",
    })
      .then((response) => {
        this.users = response.data.sort((a, b) => {
          return b.staff_duty - a.staff_duty;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  },

  methods: {
    goUserId(id, name, department, position) {
      this.$router.push({
        path: `/user/${id}`,
      });
    },
  },
};
</script>
