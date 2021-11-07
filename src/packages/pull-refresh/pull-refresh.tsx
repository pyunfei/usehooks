import React, { useRef } from 'react'

import { PullRefreshProps } from '.'
import { getScrollTop } from '../../utils/scroll'
import { getScrollParent } from '../hooks/use-scroll-parent'
import useTouch from '../hooks/use-touch'

const PullRefresh: React.FC<PullRefreshProps> = (props) => {
  const { onRefresh } = props
  onRefresh && onRefresh()

  const reachTop = useRef();

  const touch = useTouch();

  const checkPosition = (event: TouchEvent) => {
    const scrollTarget = getScrollParent(event.target as HTMLElement);
    //@ts-ignore
    reachTop.current = getScrollTop(scrollTarget) === 0;
    touch.start(event);
    console.log('%c [ reachTop.current ]-17', 'font-size:13px; background:pink; color:#bf2c9f;', reachTop.current)
  };

  const onTouchStart = (event: React.TouchEvent) => {
    checkPosition(event.nativeEvent);
  };

  const onTouchEnd = (event: any) => {
    // console.log('%c [ onTouchEnd ]-10', 'font-size:13px; background:pink; color:#bf2c9f;', event.nativeEvent)
  }

  return <div style={{ height: '100vh' }}>
    <div
      style={{ height: '100%' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      {props.children}
    </div>
  </div>
}

PullRefresh.defaultProps = {

}

export default PullRefresh