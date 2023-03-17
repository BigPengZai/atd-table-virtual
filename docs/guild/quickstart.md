# 快速开始


- 安装 

```
    npm i a-table-virtual
```


**注意:** 在 main.js 中导入插件

```
// 导入插件
    import VirtualTablePlugin from "a-table-virtual";
    app.use(VirtualTablePlugin);

```

- 示例

```
// 在组件中使用
    <a-table
      v-virtual-table-scroll
      :columns="columns"
      :data-source="dataList.slice(start, over)"
      bordered
      :pagination="false"
      :scroll="{ x: 0, y: scrollHeight }"
    >
    </a-table>

    <script setup>

    import {inject } from "vue";
    const { start, over } = inject("dataListOptions");
    let scrollHeight = 300;

    </script>

```
