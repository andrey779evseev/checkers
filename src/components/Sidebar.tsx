import { Chip } from "../types/enums/Chip.ts";
import { Button } from "./Button.tsx";
import { Toggle } from "./Toggle.tsx";
import { Input } from "./Input.tsx";
import { End } from "../types/End.ts";

interface Props {
  turn: Chip
  setEnd: (v: End) => void
  draw: () => void
  showSuggestions: boolean
  setShowSuggestions: (v: boolean) => void
  timing: string
  setTiming: (v: string) => void
  revert: () => void
  count: number[]
  moveTurn: () => void
  timer: string
  isHistoryEmpty: boolean
}

export const Sidebar = (props: Props) => {
  const {
    draw,
    revert,
    setEnd,
    setTiming,
    timing,
    turn,
    showSuggestions,
    setShowSuggestions,
    count,
    timer,
    moveTurn,
    isHistoryEmpty
  } = props
  return <aside className='w-max h-[calc(100vh-160px)] bg-white/50 border-2 border-[#fcb69f] rounded p-4 text-[#2F4858] text-2xl flex flex-col gap-4 items-start'>
    <h2 className='font-bold text-center w-full'>Ход {turn === Chip.White ? 'белых' : 'черных'}</h2>
    <table className='border-collapse rounded overflow-hidden w-full'>
      <thead>
      <tr className='text-lg'>
        <th className='border-2 border-[#96aec5] py-2 px-4'>Белые</th>
        <th className='border-2 border-[#96aec5] py-2 px-4'>Черные</th>
      </tr>
      </thead>
      <tbody>
      <tr className='text-center'>
        <td className='border-2 border-[#96aec5]'>{count[0]}</td>
        <td className='border-2 border-[#96aec5]'>{count[1]}</td>
      </tr>
      </tbody>
    </table>
    <div className="flex gap-4">
      <Button onClick={() => setEnd(turn === Chip.Black ? Chip.White : Chip.Black)}>
        <h2 className='font-bold text-center w-full'>Сдаться</h2>
      </Button>
      <Button onClick={draw}>
        <h2 className='font-bold text-center w-full'>Предложить ничью</h2>
      </Button>
    </div>
    <div className="p-2 bg-black/10 w-full rounded pb-1">
      <Toggle value={showSuggestions} onChange={setShowSuggestions}>Подсказки ходов</Toggle>
    </div>
    <Input value={timing} onChange={setTiming}>
      <h2 className='font-bold text-center w-full'>Время на ход, в минутах</h2>
    </Input>
    <Button onClick={revert} disabled={isHistoryEmpty}>
      <h2 className='font-bold text-center w-full'>Шаг назад</h2>
    </Button>
    <Button onClick={moveTurn}>
      <h2 className='font-bold text-center w-full'>Таймер</h2>
    </Button>
    <h2 className='font-bold text-center w-full font-mono uppercase text-3xl select-none'>{timer}</h2>
  </aside>
}