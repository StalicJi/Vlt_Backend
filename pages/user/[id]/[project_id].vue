<template>
  <div>
    專案人員: {{ $route.params.id }} + 專案ID:{{ $route.params.project_id }}
  </div>
</template>

<script>
export default {
  setup() {
    // 檢查路由
    // const route = useRoute();
    // console.log(route);
  },
};
</script>
