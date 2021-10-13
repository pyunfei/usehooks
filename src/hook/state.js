import { useCallback, useState } from 'react';

const isFunction = e => {
  return typeof e === "function"
}

const useSetState = (initialState) => {
  const [state, setState] = useState(initialState);

  const setMergeState = useCallback((patch) => {
    setState((prevState) => ({ ...prevState, ...(isFunction(patch) ? patch(prevState) : patch) }));
  }, []);

  return [state, setMergeState];
};

export default useSetState;