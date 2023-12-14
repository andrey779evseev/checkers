import { useState } from "react";
import { HistoryItem } from "../types/HistoryItem.ts";
import { ICell } from "../types/interfaces/ICell.ts";

export const useHistory = (field: ICell[][], setField: (v: ICell[][]) => void, swap: () => void) => {
  const [history, setHistory] = useState<HistoryItem[]>([])

  const revert = () => {
    const action = history[history.length - 1]
    const copy = structuredClone(field)
    copy[action.from[0]][action.from[1]] = copy[action.to[0]][action.to[1]]
    copy[action.to[0]][action.to[1]] = {type: null, queen: false}
    for (const b of action.beaten) {
      copy[b.at[0]][b.at[1]] = b.cell
    }
    setField(copy)
    setHistory(prev => prev.slice(0, prev.length - 1))
    swap()
  }

  return {
    isHistoryEmpty: history.length === 0,
    push: (item: HistoryItem) => setHistory(prev => [...prev, item]),
    reset: () => setHistory([]),
    revert
  }
}