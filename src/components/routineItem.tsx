import { IDataType } from '../context/routineStateContext';

const RoutineItem = ({ title, content }: IDataType) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default RoutineItem;
