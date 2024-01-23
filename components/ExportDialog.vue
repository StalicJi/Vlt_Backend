<template>
  <div class="w-[35rem] border p-6 bg-white">
    <h1 class="">選擇匯出日期</h1>
    <div class="flex gap-4 border-t mt-4 py-4">
      <VaDateInput
        id="datetest"
        background="#fff"
        color="info"
        placeholder="請選擇起始日"
        v-model="startdate"
      />
      <VaDateInput
        background="#fff"
        color="info"
        placeholder="請選擇結束日"
        v-model="enddate"
      />
    </div>
    <div class="flex gap-4 justify-end">
      <Button buttonText="取消" @click="closeDialog" />
      <Button buttonText="匯出" btnColor="bg-green-700" />
    </div>
  </div>
</template>

<script>
import Button from "~/components/element/Button.vue";
export default {
  components: {
    Button,
  },
  data() {
    return {
      startdate: null,
      enddate: null,
    };
  },

  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>
