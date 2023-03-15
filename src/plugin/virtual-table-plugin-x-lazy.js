import { watch, ref, computed, nextTick, onMounted, watchEffect } from "vue";
import throttle from "../utils/throttle";

/**************** X轴方向滑动   **********************/

const startX = ref(0);
const overX = ref(0);

let estimateItemWidth = 0;

// 先搞一个重复代码 feature
let tableWidth = ref(0);
let estimateDataList = [];

const aTableScrollWrapperClass = ".ant-table-body";

const visibleCountX = computed(() =>
  Math.ceil(tableWidth.value / estimateItemWidth)
);

export default {
  install: (app, options) => {
    // 导入指令
    app.directive("virtual-table-scroll", {
      mounted(el, binding, vnode, prevVnode) {
        const { className, columns, scrollHeight = 300 } = binding.value;
        estimateDataList = columns;
        estimateItemWidth = 133;

        const target = el.querySelector(aTableScrollWrapperClass);

        if (!target) {
          throw new Error(`${aTableScrollWrapperClass} element not found.`);
        }
        //   initial  over
        tableWidth.value = target.clientWidth;
        if (overX.value == 0) {
          overX.value = startX.value + visibleCountX.value + 2;
          console.log(overX.value, 11111);
        }
        const scrollFn = () => {
          console.log(
            target.scrollLeft,
            target.clientWidth,
            target.scrollWidth
          );

          if (
            target.scrollLeft + target.clientWidth + 20 >=
            target.scrollWidth
          ) {
            console.log("触底");
            if (overX.value >= columns.length) {
              return;
            }
            overX.value += 6;
          }
        };
        target.addEventListener("scroll", scrollFn);
      },
    });

    app.provide("dataListOptions", {
      startX,
      overX,
    });
  },
};
