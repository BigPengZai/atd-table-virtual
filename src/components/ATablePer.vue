<template>
  <div><span style="font-size: 27px"> antd-v:table </span></div>
  <a-button type="primary">virtual-table</a-button>
  <hr />
  <!-- VirtualTableScroll -->
  <div class="mockContainer">
    <a-table
      v-virtual-table-scroll="{
        className: 'mockContainer',
        dataList,
        itemHeight: 40,
        scrollHeight,
      }"
      :columns="columns"
      :data-source="dataList.slice(start, over)"
      bordered
      :pagination="false"
      :scroll="{ x: 0, y: scrollHeight }"
    >
    </a-table>
  </div>

  <!-- 瞎几把写 -->
  <div class="normal-table">
    <a-button danger>normal-table</a-button>
    <hr />
  </div>
  <a-table
    :columns="columns"
    :data-source="dataList2"
    bordered
    :pagination="false"
    :scroll="{ x: 0, y: 300 }"
  >
  </a-table>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";

const { start, over } = inject("dataListOptions");
console.log(start.value, over.value);

// mock data
let totalRows = 2000;

let scrollHeight = 300;

let dataList = ref([]);
let dataList2 = ref([]);
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
    console.log("virtual-mock fetch数据请求完成:", Date.now() - now);
    setTimeout(() => {
      console.log(
        `virtual-table 渲染${totalRows}行时间:`,
        Date.now() - now - 200
      );
    }, 0);
  }, 200);

  /** normal ============================== */

  setTimeout(() => {
    for (let index = 1; index <= totalRows; index++) {
      dataList2.value.push({
        key: index + 1,
        name: "petyon" + index,
        money: "￥120,000.00",
        address: "Sidney No. 1 Lake Park",
      });
    }
    console.log("normal-mock fetch数据请求完成:", Date.now() - now - 200);
    setTimeout(() => {
      console.log(
        `normal-table 渲染${totalRows}行时间:`,
        Date.now() - now - 400
      );
    }, 0);
  }, 400);
});
</script>

<style scoped>
.normal-table {
  margin-top: 50px;
}
</style>
