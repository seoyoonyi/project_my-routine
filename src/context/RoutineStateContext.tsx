import { createContext } from 'react';
export interface IDataType {
  title: string;
  content: string;
  id: number;
  date: string;
}

export interface IRoutineState extends Array<IDataType> {}

export const RoutineStateContext = createContext<IRoutineState | []>([]);
