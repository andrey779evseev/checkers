import { useEffect, useState } from 'react'
import { Toast } from './Toast'
import { INotification } from "../../types/interfaces/INotification.ts";
import { generateRandomString } from "../../utils/generateRandomString.ts";

export let addNotification: (message: string) => void = undefined as unknown as (message: string) => void

export const Toaster = () => {
  const [notifications, setNotifications] = useState<INotification[]>([])

  useEffect(() => {
    addNotification = (message: string) => setNotifications(prev => [...prev, {
      id: generateRandomString(),
      message
    }])
  }, [setNotifications]);

  const destroy = (id: string) => setNotifications(prev => prev.filter(x => x.id !== id))

  return (
    <div className='fixed top-9 right-9 w-[500px] max-w-[90%] flex flex-col gap-4'>
      {notifications.map((notification) => (
        <Toast
          notification={notification}
          destroy={destroy}
          key={notification.id}
          duration={5000}
        />
      ))}
    </div>
  )
}