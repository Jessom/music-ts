export const playCountFilter = (val: number): string => {
  if (val > 100000000) {
    return `${(val / 100000000).toFixed(1)}亿`;
  } else if (val > 10000) {
    return `${(val / 10000).toFixed(2)}万`;
  } else {
    return `${val}`;
  }
};
