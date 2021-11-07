import { Component, ErrorInfo, isValidElement, PropsWithChildren } from 'react'
// https://www.qiyuandi.com/zhanzhang/zonghe/13758.html

// 出错后显示的元素类型
type FallbackElement = React.ReactElement<unknown, string | React.FC | typeof Component> | null;
// 出错显示组件的 props
export interface FallbackProps {
  error: Error,
  resetErrorBoundary: () => void; // fallback 组件里将该函数绑定到“重置”按钮
}

export declare function FallbackRender(props: FallbackProps): FallbackElement;

// 本组件 ErrorBoundary 的 props
interface ErrorBoundaryProps {
  fallback?: FallbackElement; // 一段 ReactElement
  FallbackComponent?: React.ComponentType<FallbackProps>; // Fallback 组件
  fallbackRender?: typeof FallbackRender; // 渲染 fallback 元素的函数
  onError?: (error: Error, info: string) => void;
  onReset?: () => void; // 开发者自定义重置逻辑，如日志上报、 toast 提示等
  resetKeys?: Array<unknown>;
  onResetKeysChange?: (
    prevResetKey: Array<unknown> | undefined,
    resetKeys: Array<unknown> | undefined,) => void;
}

// 本组件 ErrorBoundary 的 props
type ErrorBoundaryState = {
  error: Error | null; // 将 hasError 的 boolean 改为 Error 类型，提供更丰富的报错信息
}

// 初始状态
const initialState: ErrorBoundaryState = {
  error: null
}

// 检查 resetKeys 是否有变化
const changedArray = (a: Array<unknown> = [], b: Array<unknown> = []) => {
  return a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]));
}

class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
  state = initialState

  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo.componentStack);
    }
  }

  componentDidUpdate(prevProps: Readonly<PropsWithChildren<ErrorBoundaryProps>>) {
    console.log('%c [ prevProps ]-56', 'font-size:13px; background:pink; color:#bf2c9f;', prevProps, this.props)
    const { resetKeys, onResetKeysChange } = this.props;
    // 只要 resetKeys 有变化，直接 reset
    if (changedArray(prevProps.resetKeys, resetKeys)) {
      if (onResetKeysChange) {
        onResetKeysChange(prevProps.resetKeys, resetKeys);
      }
      // 重置 ErrorBoundary 状态，并调用 onReset 回调
      this.reset();
    }
  }
  // 重置该组件状态，将 error 设置 null
  reset = () => {
    this.setState({ ...initialState });
  }
  // 执行自定义重置逻辑，并重置组件状态  
  resetErrorBoundary = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.reset();
  }


  render() {
    const { fallback, FallbackComponent, fallbackRender } = this.props;
    const { error } = this.state;

    // 多种 fallback 的判断
    if (error !== null) {
      const fallbackProps: FallbackProps = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,  // 将 resetErrorBoundary 传入 fallback
      }
      // 判断 fallback 是否为合法的 Element
      if (isValidElement(fallback)) return fallback
      // 判断 render 是否为函数
      if (typeof fallbackRender === 'function') {
        return (fallbackRender as typeof FallbackRender)(fallbackProps);
      }
      // 判断是否存在 FallbackComponent
      if (FallbackComponent) return <FallbackComponent {...fallbackProps} />

      throw new Error('ErrorBoundary 组件需要传入 fallback, fallbackRender, FallbackComponent 其中一个');
    }

    return this.props.children;
  }
}

export default ErrorBoundary;