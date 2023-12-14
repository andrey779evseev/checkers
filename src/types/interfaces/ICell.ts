import { Chip } from "../enums/Chip.ts";

export interface ICell {
  type: Chip | null
  queen: boolean
}