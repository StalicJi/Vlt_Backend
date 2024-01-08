<template>
  <div class="flex rounded-md drop-shadow-lg" :class="bgColorClass">
    <div class="flex-1 flex-center flex-col">
      <p class="text-white mb-1">{{ label }}</p>
      <VaIcon :name="iconName" size="3rem" color="#fff" />
    </div>
    <p class="flex-1 flex-center text-[4rem] text-white font-bold text-shadow">
      {{ value }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    bgColorClass: {
      type: String,
    },
    label: {
      type: String,
    },
    iconName: {
      type: String,
    },
    value: {
      type: Number,
    },
  },
};
</script>
