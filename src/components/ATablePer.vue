<template>
  <a-button type="primary">antd-vue-table</a-button>
  <!-- VirtualTableScroll -->
  <a-table
    v-virtual-table-scroll="{ dataList, itemHeight: 40 }"
    :columns="columns"
    :data-source="dataList.slice(start, over)"
    bordered
    :pagination="false"
    :scroll="{ x: 0, y: 300 }"
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <a>{{ text }}</a>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
const { start, over } = inject("dataListOptions");
console.log(start.value, over.value);
let dataList = ref([]);
const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Cash Assets",
    className: "column-money",
    dataIndex: "money",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Address",
    dataIndex: "address",
  },

  {
    title: "Address",
    dataIndex: "address",
  },
];

let totalRows = 200;
onMounted(() => {
  const now = Date.now();
  setTimeout(() => {
    for (let index = 1; index <= totalRows; index++) {
      dataList.value.push({
        key: index + 1,
        name: "petyon" + index,
        money: "￥120,000.00",
        address: "Sidney No. 1 Lake Park",
      });
    }
    console.log("mock fetch数据请求完成:", Date.now() - now);
    setTimeout(() => {
      console.log(`table渲染${totalRows}行时间：`, Date.now() - now - 1000);
    }, 0);
  }, 1000);
});
</script>

<style scoped>
.list {
  height: 300px;
}
</style>
