import {
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  reactive,
  computed,
} from "vue";

export function useWinSize() {
  const size = ref({ width: 1920, height: 1080 });
  function onResize() {
    size.value = {
      //用窗口的最新宽高更新width和heigth
      width: document.documentElement.clientWidth || document.body.clientWidth,
      height:
        document.documentElement.clientHeight || document.body.clientHeight,
    };
    console.log("onResize", size.value);
  }
  onMounted(() => {
    onResize();
    window.addEventListener("resize", onResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onResize);
  });

  return size;
}
