import './App.css';

import useToggle from './hooks/toggle'
import useAsync from './hooks/async'
import useEventListener from './hooks/event'


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

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {status === "idle" && <div>Start your journey by clicking a button</div>}
          {status === "success" && <div>{value}</div>}
          {status === "error" && <div>{error}</div>}
          <button onClick={execute} disabled={status === "pending"}>
            {status !== "pending" ? "Click me" : "Loading..."}
          </button>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={setToggle}>{state ? 'Toggled' : 'Click to Toggle'}</button>
      </header>
    </div>
  );
}

export default App;
