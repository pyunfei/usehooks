import { useState, useCallback, useEffect } from 'react'

const useAsync = (asyncApi, immediate = true) => {
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const callback = useCallback(() => {
    setStatus('pending')
    setValue(null)
    setError(null)
    return asyncApi().then(res => {
      setStatus('success')
      setValue(res)
    }).catch(res => {
      setStatus('error')
      setError(res)
    })
  }, [asyncApi])

  useEffect(() => {
    if (immediate) {
      console.log('立即调用1', immediate)
      callback()
    }
    console.log('立即调用2', immediate)
  }, [callback, immediate])

  return [callback, status, value, error]

}

export default useAsync;