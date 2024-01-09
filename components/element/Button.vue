import type { VaIcon } from '#build/components';
<template>
  <button
    class="default-btn text-white text-sm"
    :class="btnColor"
    @click="handleClick"
  >
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
    btnColor: {
      type: String,
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
