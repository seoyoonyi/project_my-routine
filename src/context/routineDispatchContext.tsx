import { createContext } from 'react';

export interface IRoutineDispatch {
  routineSave: () => void;
  routineToggle: () => void;
  onAdd: boolean;
  memoizedDispatches: {
    onCreate: (title: string, content: string, date: string) => void;
    onRemove: (targetId: number) => void;
    onEdit: (id: number, title: string, content: string, date: string) => void;
  };
}

export const RoutineDispatchContext = createContext<IRoutineDispatch>({
  routineSave: () => {},
  routineToggle: () => {},
  onAdd: false,
  memoizedDispatches: {
    onCreate: () => {},
    onRemove: () => {},
    onEdit: () => {},
  },
});
