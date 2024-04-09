// 二分查找
export const binarySearch = (positions, value) => {
  let start = 0;
  let end = Object.keys(positions).length - 1;
  let tempIndex = null;
  while (start <= end) {
    const midIndex = Math.floor((start + end));
    const midValue = positions[midIndex].bottom;
    if (midValue === value) {
      return midIndex + 1;
    } else if (midValue < value) {
      start = midIndex + 1;
    } else if (midValue > value) {
      if (tempIndex === null || tempIndex > midIndex) {
        tempIndex = midIndex;
      }
      end = end - 1;
    }
  }
  return tempIndex;
};