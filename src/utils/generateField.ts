import { ICell } from "../types/interfaces/ICell.ts";
import { Chip } from "../types/enums/Chip.ts";
import { SIZE } from "../constants.ts";

export const generateField = () => {
  const array: ICell[][] = new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(null).map(() => ({type: null, queen: false})));
  for (let i = 0; i < SIZE; i++) {
    if (i === 0 || i === 2 || i === 8) {
      for (let j = 0; j < array[i].length; j++) {
        if ((j + 1) % 2 === 0) {
          array[i][j] = {type: i === 8 ? Chip.White : Chip.Black, queen: false};
        }
      }
    } else if (i === 1 || i === 7 || i === 9) {
      for (let j = 0; j < SIZE; j++) {
        if ((j + 1) % 2 !== 0)
          array[i][j] = {type: i === 1 ? Chip.Black : Chip.White, queen: false};
      }
    }
  }
  return array
}