import { useEffect, useState } from "react";
import { Chip } from "../types/enums/Chip.ts";
import { End } from "../types/End.ts";
import { Position } from "../types/Position.ts";

export const useAnimationsState = (end: End, turn: Chip) => {
  const [isAppear, setIsAppear] = useState(false)
  const [isStartAgain, setIsStartAgain] = useState(false)
  const [showReverseAnimation, setShowReverseAnimation] = useState(false)
  const [isInitiated, setIsInitiated] = useState(false)
  const [translate, setTranslate] = useState<Position | null>(null)

  useEffect(() => {
    if (isStartAgain) {
      setTimeout(() => {
        setIsStartAgain(false)
      }, 1500)
    }
  }, [isStartAgain]);

  useEffect(() => {
    setTimeout(() => {
      setIsAppear(true)
    }, 100)

    setTimeout(() => {
      setIsAppear(false)
    }, 1500)
  }, [])

  useEffect(() => {
    if (end !== null)
      return
    if (!isInitiated) {
      setIsInitiated(true)
      return
    }
    setShowReverseAnimation(true)
    setTimeout(() => {
      setShowReverseAnimation(false)
    }, 2000)
  }, [turn]);

  return {
    isAppear,
    isInitiated,
    isStartAgain,
    setIsStartAgain,
    showReverseAnimation,
    translate,
    setTranslate
  }
}