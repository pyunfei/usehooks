/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
/**
 * 
 * @param {event} eventName 监听事件类型
 * @param {function} callback  监听触发事件
 * @param {DOM} element   监听元素
 * @param {boolean} status 暂且先写一个默认值 阻止触发
 */
const useEventListener = (eventName, callback, element = window, status = true) => {
  const handler = useRef();

  useEffect(() => {
    handler.current = callback;
  }, [callback]);

  useEffect(() => {
    const event = element && element.addEventListener
    if (!event || status) return

    const eventListener = (event) => handler.current(event);

    element.addEventListener(eventName, eventListener);

    return () => element.removeEventListener(eventName, eventListener);

  }, [eventName, element]);
}

export default useEventListener;