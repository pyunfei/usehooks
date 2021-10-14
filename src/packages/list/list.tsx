import React, { useRef, useState } from 'react'

import useScrollParent from '../hooks/use-scroll-parent';
import useEventListener from '../hooks/use-event-listener';
import useUpdateEffect from '../hooks/use-update-effect';
import isHidden from '../../utils/is-hidden'
import { getRect } from '../hooks/use-rect';

import { ListProps } from '.'

type StateProps = Pick<ListProps, 'loading' | 'error'>

const List: React.FC<ListProps> = (props) => {

  const [state, upState] = useState<StateProps>({ loading: props.loading, error: props.loading })

  const root = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const scrollParent = useRef(null) as React.MutableRefObject<any>;
  const placeholder = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  scrollParent.current = useScrollParent(root);


  const handle = async () => {
    const { offset, direction, finished, onLoad } = props;
    const { loading, error } = state

    if (!onLoad) return;
    if (loading || finished || error) {
      return;
    }
    const scrollParentRect = getRect(scrollParent.current);

    if (!scrollParentRect.height || isHidden(root.current)) {
      return;
    }

    let range = false;
    const placeholderRect = getRect(placeholder.current);

    if (direction === 'up') {
      range = scrollParentRect.top - placeholderRect.top <= offset!;
    } else {
      range = placeholderRect.bottom - scrollParentRect.bottom <= offset!;
    }
    if (range) {
      try {
        upState({ loading: true });
        if (onLoad) await onLoad();
        upState({ loading: false });
      } catch (error: unknown) {
        console.warn('onLoad error:', error);
        upState({ loading: false, error: true });
      }
    }
  }

  const renderFinishedText = () => {
    if (props.finished && props.finishedText) {
      return <div>{props.finishedText}</div>;
    }
    return null;
  };

  const clickErrorText = () => {
    upState({ error: false });
    handle();
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

  const renderLoading = () => {
    if (state.loading && !props.finished) {
      return (<div >{props.loadingText}</div>);
    }
    return null;
  };

  const Placeholder = <div ref={placeholder} style={{ height: 0, pointerEvents: 'none' }} />;

  useUpdateEffect(() => {
    if (props.autoCheck) {
      handle();
    }
  }, [state.loading, props.finished, props.error]);

  useUpdateEffect(() => {
    upState({ loading: props.loading, error: props.error });
  }, [props.loading, props.error]);

  useUpdateEffect(() => {
    if (scrollParent.current && props.immediateCheck) {
      handle();
    }
  }, [scrollParent.current]);

  useEventListener('scroll', handle, {
    target: scrollParent.current!,
    depends: [state.loading, props.finished, state.error],
  });

  return <div ref={root} role="feed" aria-busy={state.loading}>
    {props.direction === 'down' ? props.children : Placeholder}
    {renderLoading()}
    {renderFinishedText()}
    {renderErrorText()}
    {props.direction === 'up' ? props.children : Placeholder}
  </div>
}

List.defaultProps = {
  offset: 300,
  direction: 'down',
  immediateCheck: true,
  autoCheck: true,
  loadingText: '加载中...',
  finishedText: '没有更多了',
};


export default List