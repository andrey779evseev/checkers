import { ICell } from "../types/interfaces/ICell.ts";
import { Position } from "../types/Position.ts";

export function getDiagonalValues(matrix: ICell[][], x: number, y: number): Position[][] {
  const matrixSize = matrix.length;

  const isValidCoordinate = (row: number, col: number): boolean => {
    return row >= 0 && row < matrixSize && col >= 0 && col < matrixSize;
  }

  const getDiagonal = (startX: number, startY: number, rowIncrement: number, colIncrement: number) => {
    let row = startX + rowIncrement;
    let col = startY + colIncrement;
    const arr = []
    while (isValidCoordinate(row, col)) {
      arr.push([row, col]);
      row += rowIncrement;
      col += colIncrement;
    }
    return arr as Position[]
  }

  return [
    getDiagonal(x, y, -1, -1),
    getDiagonal(x, y, 1, 1),
    getDiagonal(x, y, 1, -1),
    getDiagonal(x, y, -1, 1)
  ];
}