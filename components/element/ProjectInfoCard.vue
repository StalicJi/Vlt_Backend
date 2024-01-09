<template>
  <div class="h-28 w-full grid grid-flow-row grid-rows-6" :class="className">
    <p
      class="text-white py-2 row-span-2 rounded-t-md px-3 flex-center"
      :class="bgColorClass"
    >
      {{ title }}
    </p>

    <p class="text-xl row-span-4 flex-center border rounded-b-md p-1">
      {{ cnt }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
    },
    bgColorClass: {
      type: String,
    },

    title: {
      type: String,
    },
    cnt: {
      type: String,
    },
  },
};
</script>
