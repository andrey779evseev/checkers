import { PropsWithChildren } from "react";
import { cn } from "../utils/cn.ts";

interface Props extends PropsWithChildren {
  onClick: () => void
  disabled?: boolean
}
export const Button = (props: Props) => {
  const {children, onClick, disabled} = props
  return <button
    disabled={disabled}
    onClick={disabled ? undefined : onClick}
    className={cn(
      'relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group',
      'bg-gradient-to-br from-pink-500 to-orange-400 w-full max-w-[300px] disabled:opacity-50 disabled:cursor-not-allowed',
      'group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white',
      'focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'
    )}>
      <span
        className={cn(
          "relative px-5 py-2.5 transition-all duration-300 ease-in bg-white bg-opacity-50 rounded-md",
          'group-hover:bg-opacity-0 dark:bg-gray-900 w-full h-full grid place-items-center'
        )}>
        {children}
      </span>
  </button>
}