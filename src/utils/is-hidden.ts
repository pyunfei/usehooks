/**
 * 如果检测到目标元素出现强制性干预的css属性 例如 display  position 直接不执行所在的函数
 *
 * @param {HTMLElement} el 所需要检测的元素
 * @return {*}  {boolean}  返回是否需要执行的状态
 */
const isHidden = (el: HTMLElement): boolean => {
  if (!el) {
    return false;
  }
  const style = window.getComputedStyle(el);
  const hidden = style.display === 'none';

  const parentHidden = el.offsetParent === null && style.position !== 'fixed';
  return hidden || parentHidden;
}

export default isHidden