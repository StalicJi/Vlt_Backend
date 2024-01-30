<template>
  <div class="flex-btw px-7">
    <div class="flex">
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
    </div>
    <div class="flex-center">
      <div class="flex-center mr-4 text-lg">
        <h1>
          Hi, <span class="ml-3">{{ userName }}</span>
        </h1>
      </div>
      <div class="default-btn">
        <p class="text-white text-sm">登出</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const router = useRouter();
  },
  props: {
    userName: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    reLoad() {
      window.location.reload();
    },
  },
};
</script>
