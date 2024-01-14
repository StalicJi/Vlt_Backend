<template>
  <div class="p-7">
    <PageTitle icon-name="search" page-title="個人專案查詢" />
    <ProjectSelect class="mt-8" :id="$route.params.id" />
  </div>
</template>

<script>
import ProjectSelect from "~/components/ProjectSelect.vue";
import PageTitle from "~/components/element/PageTitle.vue";

export default {
  components: {
    ProjectSelect,
    PageTitle,
  },
  setup() {
    const router = useRoute();
    console.log(router.params.id);
  },
};
</script>
