<template>
  <!-- <div class="flex-btw px-7"> -->
  <!-- <div class="flex">
      <div class="header-btn">
        <VaIcon
          name="home"
          size="20px"
          color="#fff"
          @click="$router.push({ path: '/' })"
        />
      </div>
      <div class="header-btn">
        <VaIcon
          name="arrow_back"
          size="20px"
          color="#fff"
          @click="$router.back()"
        />
      </div>
      <div class="header-btn">
        <VaIcon
          name="arrow_forward"
          size="20px"
          color="#fff"
          @click="$router.forward()"
        />
      </div>
      <div class="header-btn">
        <VaIcon name="refresh" size="20px" color="#fff" @click="reLoad" />
      </div>
    </div> -->
  <div class="flex-center justify-end px-7">
    <div class="flex-center mr-4 text-lg gap-2">
      <VaIcon name="account_circle" size="2rem" />
      <h1 v-if="token">
        Hi, <span class="ml-2">{{ token.userName }}</span>
      </h1>
      <div v-else />
    </div>
    <!-- <div class="default-btn">
      <p class="text-white text-sm">登出</p>
    </div> -->
  </div>
  <!-- </div> -->
</template>

<script>
import { getTokenFromLocal } from "~/utils/getToken";

export default {
  data() {
    return {
      token: null,
    };
  },

  beforeMount() {
    this.getIdentify();
  },
  methods: {
    getIdentify() {
      const tokenObject = getTokenFromLocal();
      this.token = tokenObject;

      // if (tokenObject.groupId === "sysUser") {
      //   window.location.href = `/user/${tokenObject.staffId}`;
      // }
    },
  },
};
</script>
