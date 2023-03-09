import { createApp, watch, ref, computed, nextTick } from "vue";

export let start = ref(0);
export let over = ref(0);

let estimateItemHeight = 40;
const padding = ref([]);
let tableHeight = ref(300);
let tableScrollTop = ref(0);
let estimateDataList = [];
// 偏移量 startOffset，滚动后将渲染区域 偏移到可视区域中
let startOffset = ref(0);

const VirtualTableScroll = {
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {
    const { dataList, itemHeight = 40 } = binding.value;
    estimateDataList = dataList;
    estimateItemHeight = itemHeight;

    if (over.value == 0) {
      over.value = start.value + tableHeight.value / estimateItemHeight;
      console.log(over.value);
    }

    let target = el.querySelector(".ant-table-body");
    // console.log(target);

    let tabel = el.querySelector(".ant-table-tbody");
    console.log(tabel);
    target.addEventListener("scroll", () => {
      nextTick(() => {
        // console.log("设置y轴的偏移量", scrollTop);
        let scrollTop = target?.scrollTop || 0;
        startOffset.value = scrollTop - (scrollTop % estimateItemHeight);

        tabel.style.transform = getTransform.value;
      });

      setTimeout(() => {
        tableHeight.value = target.clientHeight;
        tableScrollTop.value = target.scrollTop;
        // console.log(tableHeight.value, tableScrollTop.value);
      }, 200);
    });
  },
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {},
};

// 偏移量对应的style
const getTransform = computed(() => `translate3d(0,${startOffset.value}px,0)`);

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
  //   console.log("start:", start.value, "over", over.value);
});

export default VirtualTableScroll;
