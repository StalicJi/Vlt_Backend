<template>
  <div class="p-7">
    <div>
      <PageTitle icon-name="person" page-title="個人專案統計" />
      <div>姓名：{{ $route.query.name }}</div>
    </div>
  </div>
  <div>user id :{{ $route.params.id }}</div>
</template>

<script>
import PageTitle from "../../components/element/PageTitile.vue";
// const nuxt = useNuxtApp();
// console.log(nuxt);

export default {
  components: {
    PageTitle,
  },

  mounted() {
    const userId = this.$route.params.id;
    const name = this.$route.query.name;
    const department = this.$route.query.department;
    const position = this.$route.query.position;

    console.log(`User ID: ${userId}`);
    console.log(`Name: ${name}`);
    console.log(`Department: ${department}`);
    console.log(`Position: ${position}`);
  },
};
</script>
