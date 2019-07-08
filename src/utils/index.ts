/**
 * 获取滚动条位置
 */
export const getScrollTop = (): number => {
  return document.body.scrollTop || document.documentElement.scrollTop;
};

export const setScrollTop = (scrollTop: number): void => {
  if (document.body.scrollTop) {
    document.body.scrollTop = scrollTop;
  } else if (document.documentElement.scrollTop) {
    document.documentElement.scrollTop = scrollTop;
  }
};
