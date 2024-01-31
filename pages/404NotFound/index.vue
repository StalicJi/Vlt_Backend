<template>
  <div class="flex-center flex-col bg-gray-200">
    <VaIcon name="block" size="10rem" color="#666E75" />
    <p class="text-6xl my-14">404 NotFound</p>
    <Button buttonText="返回首頁" class="h-14" @click="goHomPage"></Button>
  </div>
</template>

<script>
import Button from "~/components/element/Button.vue";
import { getTokenFromLocal } from "~/utils/getToken";

export default {
  components: {
    Button,
  },

  data() {
    return {
      token: null,
    };
  },

  mounted() {
    this.getToken();
  },

  methods: {
    getToken() {
      const tokenObject = getTokenFromLocal();
      this.token = tokenObject;
    },
    goHomPage() {
      window.location.href = `/user/${this.token.staffId}`;
    },
  },
};
</script>
