import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import VirtualTableScroll, { start, over } from "./virtal-table";

const app = createApp(App);

app.directive("virtual-table-scroll", VirtualTableScroll);
app.use(Antd);
app.provide("dataListOptions", {
  start,
  over,
});
app.mount("#app");
