import { watch, ref, computed, nextTick, onMounted, watchEffect } from "vue";
import throttle from "../utils/throttle";
/**************** X  && Y轴方向滑动   *********************
 *
 * 有问题输出中
 *
 */
const start = ref(0);
const over = ref(0);

const startX = ref(0);
const overX = ref(0);

let estimateItemHeight = 0;

let estimateItemWidth = 0;

let tableHeight = ref(0);
let tableScrollTop = ref(0);

// 先搞一个重复代码 feature
let tableWidth = ref(0);
let tableScrollLeft = ref(0);

let estimateDataList = [];
// 偏移量 startOffset，滚动后将渲染区域 偏移到可视区域中
let startOffset = ref(0);

//
let startOffsetX = ref(0);

let bufferPage = 1;

const aTableScrollWrapperClass = ".ant-table-body";
const aTableTBodyClass = ".ant-table-tbody";

const visibleCount = computed(() =>
  Math.ceil(tableHeight.value / estimateItemHeight)
);

const visibleCountX = computed(() =>
  Math.ceil(tableWidth.value / estimateItemWidth)
);

//尾部缓存数
const belowCount = computed(() => bufferPage * visibleCount.value);

export default {
  install: (app, options) => {
    // 导入指令
    app.directive("virtual-table-scroll", {
      mounted(el, binding, vnode, prevVnode) {
        const {
          className,
          dataList,
          itemHeight = 65,
          scrollHeight = 300,
        } = binding.value;
        estimateDataList = dataList;
        estimateItemHeight = itemHeight;
        estimateItemWidth = 133;
        tableHeight.value = scrollHeight;
        //   initial  over
        if (over.value == 0) {
          // console.log(
          //   start.value,
          //   visibleCount.value,
          //   belowCount.value,
          //   "visibleCount"
          // );
          over.value = start.value + visibleCount.value + belowCount.value;
        }

        const target = el.querySelector(aTableScrollWrapperClass);
        const tableBody = el.querySelector(aTableTBodyClass);

        if (!target) {
          throw new Error(`${aTableScrollWrapperClass} element not found.`);
        }
        tableWidth.value = target.clientWidth;
        console.log(tableWidth.value);
        if (overX.value == 0) {
          console.log(
            startX.value,
            visibleCountX.value,
            belowCount.value,
            "visibleCount"
          );
          overX.value = startX.value + visibleCountX.value + belowCount.value;
          console.log(overX.value, 11111);
        }
        const scrollFn = () => {
          nextTick(() => {
            let scrollTop = target?.scrollTop || 0;
            startOffset.value = scrollTop - (scrollTop % estimateItemHeight);

            let scrollLeft = target?.scrollLeft || 0;
            startOffsetX.value = scrollLeft - (scrollLeft % estimateItemWidth);

            // console.log("设置x轴的偏移量:", startOffsetX.value);
            tableBody.style.willChange = "transform";
            tableBody.style.transform = getTransform.value;
          });
          tableHeight.value = target.clientHeight;
          tableScrollTop.value = target.scrollTop;

          tableWidth.value = target.clientWidth;
          tableScrollLeft.value = target.scrollLeft;
        };
        target.addEventListener("scroll", throttle(scrollFn));
      },

      updated(el, binding, vnode, prevVnode) {
        // const target = el.querySelector(".ant-table-row");
        // itemHeight.value = target?.clientHeight;
        // estimateItemHeight.value = itemHeight.value;
        // console.log(target?.clientHeight, estimateItemHeight.value);
      },
    });

    // 偏移量对应的style,translate3d 触发硬件加速
    const getTransform = computed(
      () => `translate3d(${startOffsetX}px,${startOffset.value}px,0)`
    );

    watch(tableScrollTop, () => {
      const startNum = tableScrollTop.value / estimateItemHeight;
      const floorStartNum = Math.floor(startNum);
      // console.log(floorStartNum);
      start.value =
        startNum >= visibleCount.value
          ? Math.max(floorStartNum, 0)
          : floorStartNum;
      // start.value = Math.max(
      //   Math.ceil(tableScrollTop.value / estimateItemHeight),
      //   0
      // );
      over.value = Math.min(
        Math.ceil(
          (tableScrollTop.value + tableHeight.value) / estimateItemHeight + 5
        ),
        estimateDataList.length
      );

      // console.log("start:", start.value, "over", over.value);
    });

    watch(tableScrollLeft, () => {
      const startNum = tableScrollLeft.value / estimateItemWidth;
      const floorStartNum = Math.floor(startNum);
      // console.log(floorStartNum);
      // startX.value = startNum >= 4 ? Math.max(floorStartNum, 0) : floorStartNum;
      start.value = Math.max(
        Math.ceil(tableScrollTop.value / estimateItemHeight),
        0
      );
      overX.value = Math.min(
        Math.ceil(
          (tableScrollLeft.value + tableWidth.value) / estimateItemWidth
        ),
        estimateDataList.length
      );

      console.log(
        tableScrollLeft.value,
        tableWidth.value,
        "start:",
        startX.value,
        "over",
        overX.value
      );
    });

    app.provide("dataListOptions", {
      start,
      over,
      startX,
      overX,
    });
  },
};
