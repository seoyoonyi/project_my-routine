import { createContext } from 'react';

interface IRoutineDispatch {
  routineSave: () => void;
  routineToggle: () => void;
  onAdd: boolean;
  onCreate: (title: string, content: string, date: string) => void;
}

export const RoutineDispatchContext = createContext<IRoutineDispatch>({
  routineSave() {},
  routineToggle() {},
  onAdd: false,
  onCreate() {},
});
