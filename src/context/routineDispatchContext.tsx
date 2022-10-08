import { createContext, Dispatch } from 'react';
import { ReducerAction } from '../App';

export interface IRoutineDispatch {
  routineSave: () => void;
  routineToggle: () => void;
  onAdd: boolean;
  memoizedDispatches: () => {
    onCreate: () => void;
    onRemove: () => void;
  };
}

export const RoutineDispatchContext = createContext<IRoutineDispatch>({
  routineSave() {},
  routineToggle() {},
  onAdd: false,
  memoizedDispatches: () => {
    return {
      onCreate() {},
      onRemove() {},
    };
  },
});

/* 

Dispatch<ReducerAction>
export interface IRoutineDispatch {
  routineSave: () => void;
  routineToggle: () => void;
  onAdd: boolean;
  onCreate: (title: string, content: string, date: string) => void;
  onRemove: (targetId: number) => void;
}

export const RoutineDispatchContext = createContext<IRoutineDispatch>({
  routineSave() {},
  routineToggle() {},
  onAdd: false,
  onCreate() {},
  onRemove() {},
});
 */
