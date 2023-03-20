import { watch, ref, computed, nextTick, onMounted, watchEffect } from "vue";
import throttle from "../utils/throttle";

/**************** Y轴方向滑动   **********************/
const start = ref(0);
const over = ref(0);

let estimateItemHeight = ref(65);
// let visibleCount = ref(5);
let tableHeight = ref(300);
let tableScrollTop = ref(0);
let estimateDataListLength = ref(200);
// 偏移量 startOffset，滚动后将渲染区域 偏移到可视区域中
let startOffset = ref(0);
let bufferPage = 1;

const aTableScrollWrapperClass = ".ant-table-body";
const aTableTBodyClass = ".ant-table-tbody";

const visibleCount = computed(() =>
  Math.ceil(tableHeight.value / estimateItemHeight.value)
);

//尾部缓存数
const belowCount = computed(() => bufferPage * visibleCount.value);

export default {
  install: (app, options) => {
    app.directive("virtual-table-scroll", {
      mounted(el, binding, vnode, prevVnode) {
        // 可选参数 待处理
        // const { scrollHeight = 300, load } = binding.value || {};
        const loadSourceData = binding.value;
        if (loadSourceData) {
          loadSourceData();
        }

        const target = el.querySelector(aTableScrollWrapperClass);
        const tableBody = el.querySelector(aTableTBodyClass);
        // console.log(target.clientHeight);
        // tableHeight.value = scrollHeight;

        //   initial  over
        if (over.value == 0) {
          over.value = start.value + visibleCount.value + belowCount.value;
          // console.log(over.value);
        }

        if (!target) {
          throw new Error(`${aTableScrollWrapperClass} element not found.`);
        }

        const scrollFn = () => {
          nextTick(() => {
            let scrollTop = target?.scrollTop || 0;
            startOffset.value =
              scrollTop - (scrollTop % estimateItemHeight.value);
            // console.log("设置y轴的偏移量:", startOffset.value);
            tableBody.style.willChange = "transform";
            tableBody.style.transform = getTransform.value;
          });
          tableHeight.value = target.clientHeight;
          tableScrollTop.value = target.scrollTop;
        };
        target.addEventListener("scroll", throttle(scrollFn));
      },

      updated(el, binding, vnode, prevVnode) {
        // 可选参数 待处理dataListLength
        const { dataListLength } = binding.value || {};
        if (dataListLength) {
          estimateDataListLength.value = dataListLength;
        }

        const target = el.querySelector(".ant-table-row");
        estimateItemHeight.value = target?.clientHeight;
        // console.log(estimateItemHeight.value);

        const target2 = el.querySelector(aTableScrollWrapperClass);
        tableHeight.value = target2.clientHeight;
        // console.log(target2.clientHeight);
        // if (target2) {
        //   over.value = start.value + visibleCount.value + belowCount.value;
        //   console.log(over.value);
        // }
      },
    });

    // const visibleCount = computed(() => {
    //   console.log(tableHeight.value, "visable");
    //   return Math.ceil(tableHeight.value / estimateItemHeight.value);
    // });
    // 偏移量对应的style,translate3d 触发硬件加速
    const getTransform = computed(
      () => `translate3d(0,${startOffset.value}px,0)`
    );

    // watch(tableHeight, () => {
    //   visibleCount.value = Math.ceil(
    //     tableHeight.value / estimateItemHeight.value
    //   );

    //   console.log(visibleCount.value, "11111111");
    // });

    watch(
      [tableScrollTop, estimateDataListLength],
      ([topNew, lengthNew], [topOld, lengtOld]) => {
        const startNum = tableScrollTop.value / estimateItemHeight.value;
        const floorStartNum = Math.floor(startNum);
        // console.log(floorStartNum);
        start.value =
          startNum >= visibleCount.value
            ? Math.max(floorStartNum, 0)
            : floorStartNum;

        if (lengtOld !== lengthNew) {
          estimateDataListLength.value = lengthNew;
        }

        over.value = Math.ceil(
          (tableScrollTop.value + tableHeight.value) /
            estimateItemHeight.value +
            visibleCount.value
        );

        // console.log("start:", start.value, "over", over.value);
      }
    );

    app.provide("dataListOptions", {
      start,
      over,
    });
  },
};
