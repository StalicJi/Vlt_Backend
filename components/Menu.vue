<template>
  <div>
    <VaSidebar color="#126992">
      <VaAccordion>
        <template v-for="item in items">
          <VaCollapse
            v-if="item.children"
            :key="item.title + 'collapse'"
            body-color="#00000022"
          >
            <template #header="{ value: isCollapsed }">
              <VaSidebarItem
                :active="
                  item.children.some((child) => child.title === activeElement)
                "
                active-color="backgroundElement"
                hover-color="textInverted"
                class="hover:shadow-lg"
              >
                <VaSidebarItemContent>
                  <VaIcon :name="item.icon" />
                  <VaSidebarItemTitle>{{ item.title }}</VaSidebarItemTitle>
                  <VaSpacer />
                  <VaIcon
                    :name="isCollapsed ? 'va-arrow-up' : 'va-arrow-down'"
                  />
                </VaSidebarItemContent>
              </VaSidebarItem>
            </template>

            <template #body>
              <VaSidebarItem
                v-for="child in item.children"
                :key="child.title"
                :active="child.title === activeElement"
                @click="activeElement = child.title"
                active-color="backgroundElement"
                hover-color="#000000"
              >
                <VaSidebarItemContent>
                  <VaIcon :name="child.icon" />
                  <VaSidebarItemTitle>{{ child.title }}</VaSidebarItemTitle>
                </VaSidebarItemContent>
              </VaSidebarItem>
            </template>
          </VaCollapse>

          <VaSidebarItem
            v-else
            :key="item.title + 'item'"
            :active="item.title === activeElement"
            @click="activeElement = item.title"
            active-color="backgroundElement"
            hover-color="textInverted"
            class="hover:shadow-lg"
          >
            <VaSidebarItemContent @click="handleItemClick(item.router)">
              <VaIcon :name="item.icon" />
              <VaSidebarItemTitle>{{ item.title }}</VaSidebarItemTitle>
            </VaSidebarItemContent>
          </VaSidebarItem>
        </template>
      </VaAccordion>

      <VaSpacer />
    </VaSidebar>
  </div>
</template>

<script setup>
/* ------ SideBar列表------ */

import { ref } from "vue";

const activeElement = ref("專案統計");

const router = useRouter();

const handleItemClick = (route) => {
  if (route.startsWith("http")) {
    window.open(route, "_blank");
  } else {
    router.push(route);
  }
};

const items = [
  // {
  //   title: "報表登入",
  //   icon: "calendar_month",
  //   children: [
  //     { title: "工作日報登入" },
  //     { title: "公文發函登入" },
  //     { title: "文件共享" },
  //   ],
  // },
  // {
  //   title: "申請及簽核",
  //   icon: "edit_square",
  //   children: [
  //     { title: "請假 申請/簽核" },
  //     { title: "出差 申請/簽核" },
  //     { title: "差勤費用 申請/簽核" },
  //     { title: "採購 申請/簽核" },
  //   ],
  // },
  // {
  //   title: "統計與分析",
  //   icon: "data_thresholding",
  //   children: [
  //     { title: "專案成本分析" },
  //     { title: "專案差勤費用統計表" },
  //     { title: "特休情形查詢" },
  //     { title: "工作週報匯出" },
  //     { title: "請假統計查詢及匯出" },
  //   ],
  // },
  // {
  //   title: "客戶資料",
  //   icon: "groups",
  //   children: [{ title: "維護" }, { title: "檢視" }],
  // },

  { title: "專案統計", icon: "bar_chart", router: "/" },
  // {
  //   title: "個人設定",
  //   icon: "settings",
  //   children: [{ title: "基本資料修改" }, { title: "帳號密碼變更" }],
  // },
  {
    title: "員工園地",
    icon: "settings_accessibility",
    router: "https://www.vlt.com.tw:8443/admin.html#",
  },
];
</script>
