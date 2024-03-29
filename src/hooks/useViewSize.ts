import { useCallback, useEffect, useState } from 'react'

function useWindowEvent<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions) {
  useEffect(() => {
    window.addEventListener(type, listener, options)

    return () => window.removeEventListener(type, listener, options)
  }, [listener, options, type])
}

const eventListenerOptions = {
  passive: true
}

const browser = typeof window !== 'undefined'

const useViewSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: browser ? window.innerWidth : 0,
    height: browser ? window.innerHeight : 0
  })

  const setSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth || 0,
      height: window.innerHeight || 0
    })
  }, [])

  useWindowEvent('resize', setSize, eventListenerOptions)
  useWindowEvent('orientationchange', setSize, eventListenerOptions)

  return windowSize
}

export default useViewSize
