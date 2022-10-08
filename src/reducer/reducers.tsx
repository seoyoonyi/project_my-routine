interface ReducerState {
  id: number;
  title: string;
  content: string;
  date: string;
}

const initialState: ReducerState = {
  id: 0,
  title: '',
  content: '',
  date: '',
};

export const SET_CREATE = 'SET_CREATE' as const;

interface ICreateAction {
  type: typeof SET_CREATE;
  data: {
    id: number;
    title: string;
    content: string;
    date: string;
  };
}

type ReducerAction = ICreateAction;

const setCreate = (id: number, title: string, content: string, date: string): ICreateAction => {
  return { type: SET_CREATE, data: { id, title, content, date } };
};

const reducer = (state: ReducerState = initialState, action: ReducerAction) => {
  switch (action.type) {
    case SET_CREATE: {
      const created_date = new Date().getTime();
      const newItem = { ...action.data, created_date };
      return { newItem, ...state };
    }
    // case 'REMOVE': {
    //   return state.filter((it) => it.id !== action.targetId);
    // }
    default:
      return state;
  }
};
