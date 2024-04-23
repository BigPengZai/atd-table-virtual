<template>
  <div><span style="font-size: 27px"> antd-v:table </span></div>
  <a-button type="primary">virtual-table</a-button>
  <hr />
  <!-- VirtualTableScroll -->
  <div class="mockContainer">
    <a-table
      v-virtual-table-scroll="loadSourceData"
      :columns="columns"
      :data-source="dataList.slice(start, over)"
      bordered
      :pagination="false"
      :scroll="{ x: 1080, y: scrollHeight }"
    >
      <template #address="{ text }">
        <div>
          {{ text }}
        </div>
      </template>
    </a-table>
  </div>

  <!-- <div class="normal-table">
    <a-button type="primary">normal-table</a-button>
    <a-table
      :columns="columns2"
      :data-source="dataList2"
      bordered
      :pagination="false"
      :scroll="{ x: 1080, y: scrollHeight }"
    >
      <template #address="{ text }">
        <div>
          {{ text }}
        </div>
      </template>
    </a-table>
  </div> -->
</template>

<script setup>
import { onMounted, ref, inject } from "vue";

// 动态获取展示数据
const { start, over } = inject("dataListOptions");

// 定义table的高度
let scrollHeight = 300;
// mock data 加载500行
let totalRows = 100;
// 加载 30列
let totalColumns = 49;

// init 行数据
let dataList = ref([]);
let dataList2 = ref([]);
// init 列数据
let columns = ref([
  {
    title: "Name",
    dataIndex: "name",
    width: 133,
  },
]);

let columns2 = ref([
  {
    title: "Name",
    dataIndex: "name",
    width: 133,
  },
]);

let totalRows2 = 100;
// 加载 30列
let totalColumns2 = 49;

let now = null;

// axios mock 加载数据
//  v-virtual-table-scroll="loadSourceData" 这里绑定的loadSourceData,会先于 该组件的onMounted 执行
const loadSourceData = () => {
  console.log("loadSourceData");

  setTimeout(() => {
    for (let index = 1; index <= totalRows; index++) {
      dataList.value.push({
        key: index + 1,
        name: "petyon" + index,
        money: "￥120,000.00",
        address: "Sidney No." + index,
        operation: "aaaaa" + index,
      });
    }
    console.log("virtual-mock fetch数据请求完成:", Date.now() - now);
    setTimeout(() => {
      console.log(
        `virtual-table 渲染${totalRows}行,${totalColumns + 1}列时间:`,
        Date.now() - now - 200
      );
    }, 0);
  }, 200);
};

// mock 加载列数据
const _loadColums = () => {
  for (let index = 1; index <= totalColumns; index++) {
    columns.value.push({
      title: "address" + index,
      dataIndex: "address",
      width: 133,
      slots: {
        customRender: "address",
      },
    });
  }
};

onMounted(() => {
  console.log("onMounted");
  // loadSourceData();
  now = Date.now();
  _loadColums();

  // loadSourceData2();
});

const loadSourceData2 = () => {
  console.log("loadSourceData2");

  setTimeout(() => {
    for (let index = 1; index <= totalRows2; index++) {
      dataList2.value.push({
        key: index + 1,
        name: "petyon" + index,
        money: "￥120,000.00",
        address: "Sidney No." + index,
        operation: "aaaaa" + index,
      });
    }
    console.log("normal-mock fetch数据请求完成:", Date.now() - now - 200);
    setTimeout(() => {
      console.log(
        `normal-table 渲染${totalRows2}行,${totalColumns2 + 1}列时间:`,
        Date.now() - now - 400
      );
    }, 0);
  }, 400);

  for (let index = 1; index <= totalColumns2; index++) {
    columns2.value.push({
      title: "address" + index,
      dataIndex: "address",
      width: 133,
      slots: {
        customRender: "address",
      },
    });
  }
};
</script>

<style scoped>
.mockContainer {
  width: 100%;
}
.normal-table {
  margin-top: 50px;
}
</style>
