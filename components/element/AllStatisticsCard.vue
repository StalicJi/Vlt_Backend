<template>
  <div class="grid grid-flow-row grid-row-5">
    <div
      class="flex rounded-t-md drop-shadow-lg row-span-3"
      :class="bgColorClass"
    >
      <div class="flex-1 flex-center flex-col">
        <p class="text-white mb-1">{{ label }}</p>
        <VaIcon :name="iconName" size="3rem" color="#fff" />
      </div>
      <p
        class="flex-1 flex-center text-[4rem] text-white font-bold text-shadow"
      >
        {{ value }}
      </p>
    </div>
    <div
      class="border rounded-b-md row-span-2 flex items-center justify-end px-4"
      :class="borderColor"
    >
      <div class="flex-center hover:cursor-pointer" @click="goAllInfoPage">
        <VaIcon name="info" size="1rem" color="#6B7280" />
        <h1 class="text-gray-500 ml-2">詳細資訊</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    borderColor: {
      type: String,
    },
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

  methods: {
    goAllInfoPage() {
      console.log("click");
    },
  },
};
</script>
