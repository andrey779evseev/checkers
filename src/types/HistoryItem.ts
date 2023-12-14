import { Selected } from "./Selected.ts";
import { Position } from "./Position.ts";

export type HistoryItem = {from: Position, to: Position, beaten: Selected[]}