import './App.css';
import { useState, memo } from 'react'

import useToggle from './hooks/toggle'
import useAsync from './hooks/async'
import useEventListener from './hooks/event'
import useWhyDidYouUpdate from './hooks/update'
import useTheme from './hooks/theme'
import Progress from './progress'

import Demo from './context'


function App() {

  const myFunction = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rnd = Math.random() * 10;
        rnd <= 5
          ? resolve("Submitted successfully 🙌")
          : reject("Oh no there was an error 😞");
      }, 2000);
    });
  };
  const [state, setToggle] = useToggle()
  const [execute, status, value, error] = useAsync(myFunction, false);

  useEventListener('mousemove', ({ x, y }) => {
    console.log('event', x, y);
  })

  useTheme({
    "button-padding": "16px",
    "button-font-size": "14px",
    "button-border-radius": "4px",
    "button-border": "none",
    "button-color": "#FFF",
    "button-background": "#6772e5",
    "button-hover-border": "none",
    "button-hover-color": "#FFF",
  })

  const [count, setCount] = useState(0);

  const Counter = memo((props) => {
    useWhyDidYouUpdate("Counter", props);
    return <div style={props.style}>{props.count}</div>;
  });

  const listProps = [{ name: 'text' }]
  return (
    <div className="App">

      <Progress />

      <Demo {...listProps}/>

      <header className="App-header">
        {/* theme */}
        {/* <button className="button">Button</button> */}
        <hr />
        {/* update */}
        <div>
          <div className="counter">
            <Counter count={count} style={{ fontSize: "3rem", color: "red", }} />
            <button onClick={() => setCount(count + 1)}>Increment</button>
          </div>
        </div>
        <hr />
        {/* async */}
        <div>
          {status === "idle" && <div>Start your journey by clicking a button</div>}
          {status === "success" && <div>{value}</div>}
          {status === "error" && <div>{error}</div>}
          <button onClick={execute} disabled={status === "pending"}>
            {status !== "pending" ? "Click me" : "Loading..."}
          </button>
        </div>
        <hr />
        {/* toggle */}
        <button onClick={setToggle}>{state ? 'Toggled' : 'Click to Toggle'}</button>
      </header>
    </div>
  );
}

export default App;
