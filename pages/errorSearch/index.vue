<template>
  <div class="flex-center flex-col bg-gray-200">
    <VaIcon name="error" size="10rem" color="#f01d06" />
    <p class="text-6xl my-14">SearchError</p>
    <p class="text-2xl mb-14">請勿串改網址查詢</p>
    <Button buttonText="返回" class="h-14" @click="goSearchPage"></Button>
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
    goSearchPage() {
      window.location.href = `/PjChart/user/${this.token.staffId}/selectstaffpoject`;
    },
  },
};
</script>
