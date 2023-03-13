export default function throttle(fn, wait = 100) {
  var timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn();
    }, wait);
  };
}
