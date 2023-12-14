import { useCallback, useEffect, useMemo, useState } from "react";
import { ICell } from "../types/interfaces/ICell.ts";
import { Chip } from "../types/enums/Chip.ts";
import { generateField } from "../utils/generateField.ts";
import { End } from "../types/End.ts";
import { Selected } from "../types/Selected.ts";
import { Position } from "../types/Position.ts";

export const useGame = () => {
  const [field, setField] = useState<ICell[][]>([])
  const [turn, setTurn] = useState(Chip.White)
  const [selected, setSelected] = useState<Selected | null>(null)
  const [end, setEnd] = useState<End>(null)

  useEffect(() => {
    setField(generateField())
  }, []);

  const count = useMemo(() => {
    const flat = field.flat()
    const white = flat.filter(x => x.type === Chip.White).length
    const black = flat.filter(x => x.type === Chip.Black).length
    return [15 - white, 15 - black]
  }, [field])
  
  const swap = useCallback(() => {
    setTurn(prev => prev === Chip.Black ? Chip.White : Chip.Black)
    setSelected(null)
  }, [setTurn, setSelected])

  const checkForEnd = useCallback(<T extends typeof field>(field: T) => {
    const flat = field.flat()
    const white = flat.filter(c => c.type === Chip.White).length
    const black = flat.filter(c => c.type === Chip.Black).length
    if (white === 0)
      setEnd(Chip.Black)
    else if (black === 0)
      setEnd(Chip.White)
    else
      swap()
  }, [setEnd, swap])

  const compareWithSelected = useCallback((t: Position) => {
    return selected !== null && selected.at[0] === t[0] && selected.at[1] === t[1]
  }, [selected])

  return {
    field,
    reset: () => {
      setField(generateField())
      setSelected(null)
      setTurn(Chip.White)
      setEnd(null)
    },
    turn,
    selected,
    end,
    count,
    swap,
    draw: () => {
      if (confirm('Вы согласны на ничью?')) {
        setEnd('draw')
      }
    },
    setEnd,
    setSelected,
    setField,
    checkForEnd,
    compareWithSelected
  }
}