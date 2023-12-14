import { useEffect, useRef, useState } from 'react'
import { cn } from "../../utils/cn.ts";
import { INotification } from "../../types/interfaces/INotification.ts";
interface Props {
  destroy: (id: string) => void
  notification: INotification
  duration?: number
}

export const Toast = (props: Props) => {
  const { destroy, notification, duration = 0 } = props
  const [isHide, setIsHide] = useState(false)
  const timerId = useRef<number | null>(null)

  useEffect(() => {
    if (!duration) return

    const timer = setTimeout(() => {
      setIsHide(true)
      setTimeout(() => {
        destroy(notification.id)
      }, 200)
    }, duration)

    return () => clearTimeout(timer)
  }, [destroy, duration, notification])

  const remove = () => {
    if (timerId.current !== null)
      clearTimeout(timerId.current)
    setIsHide(true)
    setTimeout(() => {
      destroy(notification.id)
    }, 200)
  }

  return (
    <div
      className={cn('px-4 py-2 w-full h-fit min-h-[40px] bg-red-500 rounded text-white select-none cursor-pointer', {
        'animate-slide-left': !isHide,
        'animate-slide-right': isHide,
      })}
      onClick={remove}
    >
      {notification.message}
    </div>
  )
}