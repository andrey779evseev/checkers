import { cn } from "../utils/cn.ts";
import { Chip } from "../types/enums/Chip.ts";
import { End } from "../types/End.ts";
import { ICell } from "../types/interfaces/ICell.ts";
import { Selected } from "../types/Selected.ts";
import { Position } from "../types/Position.ts";

interface Props {
  isAppear: boolean
  isStartAgain: boolean
  end: End
  turn: Chip
  showReverseAnimation: boolean
  isInitiated: boolean
  field: ICell[][]
  compareWithSelected: (v: Position) => boolean
  containsInSuggestion: (v: Position) => boolean
  containsInBeatSuggestion: (v: Position) => boolean
  hintsHiddenWhenTranslate: boolean
  showSuggestions: boolean
  cellClick: (cell: ICell, i: number, j: number) => void
  translate: Position | null
  selected: Selected | null
}

export const Field = (props: Props) => {
  const {
    hintsHiddenWhenTranslate,
    cellClick,
    field,
    containsInSuggestion,
    isAppear,
    compareWithSelected,
    isInitiated,
    isStartAgain,
    showReverseAnimation,
    translate,
    turn,
    end,
    showSuggestions,
    selected,
    containsInBeatSuggestion
  } = props
  return <div className={cn(
    'rounded w-fit h-fit overflow-hidden field-shadow',
    {
      'animate-appear': isAppear,
      'animate-again': isStartAgain
    },
    isAppear || isStartAgain || end !== null ? undefined : turn === Chip.White ? 'animate-reverse-out' : 'animate-reverse-in'
  )} style={{transform: isInitiated && !showReverseAnimation && turn === Chip.Black ? 'rotate(180deg)' : undefined}}>
    {field.map((row, i) => (
      <div className={cn('flex group')} key={i}>
        {
          row.map((cell, j) => (
            <div id={`${i}:${j}`}
                 className={cn(
                   'w-20 h-20 flex justify-center items-center transition-colors',
                   'group-odd:odd:bg-cell-odd group-odd:even:bg-cell-even',
                   'group-even:odd:bg-cell-even group-even:even:bg-cell-odd',
                   {
                     'hover:!bg-[#51566F] hover:!bg-opacity-10': cell === null && !compareWithSelected([i, j]),
                     'hover:!bg-[#9BDE7E] hover:!bg-opacity-70': cell !== null && !compareWithSelected([i, j]),
                     '!bg-[#4BBC8E] hover:!bg-[#4BBC8E]': !hintsHiddenWhenTranslate && selected !== null && selected.at[0] === i && selected.at[1] === j,
                     '!bg-[#F9F871] hover:!bg-[#F9F871]': !hintsHiddenWhenTranslate && showSuggestions && containsInSuggestion([i, j]),
                     'cursor-not-allowed': !hintsHiddenWhenTranslate && showSuggestions && cell.type !== turn,
                     'cursor-pointer': !hintsHiddenWhenTranslate && showSuggestions && cell.type === turn || containsInSuggestion([i, j]),
                     '!bg-red-500 hover:!bg-red-500': !hintsHiddenWhenTranslate && showSuggestions && containsInBeatSuggestion([i, j])
                   }
                 )}
                 key={j}
                 onClick={() => cellClick(cell, i, j)}
            >
              {cell.type !== null ? <div className={cn(
                'rounded-full w-16 h-16 chip-shadow border flex justify-center items-center',
                'before:content-[""] before:absolute before:w-12 before:h-12 before:border before:rounded-full',
                {
                  'bg-[#2F4858] border-[#96aec5] before:border-[#96aec5] before:chip-inner-shadow-light': cell.type === Chip.Black,
                  'bg-[#C9CDB1] border-[#95AD98] before:border-[#95AD98] before:chip-inner-shadow-dark': cell.type === Chip.White,
                  'after:content-[""] after:absolute after:w-8 after:h-8 after:border-2 after:rounded-full': cell.queen,
                  'after:border-[#96aec5] after:chip-inner-shadow-light': cell.queen && cell.type === Chip.Black,
                  'after:border-[#95AD98] after:chip-inner-shadow-dark': cell.queen && cell.type === Chip.White,
                  'invisible': translate !== null && compareWithSelected([i, j])
                },
              )}/> : null}
            </div>
          ))
        }
      </div>
    ))}
  </div>
}