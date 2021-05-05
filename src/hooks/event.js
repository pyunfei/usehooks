import { useEffect, useRef } from 'react'

const useEventListener = (eventName, callback, element = window) => {
  const handler = useRef();

  useEffect(() => {
    handler.current = callback;
  }, [callback]);

  useEffect(() => {
    const event = element && element.addEventListener
    if (!event) return

    const eventListener = (event) => handler.current(event);

    element.addEventListener(eventName, eventListener);

    return () => element.removeEventListener(eventName, eventListener);

  }, [eventName, element]);
}

export default useEventListener;