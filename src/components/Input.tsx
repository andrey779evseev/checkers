import { PropsWithChildren, useId } from "react";

interface Props extends PropsWithChildren{
  value: string
  onChange: (value: string) => void
}

export const Input = (props: Props) => {
  const {onChange, value, children} = props
  const id = useId()
  return <div className='w-full'>
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{children}</label>
    <input value={value} onChange={(e) => onChange(e.target.value)}
      type="text" id={id} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </div>
}