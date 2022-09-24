import { useNavigate } from 'react-router-dom';
import { IDataType } from '../context/routineStateContext';

const RoutineItem = ({ title, content, date }: IDataType) => {
  const navigate = useNavigate();

  return (
    <div className="routineItem">
      <h3>{title}</h3>
      <p>{content}</p>
      <p>{date}</p>
    </div>
  );
};

export default RoutineItem;
