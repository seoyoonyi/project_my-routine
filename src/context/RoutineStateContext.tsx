import { createContext } from 'react';

interface IRoutineState {
  routineSave: () => void;
  routineToggle: () => void;
  onAdd: boolean;
}

export const RoutineStateContext = createContext<IRoutineState | undefined>(
  undefined,
);
