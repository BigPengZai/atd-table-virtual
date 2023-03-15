import { watch, ref, computed, nextTick, onMounted, watchEffect } from "vue";
import throttle from "../utils/throttle";

/**************** X轴方向滑动   **********************/

const startX = ref(0);
const overX = ref(0);

let estimateItemWidth = 0;

// 先搞一个重复代码 feature
let tableWidth = ref(0);
let tableScrollLeft = ref(0);

let estimateDataList = [];
// 偏移量 startOffset，滚动后将渲染区域 偏移到可视区域中
let startOffsetX = ref(0);

let bufferPage = 1;

const aTableScrollWrapperClass = ".ant-table-body";
const aTableTBodyClass = ".ant-table-tbody";

const visibleCountX = computed(() =>
  Math.ceil(tableWidth.value / estimateItemWidth)
);

//尾部缓存数
const belowCount = computed(() => bufferPage * visibleCountX.value);

export default {
  install: (app, options) => {
    // 导入指令
    app.directive("virtual-table-scroll", {
      mounted(el, binding, vnode, prevVnode) {
        const {
          className,
          columns,
          itemHeight = 65,
          scrollHeight = 300,
        } = binding.value;
        estimateDataList = columns;
        estimateItemWidth = 133;

        const target = el.querySelector(aTableScrollWrapperClass);
        const tableBody = el.querySelector(aTableTBodyClass);

        if (!target) {
          throw new Error(`${aTableScrollWrapperClass} element not found.`);
        }
        //   initial  over
        tableWidth.value = target.clientWidth;
        console.log(tableWidth.value);
        if (overX.value == 0) {
          console.log(
            startX.value,
            visibleCountX.value,
            belowCount.value,
            "visibleCount"
          );
          overX.value = startX.value + visibleCountX.value;
          console.log(overX.value, 11111);
        }
        const scrollFn = () => {
          nextTick(() => {
            let scrollLeft = target?.scrollLeft || 0;
            startOffsetX.value = scrollLeft;

            // console.log("设置x轴的偏移量:", scrollLeft, startOffsetX.value);
            tableBody.style.willChange = "transform";
            // tableBody.style.transform = getTransform.value;
          });
          tableWidth.value = target.clientWidth;
          tableScrollLeft.value = target.scrollLeft;
        };
        target.addEventListener("scroll", scrollFn);
      },
    });

    // 偏移量对应的style,translate3d 触发硬件加速
    const getTransform = computed(
      () => `translate3d(${startOffsetX.value}px,0,0)`
    );

    watch(tableScrollLeft, () => {
      const startNum = tableScrollLeft.value / estimateItemWidth;
      const floorStartNum = Math.floor(startNum);
      console.log(floorStartNum);
      startX.value = startNum >= 8 ? Math.max(floorStartNum, 0) : floorStartNum;
      // startX.value = Math.min(
      //   Math.ceil(tableScrollLeft.value / estimateItemWidth),
      //   31
      // );
      overX.value = Math.min(
        Math.ceil(
          (tableScrollLeft.value + tableWidth.value) / estimateItemWidth
        ) + 3,
        estimateDataList.length
      );
      console.log(
        tableScrollLeft.value,
        tableWidth.value,
        "start:",
        startX.value,
        "over",
        overX.value,
        estimateDataList.length
      );
    });

    app.provide("dataListOptions", {
      startX,
      overX,
    });
  },
};
