# 介绍

<br />
<br />
<div style="text-align:center">
<b style="font-size:30px">ATableVirtual</b>
<p>适用于a-table的虚拟滚动表格插件</p>
<div>
  <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*zx7LTI_ECSAAAAAAAAAAAABkARQnAQ" alt="自然" />
</div>
</div>

**ATableVirtual**是一个 **Vue3** 组件库开发环境框架,更加轻量级的插件,让我们能更专注于业务组件的开发。

### 问题反馈


<a href="https://github.com/BigPengZai/atd-table-virtual/issues" target="_blank">问题反馈</a>


### 官网地址

<a href="https://bigpengzai.github.io/ssgcmpstep1/" target="_blank">atd-table-virtual</a>


### 快速启动

```javascript
// 安装插件
    npm i a-table-virtual
```

```javascript
// 导入插件
    import VirtualTablePlugin from "a-table-virtual";
    app.use(VirtualTablePlugin);
```

```javascript
// 在a-table中使用
    <a-table
      v-virtual-table-scroll="{
        dataList,
        scrollHeight: 300,
      }"
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