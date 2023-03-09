import { watch, ref, computed, nextTick } from "vue";

const start = ref(0);
const over = ref(0);

let estimateItemHeight = 40;
let tableHeight = ref(300);
let tableScrollTop = ref(0);
let estimateDataList = [];
// 偏移量 startOffset，滚动后将渲染区域 偏移到可视区域中
let startOffset = ref(0);

const elTableScrollWrapperClass = ".ant-table-body";

export default {
  install: (app, options) => {
    // wirte first  plugin
    // console.log("fiirst  插件");
    // 导入组件
    //  app.component('my-banner', MyBanner);

    // 导入指令
    app.directive("virtual-table-scroll", (el, binding, vnode, prevVnode) => {
      const { dataList, itemHeight = 40 } = binding.value;
      estimateDataList = dataList;
      estimateItemHeight = itemHeight;
      //   initial  over
      if (over.value == 0) {
        over.value = start.value + tableHeight.value / estimateItemHeight;
        // console.log(over.value);
      }
      const target = el.querySelector(elTableScrollWrapperClass);
      // console.log(target);
      const tableBody = el.querySelector(".ant-table-tbody");

      target.addEventListener("scroll", () => {
        nextTick(() => {
          let scrollTop = target?.scrollTop || 0;
          startOffset.value = scrollTop - (scrollTop % estimateItemHeight);
          // console.log("设置y轴的偏移量", scrollTop);
          tableBody.style.transform = getTransform.value;
        });
        // mock throttle
        setTimeout(() => {
          tableHeight.value = target.clientHeight;
          tableScrollTop.value = target.scrollTop;
        }, 200);
      });
    });

    // 偏移量对应的style
    const getTransform = computed(
      () => `translate3d(0,${startOffset.value}px,0)`
    );
    watch([tableHeight, tableScrollTop], () => {
      start.value = Math.max(
        Math.ceil(tableScrollTop.value / estimateItemHeight - 5),
        0
      );
      over.value = Math.min(
        Math.ceil(
          (tableScrollTop.value + tableHeight.value) / estimateItemHeight + 5
        ),
        estimateDataList.length
      );
      // console.log("start:", start.value, "over", over.value);
    });

    app.provide("dataListOptions", {
      start,
      over,
    });
  },
};
