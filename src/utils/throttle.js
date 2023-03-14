export default function throttle(fn, wait = 10) {
  var timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn();
    }, wait);
  };
}
