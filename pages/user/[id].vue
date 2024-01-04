<template>
  <div class="p-7"><PageTitle icon-name="person" /></div>
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
};
</script>
