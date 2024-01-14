<!-- 各頁面的Title -->
<template>
  <div class="flex items-center">
    <VaIcon :name="iconName" size="28px" color="textPrimary" />
    <h1 class="text-2xl ml-2">{{ pageTitle }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      required: true,
    },
    pageTitle: {
      type: String,
      required: true,
    },
  },
};
</script>
