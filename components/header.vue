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
      <div class="w-40 flex-center mr-2">
        <div>
          <img
            src="../public/images/man.png"
            class="object-cover w-8 h-8 rounded-full mr-2"
          />
        </div>
        <h1>Hi, 傑森史坦森</h1>
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
  methods: {
    reLoad() {
      window.location.reload();
    },
  },
};
</script>
