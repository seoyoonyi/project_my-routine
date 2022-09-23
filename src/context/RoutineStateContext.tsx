import { createContext } from 'react';
export interface IDataType {
  title: string;
  content: string;
  id: number;
}

export interface IRoutineState extends Array<IDataType> {}

export const RoutineStateContext = createContext<IRoutineState | []>([]);
