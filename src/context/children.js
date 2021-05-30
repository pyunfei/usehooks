import React,{ useContext } from 'react';
import DemoContext from './context'

const Children = () => {
  const { state, handleChange } = useContext(DemoContext)
  return <div>
    Children
    <button onClick={() => handleChange(state.status)}>change</button>
  </div>
}

export default Children