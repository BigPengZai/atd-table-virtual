import { watch, ref, computed, nextTick, onMounted } from "vue";
import throttle from "../utils/throttle";

const start = ref(0);
const over = ref(0);

let estimateItemHeight = 0;
let tableHeight = ref(0);
let tableScrollTop = ref(0);
let estimateDataList = [];
// 偏移量 startOffset，滚动后将渲染区域 偏移到可视区域中
let startOffset = ref(0);
let bufferPage = 1;
const visibleCount = computed(() =>
  Math.ceil(tableHeight.value / estimateItemHeight)
);

//头缓存数
const aboveCount = computed(() =>
  Math.min(start.value, bufferPage * visibleCount.value)
);

//尾部缓存数
const belowCount = computed(() =>
  Math.min(
    estimateDataList.length - over.value,
    bufferPage * visibleCount.value
  )
);

const aTableScrollWrapperClass = ".ant-table-body";
const aTableTBodyClass = ".ant-table-tbody";

export default {
  install: (app, options) => {
    if (options) {
      estimateItemHeight = options.estimateItemHeight;
    }
    // 导入指令
    // 将函数转为对象，如果我们在自定义指令时，需要在mounted和updated中实现相同的行为，并且不关心其他钩子的情况，那么我们开可以采用简写：
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
          // console.log("设置y轴的偏移量", startOffset.value);

          tableBody.style.transform = getTransform.value;
        });
        // setTimeout(() => {
        tableHeight.value = target.clientHeight;
        tableScrollTop.value = target.scrollTop;
        // }, 200);
      };
      // throttle(scrollFn, 150);

      var timerScrolling = null;
      target.addEventListener("scroll", () => {
        clearTimeout(timerScrolling);
        timerScrolling = setTimeout(function () {
          // 无滚动事件触发，认为停止滚动了
          scrollFn();
        }, 10);
      });
    });

    // 偏移量对应的style
    const getTransform = computed(() => `translate(0,${startOffset.value}px)`);

    watch([tableHeight, tableScrollTop], () => {
      // if (tableScrollTop.value > 40) {
      start.value = Math.max(
        Math.ceil(tableScrollTop.value / estimateItemHeight),
        0
      );

      over.value = Math.min(
        Math.ceil(
          (tableScrollTop.value + tableHeight.value) / estimateItemHeight
        ),
        estimateDataList.length
      );
      // }

      console.log(
        "tableScrollTop:",
        tableScrollTop.value,
        "start:",
        start.value,
        "over",
        over.value
      );
    });

    app.provide("dataListOptions", {
      start,
      over,
    });

    // onMounted(() => {
    //   nextTick(() => {
    //     let scrollTop = target?.scrollTop || 0;

    //     startOffset.value = scrollTop - (scrollTop % estimateItemHeight);
    //     // console.log("设置y轴的偏移量", scrollTop);

    //     tableBody.style.transform = getTransform.value;
    //   });
    // });
  },
};
