import React, { useState } from 'react';
import Children from './children'
import DemoContext from './context'

const Demo = () => {
  const [ status ,setStatus ] = useState(false)
  const handleChange = (e) => {
    setStatus(!e)
  }
  return <DemoContext.Provider value={{ state: { status }, handleChange }}>
    status: { JSON.stringify(status) }
    <Children />
  </DemoContext.Provider>
};

export default Demo