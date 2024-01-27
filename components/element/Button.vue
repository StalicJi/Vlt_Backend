import type { VaIcon } from '#build/components';
<template>
  <button class="default-btn text-white text-sm" :class="btnColor">
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
};
</script>
