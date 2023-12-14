import { useState } from "react";
import { addNotification, Toaster } from "./components/Toast/Toaster.tsx";
import { Chip } from "./types/enums/Chip.ts";
import { ICell } from "./types/interfaces/ICell.ts";
import { useTimer } from "./hooks/useTimer.ts";
import { useSuggestions } from "./hooks/useSuggestions.ts";
import { useHistory } from "./hooks/useHistory.ts";
import { useAnimationsState } from "./hooks/useAnimationsState.ts";
import { useGame } from "./hooks/useGame.ts";
import { RestartOverlay } from "./components/RestartOverlay.tsx";
import { Sidebar } from "./components/Sidebar.tsx";
import { Field } from "./components/Field.tsx";
import { AbsoluteCell } from "./components/AbsoluteCell.tsx";
import { Position } from "./types/Position.ts";


function App() {
  const {
    field,
    reset: resetField,
    turn,
    end,
    count,
    selected,
    swap,
    draw,
    setEnd,
    setSelected,
    setField,
    checkForEnd,
    compareWithSelected
  } = useGame()

  const [hintsHiddenWhenTranslate, setHintsHiddenWhenTranslate] = useState(false)
  const {
    timing,
    setTiming,
    timer,
    reset: resetTimer,
  } = useTimer(swap)

  const {
    showSuggestions,
    setShowSuggestions,
    suggestions,
    containsInBeatSuggestion,
    containsInSuggestion
  } = useSuggestions(selected, field, turn)

  const {
    isHistoryEmpty,
    push: historyPush,
    reset: resetHistory,
    revert
  } = useHistory(field, setField, swap)

  const {
    translate,
    setTranslate,
    isAppear,
    isInitiated,
    isStartAgain,
    setIsStartAgain,
    showReverseAnimation
  } = useAnimationsState(end, turn)

  const move = (to: Position) => {
    const suggestion = suggestions.find(s => s.to[0] === to[0] && s.to[1] === to[1])
    if (selected !== null && !!suggestion) {
      const rect = document.getElementById(`${to[0]}:${to[1]}`)!.getClientRects()?.[0]
      setTranslate([rect.top + 8, rect.left + 8])
      setHintsHiddenWhenTranslate(true)
      setTimeout(() => {
        const copy = structuredClone(field)
        if (suggestion.beat !== null) {
          for (const b of suggestion.beat) {
            copy[b[0]][b[1]].type = null
            copy[b[0]][b[1]].queen = false
          }
        }
        if((turn === Chip.White && to[0] === 0) || (turn === Chip.Black && to[0] === 9))
          copy[to[0]][to[1]] = {...structuredClone(copy[selected.at[0]][selected.at[1]]), queen: true}
        else
          copy[to[0]][to[1]] = structuredClone(copy[selected.at[0]][selected.at[1]])
        copy[selected.at[0]][selected.at[1]] = {type: null, queen: false}
        setField(copy)
        setTranslate(null)
        resetTimer()
        checkForEnd(copy)
        historyPush({
          from: structuredClone(selected.at),
          to: structuredClone(to),
          beaten: structuredClone(suggestion.beat?.map(b => ({at: b, cell: field[b[0]][b[1]]})) ?? [])
        })
        setHintsHiddenWhenTranslate(false)
      }, 200)
    } else {
      addNotification('Вы не можете переместить шашку на эту клетку')
    }
  }

  const cellClick = (cell: ICell, i: number, j: number) => {
    if (cell.type === null && selected !== null)
      move([i, j])
    else if (turn === cell.type) {
      setSelected(prev => (!!prev && compareWithSelected([i, j])) ? null : {at: [i, j], cell: field[i][j]})
      const rect = document.getElementById(`${i}:${j}`)!.getClientRects()?.[0]
      setTranslate(prev => (!!prev && compareWithSelected([i, j])) ? null : [rect.top + 8, rect.left + 8])
    }
  }

  const restart = () => {
    resetField()
    setIsStartAgain(true)
    resetTimer()
    resetHistory()
  }

  const moveTurn = () => {
    swap()
    resetTimer()
  }

  return (
    <main
      className='flex justify-center items-center w-full h-full min-h-screen bg-gradient-to-t from-[#ffecd2] to-[#fcb69f] overflow-hidden gap-8'>
      {end !== null ? <RestartOverlay restart={restart} end={end}/> : null}
      <Sidebar
        turn={turn}
        setEnd={setEnd}
        draw={draw}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        timing={timing}
        setTiming={setTiming}
        revert={revert}
        count={count}
        moveTurn={moveTurn}
        timer={timer}
        isHistoryEmpty={isHistoryEmpty}
      />
      <Field
        isAppear={isAppear}
        isStartAgain={isStartAgain}
        end={end}
        turn={turn}
        showReverseAnimation={showReverseAnimation}
        isInitiated={isInitiated}
        field={field}
        compareWithSelected={compareWithSelected}
        containsInSuggestion={containsInSuggestion}
        containsInBeatSuggestion={containsInBeatSuggestion}
        hintsHiddenWhenTranslate={hintsHiddenWhenTranslate}
        showSuggestions={showSuggestions}
        cellClick={cellClick}
        translate={translate}
        selected={selected}
      />
      {
        translate !== null && selected !== null ?
          <AbsoluteCell selected={selected} translate={translate} cellClick={cellClick}/>
          : null
      }
      <Toaster/>
    </main>
  )
}

export default App
