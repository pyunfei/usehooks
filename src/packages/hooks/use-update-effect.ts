import { useEffect, useRef } from 'react';

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const target = useRef(false);

  useEffect(() => {
    if (!target.current) {
      target.current = true;
    } else {
      return effect();
    }
    return undefined;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useUpdateEffect;
