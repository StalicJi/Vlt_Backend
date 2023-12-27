import type { VaIcon } from '#build/components';
<template>
  <button class="default-btn text-white text-sm" @click="handleClick">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: "Click me",
    },
  },
  methods: {
    handleClick() {
      // 在這裡處理按鈕點擊事件
      console.log("Button clicked!");
    },
  },
};
</script>
