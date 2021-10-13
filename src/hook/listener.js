/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

let supportsPassive = false;
if (typeof window !== 'undefined' ) {
  try {
    const opts = {};
    Object.defineProperty(opts, 'passive', {
      get() {
        // eslint-disable-next-line no-unused-vars
        supportsPassive = true;
      },
    });
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

function useEventListener(type,listener,options = {},) {
  const { target = window, passive = false, capture = false, depends = [] } = options;
  let attached;

  const add = () => {
    const element = target;

    if (element && !attached) {
      element.addEventListener(type, listener, { capture, passive });
      attached = true;
    }
  };

  const remove = () => {
    const element = target;

    if (element && attached) {
      element.removeEventListener(type, listener, capture);
      attached = false;
    }
  };

  // https://stackoverflow.com/questions/55265255/react-usestate-hook-event-handler-using-initial-state
  React.useEffect(() => {
    add();
    return () => remove();
  }, [target, ...depends]);
}

export default useEventListener;
