import { useEffect, useState } from "react";

export const useTimer = (moveTurn: () => void) => {
  const [startTime, setStartTime] = useState(new Date())
  const [timer, setTimer] = useState('')
  const [timing, setTiming] = useState('10')

  const reset = () => {
    setStartTime(new Date())
    setTimer('')
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const all = parseInt(timing) || 1
      const diff = new Date().getTime() - startTime.getTime()
      const seconds = diff / 1000
      const minutes = Math.floor(seconds / 60)
      setTimer(`${all - 1 - minutes}:${60 - (Math.round(seconds) - minutes * 60)}`)
      if (all * 60 < seconds) {
        moveTurn()
        reset()
      }
    }, 16)
    return () => clearInterval(interval)
  }, [moveTurn, startTime, timing])
  return {
    timer,
    timing,
    setTiming,
    reset
  }
}