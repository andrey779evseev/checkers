import { useCallback, useMemo, useState } from "react";
import { Suggestions } from "../types/Suggestions.ts";
import { getDiagonalValues } from "../utils/getDiagonalValues.ts";
import { Chip } from "../types/enums/Chip.ts";
import { SIZE } from "../constants.ts";
import { ICell } from "../types/interfaces/ICell.ts";
import { Position } from "../types/Position.ts";

export const useSuggestions = (selected: {cell: ICell, at: Position} | null, field: ICell[][], turn: Chip) => {
  const [showSuggestions, setShowSuggestions] = useState(true)

  const suggest = useCallback((s: Position, depth = 1, beat: Position[] = [], onlyBeat = false, history: Suggestions = []): Suggestions => {
    const i = s[0]
    const j = s[1]
    const array: {to: Position, beat: Position[] | null}[] = []
    const item = field[i][j]
    if (depth > 4) return []
    if (item.queen || onlyBeat) {
      const diagonals = getDiagonalValues(field, i, j)
      for (const diagonal of diagonals) {
        let empty = true
        for (let k = 0; k < diagonal.length; k++) {
          const el = diagonal[k];
          const item = field[el[0]][el[1]]
          if (!onlyBeat && empty && item.type === null)
            array.push({to: el, beat: null})
          else if(item.type === (turn === Chip.White ? Chip.Black : Chip.White)) {
            empty = false;
            if (k + 1 < diagonal.length) {
              const next = diagonal[k + 1];
              const nextItem = field[next[0]][next[1]]
              if (nextItem.type === null)
                array.push({to: next, beat: [...beat, el]},
                  ...(history.some(x => x.to[0] === next[0] && x.to[1] === next[1]) ? [] : suggest(next, depth + 1, [...beat, el], true, [...history, ...array, {to: next, beat: [...beat, el]}]))
                )
              else break
            }
          }
        }
      }
    } else {
      if (turn === Chip.White) {
        if (depth === 1 && i - 1 >= 0 && j - 1 >= 0 && field[i - 1][j - 1].type === null)
          array.push({to: [i - 1, j - 1], beat: null})
        if (depth === 1 && i - 1 >= 0 && j + 1 < SIZE && field[i - 1][j + 1].type === null)
          array.push({to: [i - 1, j + 1], beat: null})
        if (i - 2 >= 0 && j - 2 >= 0 && field[i - 2][j - 2].type === null && field[i - 1][j - 1].type === Chip.Black)
          array.push({to: [i - 2, j - 2], beat: [[i - 1, j - 1], ...beat]}, ...suggest([i - 2, j - 2], depth + 1, [...beat, [i - 1, j - 1]]))
        if (i + 2 < SIZE && j + 2 < SIZE && field[i + 2][j + 2].type === null && field[i + 1][j + 1].type === Chip.Black)
          array.push({to: [i + 2, j + 2], beat: [[i + 1, j + 1], ...beat]}, ...suggest([i + 2, j + 2], depth + 1, [...beat, [i + 1, j + 1]]))
        if (i + 2 < SIZE && j - 2 >= 0 && field[i + 2][j - 2].type === null && field[i + 1][j - 1].type === Chip.Black)
          array.push({to: [i + 2, j - 2], beat: [[i + 1, j - 1], ...beat]}, ...suggest([i + 2, j - 2], depth + 1, [...beat, [i + 1, j - 1]]))
        if (i - 2 >= 0 && j + 2 < SIZE && field[i - 2][j + 2].type === null && field[i - 1][j + 1].type === Chip.Black)
          array.push({to: [i - 2, j + 2], beat: [[i - 1, j + 1], ...beat]}, ...suggest([i - 2, j + 2], depth + 1, [...beat, [i - 1, j + 1]]))
      } else {
        if (depth === 1 && i + 1 < SIZE && j - 1 >= 0 && field[i + 1][j - 1].type === null)
          array.push({to: [i + 1, j - 1], beat: null})
        if (depth === 1 && i + 1 < SIZE && j + 1 < SIZE && field[i + 1][j + 1].type === null)
          array.push({to: [i + 1, j + 1], beat: null})
        if (i - 2 >= 0 && j - 2 >= 0 && field[i - 2][j - 2].type === null && field[i - 1][j - 1].type === Chip.White)
          array.push({to: [i - 2, j - 2], beat: [[i - 1, j - 1], ...beat]}, ...suggest([i - 2, j - 2], depth + 1, [...beat, [i - 1, j - 1]]))
        if (i + 2 < SIZE && j + 2 < SIZE && field[i + 2][j + 2].type === null && field[i + 1][j + 1].type === Chip.White)
          array.push({to: [i + 2, j + 2], beat: [[i + 1, j + 1], ...beat]}, ...suggest([i + 2, j + 2], depth + 1, [...beat, [i + 1, j + 1]]))
        if (i + 2 < SIZE && j - 2 >= 0 && field[i + 2][j - 2].type === null && field[i + 1][j - 1].type === Chip.White)
          array.push({to: [i + 2, j - 2], beat: [[i + 1, j - 1], ...beat]}, ...suggest([i + 2, j - 2], depth + 1, [...beat, [i + 1, j - 1]]))
        if (i - 2 >= 0 && j + 2 < SIZE && field[i - 2][j + 2].type === null && field[i - 1][j + 1].type === Chip.White)
          array.push({to: [i - 2, j + 2], beat: [[i - 1, j + 1], ...beat]}, ...suggest([i - 2, j + 2], depth + 1, [...beat, [i - 1, j + 1]]))
      }
    }
    return array as { to: Position, beat: Position[] }[]
  }, [field, turn])

  const suggestions = useMemo(() => {
    if (selected === null)
      return []
    return suggest(selected.at)
  }, [selected, suggest])

  const containsInSuggestion = useCallback((t: Position) => {
    return suggestions.some(s => s.to[0] === t[0] && s.to[1] === t[1])
  }, [suggestions])

  const containsInBeatSuggestion = useCallback((t: Position) => {
    return suggestions.some(s => s.beat?.some(x => x[0] === t[0] && x[1] === t[1]))
  }, [suggestions])

  return {
    showSuggestions,
    setShowSuggestions,
    suggestions,
    containsInSuggestion,
    containsInBeatSuggestion
  }
}