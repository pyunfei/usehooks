
import { useEffect } from 'react';

export const inBrowser = typeof window !== 'undefined';

// https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#使用_passive_改善的滚屏性能
let supportsPassive = false;
if (inBrowser) {
  try {
    const opts = {};
    Object.defineProperty(opts, 'passive', {
      // eslint-disable-next-line getter-return
      get() {
        supportsPassive = true;
      },
    });
    window.addEventListener('test-passive', () => {}, opts);
    // eslint-disable-next-line no-empty
  } catch (e) { }
}

export type UseEventListenerOptions = {
  target?: EventTarget;
  capture?: boolean;
  passive?: boolean;
  depends?: Array<any>;
};

const useEventListener = (type: string, listener: EventListener, options: UseEventListenerOptions = {}): void => {
  if (!inBrowser) {
    return;
  }
  const { target = window, passive = false, capture = false, depends = [] } = options;
  let flag: boolean;

  const add = () => {
    if (target && !flag) {
      target.addEventListener(type, listener, supportsPassive ? { capture, passive } : capture);
      flag = true;
    }
  };

  const remove = () => {
    if (target && flag) {
      target.removeEventListener(type, listener, capture);
      flag = false;
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    add();
    return () => remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, ...depends]);
}

export default useEventListener;
