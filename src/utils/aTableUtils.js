export function syncAttrs(sourceElem, targetElem, attrsKeys) {
  let value;
  attrsKeys.forEach((name) => {
    value = sourceElem.getAttribute(name);
    if (value !== null) {
      targetElem.setAttribute(name, value);
    } else {
      targetElem.removeAttribute(name);
    }
  });
}
