import { Chip } from "../types/enums/Chip.ts";
import { Button } from "./Button.tsx";
import { End } from "../types/End.ts";

interface Props {
  restart: () => void
  end: End
}

export const RestartOverlay = (props: Props) => {
  const {end, restart} = props
  return <div className="fixed flex justify-center items-center flex-col gap-8 z-40 w-full h-screen">
    <div className="absolute w-full h-full bg-black bg-opacity-50 blur-sm z-[-1]"/>
    <h1 className='text-3xl text-white font-sans'> {end === 'draw' ? 'Ничья' : end === Chip.Black ? 'Победили черные' : 'Победили белые'}</h1>
    <Button onClick={restart}>Начать заново</Button>
  </div>
}