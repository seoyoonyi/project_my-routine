import { createContext } from 'react';
export interface IDataType {
  id: number;
  title: string;
  content: string;
  date: string;
}

export interface IRoutineState extends Array<IDataType> {}

export const RoutineStateContext = createContext<IRoutineState | []>([]);
