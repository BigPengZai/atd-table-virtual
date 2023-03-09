import { watch, ref, computed, nextTick } from "vue";
import throttle from "../utils/throttle";

const start = ref(0);
const over = ref(0);

let estimateItemHeight = 0;
let tableHeight = ref(0);
let tableScrollTop = ref(0);
let estimateDataList = [];
// 偏移量 startOffset，滚动后将渲染区域 偏移到可视区域中
let startOffset = ref(0);

const aTableScrollWrapperClass = ".ant-table-body";
const aTableTBodyClass = ".ant-table-tbody";

export default {
  install: (app, options) => {
    if (options) {
      estimateItemHeight = options.estimateItemHeight;
    }
    // 导入指令
    app.directive("virtual-table-scroll", (el, binding, vnode, prevVnode) => {
      const {
        className,
        dataList,
        itemHeight = 40,
        scrollHeight = 300,
      } = binding.value;
      estimateDataList = dataList;
      estimateItemHeight = itemHeight;
      tableHeight.value = scrollHeight;
      //   initial  over
      if (over.value == 0) {
        over.value = start.value + tableHeight.value / estimateItemHeight;
      }
      const target = el.querySelector(aTableScrollWrapperClass);
      const tableBody = el.querySelector(aTableTBodyClass);
      if (!target) {
        throw new Error(`${aTableScrollWrapperClass} element not found.`);
      }

      //   console.log(target);
      const scrollFn = () => {
        nextTick(() => {
          let scrollTop = target?.scrollTop || 0;
          startOffset.value = scrollTop - (scrollTop % estimateItemHeight);
          // console.log("设置y轴的偏移量", scrollTop);
          tableBody.style.transform = getTransform.value;
        });
        tableHeight.value = target.clientHeight;
        tableScrollTop.value = target.scrollTop;
      };
      throttle(scrollFn, 150);
      target.addEventListener("scroll", scrollFn);
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
