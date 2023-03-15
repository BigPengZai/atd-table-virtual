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


### ✨ 特性  
- 🌈 **ATableVirtual**暂时的目标是打造一个1千行&&1千列的性能王者，如果有大量数据需要渲染，界面可能会出现抖动。
- 📦 开箱即用的**a-table-virtual**组件,更加轻量级、少侵入性代码、无需改造业务代码。
- 🎨 如果有庞大业务需求，还是建议使用商业版本的 [Surely Vue Table](https://www.surely.cool/doc/guide#快速开始)，但是很遗憾，这是一个商业化组件。并不能直接使用。

### 🤝 问题反馈


<a href="https://github.com/BigPengZai/atd-table-virtual/issues" target="_blank">问题反馈</a>


### 🔗 官网地址

<a href="https://bigpengzai.github.io/ssgcmpstep1/" target="_blank">atd-table-virtual</a>


###  📦 安装

```javascript
// 安装插件
    npm i a-table-virtual
```

```javascript
// 导入插件
    import VirtualTablePlugin from "a-table-virtual";
    app.use(VirtualTablePlugin);
```
### 🔨 示例
```javascript
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


### ⚙️ 为什么要去搞这个轮子

- 在前端开发领域，表格一直都是一个高频出现的组件，尤其是在中后台和数据分析场景。 但是，对于Table来说，当一屏里超过 1000 条数据记录时，就会出现卡顿等性能问题，体验不是很好。

- 通过虚拟化表格组件，超大数据渲染将不再是一个头疼的问题。
- 针对于目前 ant-design-vue 中的 [Surely Vue Table](https://www.surely.cool/doc/guide#快速开始),很遗憾，这是一个商业化组件。并不能直接使用。

