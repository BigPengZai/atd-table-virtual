<template>
  <a-table :dataSource="showList">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </a-table>
</template>

<script>
import { useAttrs, onMounted, ref, computed } from "vue";

export default {
  setup() {
    const { data } = useAttrs();
    if (!data) {
      throw new Error(
        `${data} data  is not found, modify :dataSource="" to :data="" `
      );
    }

    const page = ref(1);
    const limit = 7;
    const totalPage = computed(() => Math.ceil(data.length / limit));
    const showList = computed(() => data.slice(0, page.value * limit));

    function increasePage(page) {
      if (page.value < totalPage.value) {
        setTimeout(() => {
          page.value++;
          // console.log(page.value, "page");
          increasePage(page);
        }, 300);
      }
    }
    onMounted(() => {
      increasePage(page);
    });
    return {
      showList,
    };
  },
};
</script>

<style lang="scss" scoped></style>
