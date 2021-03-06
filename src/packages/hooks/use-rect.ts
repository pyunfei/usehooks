const isWindow = (val: unknown): val is Window => val === window;
type Rect = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

const useRect: RectType = (element: Element | Window): Rect => {

  if (isWindow(element)) {
    const width = element.innerWidth;
    const height = element.innerHeight;

    return {
      top: 0,
      left: 0,
      right: width,
      bottom: height,
      width,
      height,
    };
  }

  if (element && element.getBoundingClientRect) {
    return element.getBoundingClientRect();
  }

  return {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
  };
};

type ReturnType<T> = T extends (...args: any[]) => infer P ? P : never
type RectType = (element: Element | Window) => Rect

export type test = ReturnType<RectType>

export { useRect as getRect };

export default useRect;
