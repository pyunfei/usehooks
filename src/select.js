import React, { useRef, useState } from 'react'

import { getRect } from './hook/rect'
import useUpdateEffect from './hook/effect'
import useEventListener from './hook/listener'
import useSetState from './hook/state'
import useScrollParent from './hook/scroll'
import isHidden from './hook/hiddle'

const List = (props) => {

  const [state, updateState] = useState({
    loading: props.loading,
    error: props.error,
  });

  const root = useRef(null)
  const scrollParent = useRef(null);
  const placeholder = useRef(null);
 
  scrollParent.current = useScrollParent(root);

  const check = async () => {
    if (!props.onLoad) return;
    if (state.loading || props.finished || state.error) {
      return;
    }
    const { offset, direction } = props;
    const scrollParentRect = getRect(scrollParent.current);

    if (!scrollParentRect.height || isHidden(root.current)) {
      return;
    }

    let isReachEdge = false;
    const placeholderRect = getRect(placeholder.current);

    if (direction === 'up') {
      isReachEdge = scrollParentRect.top - placeholderRect.top <= offset;
    } else {
      isReachEdge = placeholderRect.bottom - scrollParentRect.bottom <= offset;
    }
    if (isReachEdge) {
      try {
        updateState({ loading: true });
        if (props.onLoad) await props.onLoad();
        updateState({ loading: false });
      } catch (error) {
        console.warn('onLoad error:', error.message);
        updateState({ loading: false, error: true });
      }
    }
  }

  const renderFinishedText = () => {
    if (props.finished && props.finishedText) {
      return <div>{props.finishedText}</div>;
    }
    return null;
  }
  const renderLoading = () => {
    if (state.loading && !props.finished) {
      return (props.loadingText);
    }
    return null;
  };

  const clickErrorText = () => {
    updateState({ error: false },  123);
    check()
  };
  const renderErrorText = () => {
    if (state.error && props.errorText) {
      return (
        <div onClick={clickErrorText}>
          {props.errorText}
        </div>
      );
    }
    return null;
  };



  useUpdateEffect(() => {
    if (props.autoCheck) {
      check();
    }
  }, [state.loading, props.finished, props.error]);

  // useUpdateEffect(() => {
  //   updateState({ loading: props.loading, error: props.error });
  // }, [props.loading, props.error]);

  useUpdateEffect(() => {
    if (scrollParent.current && props.immediateCheck) {
      check();
    }
  }, [scrollParent.current]);

  useEventListener('scroll', check, {
    target: scrollParent.current,
    depends: [state.loading, props.finished, state.error],
  });

  const Placeholder = <div ref={placeholder} style={{height: 0,pointerEvents: 'none'}}/>;

  return (<div ref={root} role="feed" aria-busy={state.loading}>
    {props.direction === 'down' ? props.children : Placeholder}
    {renderLoading()}
    {renderFinishedText()}
    {renderErrorText()}
    {props.direction === 'up' ? props.children : Placeholder}
  </div>)


}

List.defaultProps = {
  direction: 'down',
  offset: 300,
  immediateCheck: true,
  autoCheck: true,
  loadingText: '加载中...',
  finishedText: '没有更多了',
}

export default List