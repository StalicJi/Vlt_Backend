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
            <th class="py-4"></th>
          </tr>
        </thead>
        <tbody class="w-full">
          <tr
            v-for="user in users"
            :key="user.id"
            class="text-center border-b-2 hover:bg-gray-200"
          >
            <td class="py-2">{{ user.id }}</td>
            <td class="py-2">{{ user.fullName }}</td>
            <td class="py-2">{{ user.department }}</td>
            <td class="py-2">{{ user.position }}</td>
            <td class="flex-center py-2">
              <Button
                buttonText="查詢"
                class="hover:bg-[#126992]"
                @click="
                  goUserId(
                    user.id,
                    user.fullName,
                    user.department,
                    user.position
                  )
                "
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
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
        {
          id: 1120401,
          fullName: "Ashley Mcdaniel",
          department: "資訊部 ",
          position: "工程師",
        },
        {
          id: 1110809,
          fullName: "邱育聖",
          department: "資訊部",
          position: "工程師",
        },
        {
          id: 1040506,
          fullName: "Sherman Knowles",
          department: "資訊部",
          position: "工程師",
        },
        {
          id: 1030423,
          fullName: "Vasquez Lawson",
          department: "人事部",
          position: "人事經理",
        },
        {
          id: 1120423,
          fullName: "Vasquez Lawson",
          department: "人事部",
          position: "人事經理",
        },
      ],
    };
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
