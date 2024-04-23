import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// import VirtualTableScroll, { start, over } from "./virtal-table";
// import VirtualTablePlugin from "./plugin";
import { VirtualTablePlugin } from "a-table-virtual";
const app = createApp(App);

// app.directive("virtual-table-scroll", VirtualTableScroll);
// app.provide("dataListOptions", {
//   start,
//   over,
// });
app.use(Antd);

app.use(VirtualTablePlugin, { estimateItemHeight: 40 });

app.mount("#app");
