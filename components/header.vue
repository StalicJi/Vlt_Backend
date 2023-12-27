<template>
  <div class="flex-btw px-7">
    <div class="flex">
      <div class="header-btn">
        <VaIcon name="home" size="20px" color="#fff" />
      </div>
      <div class="header-btn">
        <VaIcon name="arrow_back" size="20px" color="#fff" />
      </div>
      <div class="header-btn">
        <VaIcon name="arrow_forward" size="20px" color="#fff" />
      </div>
      <div class="header-btn">
        <VaIcon name="refresh" size="20px" color="#fff" />
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
        <VaIcon name="logout" size="16px" color="#fff" />
        <p class="text-white ml-1 text-sm">登出</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
