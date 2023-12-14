import { cn } from "../utils/cn.ts";
import { Chip } from "../types/enums/Chip.ts";
import { ICell } from "../types/interfaces/ICell.ts";
import { Selected } from "../types/Selected.ts";
import { Position } from "../types/Position.ts";

interface Props {
  selected: Selected
  translate: Position
  cellClick: (cell: ICell, i: number, j: number) => void
}

export const AbsoluteCell = (props: Props) => {
  const {
    translate,
    selected,
    cellClick
  } = props
  return <div className={cn('rounded-full w-16 h-16 chip-shadow border flex justify-center items-center fixed cursor-pointer transition-all duration-300',
    'before:content-[""] before:absolute before:w-12 before:h-12 before:border before:rounded-full', {
      'bg-[#2F4858] border-[#96aec5] before:border-[#96aec5] before:chip-inner-shadow-light': selected.cell.type === Chip.Black,
      'bg-[#C9CDB1] border-[#95AD98] before:border-[#95AD98] before:chip-inner-shadow-dark': selected.cell.type === Chip.White,
      'after:content-[""] after:absolute after:w-8 after:h-8 after:border-2 after:rounded-full': selected.cell.queen,
      'after:border-[#96aec5] after:chip-inner-shadow-light': selected.cell.queen && selected.cell.type === Chip.Black,
      'after:border-[#95AD98] after:chip-inner-shadow-dark': selected.cell.queen && selected.cell.type === Chip.White,
    })} style={{top: translate[0] + 'px', left: translate[1] + 'px'}} onClick={() => cellClick(selected.cell, selected.at[0], selected.at[1])}/>
}