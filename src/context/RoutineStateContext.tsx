import { createContext } from 'react';
export interface IDataType {
  [key: string]: any;
}

export interface IRoutineState extends Array<IDataType> {}

export const RoutineStateContext = createContext<IRoutineState | []>([]);

//기존에 있던 타입들
/* export interface IDataType {
  id: number;
  title: string;
  content: string;
  date: string;
} */
