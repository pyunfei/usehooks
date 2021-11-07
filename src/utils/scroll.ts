
type ScrollElement = HTMLElement | Window
export function getScrollTop(el: ScrollElement): number {
  const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset;
  console.log('%c [ top ]-5', 'font-size:13px; background:pink; color:#bf2c9f;', top)

  // iOS scroll bounce cause minus scrollTop
  return Math.max(top, 0);
}