/***
 *
 * 这里主要想 玩下  ast
 *
 *
 */

export function aTableVirtualPlugin() {
  return {
    name: "vite-plugin-atv",
    enforce: "pre",
    options() {
      //   console.log("该插件是一个实验性api");
    },
    transform(code, id) {
      // 过滤.vue  文件
      if (/\.vue$/.test(id) || /\.vue\?.*type=script.*/.test(id)) {
        // console.log(typeof id);
        if (id.endsWith("ATablePer-exp.vue")) {
          console.log("🌈 🌈 🌈 🌈该插件是一个实验性api🛠️   🛠️    🛠️    🛠️");

          //   console.log(code);
          //  这个地方需要 解析出 ast 或者 。。。
          return `<template>
  <div><span style="font-size: 27px"> antd-v:table </span></div>
  <a-button type="primary">virtual-table</a-button>
  <hr />
  <!-- VirtualTableScroll -->
  <div class="mockContainer">
    <a-table
      v-virtual-table-scroll
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

  <!-- 瞎几把写 -->
  <div class="normal-table">
    <a-button danger>normal-table</a-button>
    <hr />
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";

const { start, over } = inject("dataListOptions");

// mock data
let totalRows = 500;
let totalColumns = 49;

let scrollHeight = 300;

let dataList = ref([]);

let columns = ref([
  {
    title: "Name",
    dataIndex: "name",
    width: 133,
  },
]);

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

onMounted(() => {
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
  }, 200);
});
</script>

<style scoped>
.normal-table {
  margin-top: 50px;
}
</style>`;
        }
      }
    },
  };
}
