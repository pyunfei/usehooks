
// import List from './packages/list/demo'
// import PullRefresh from './packages/pull-refresh/demo'
import List from './error'
import ErrorBoundary, { FallbackProps } from './error/error';

function App() {
  const onError = () => console.error('出错啦')
  // const ErrorFallback = () => <div>自定义错误组件</div>

  const onReset = () => {
    console.log('已重置')
    console.info('刚刚出错了，不好意思，现在已经重置好了，请找老板锤这个开发')
  }
  // fallback 组件的渲染函数
  const renderFallback = (props: FallbackProps) => {
    console.log('%c [ props ]-17', 'font-size:13px; background:pink; color:#bf2c9f;', props)
    return (
      <div>
        出错啦，你可以<button onClick={props.resetErrorBoundary}>重置</button>
      </div>
    )
  }
  return (
    <div className="App">
      {/* <List /> */}
      {/* <PullRefresh /> */}
      {/* <ErrorBoundary fallback={<div>出错啦</div>} onError={onError}>
        <List />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
        <List />
      </ErrorBoundary> */}
      <ErrorBoundary fallbackRender={renderFallback} onError={onError} onReset={onReset}>
        <List />
      </ErrorBoundary>
    </div>
  );
}

export default App;
