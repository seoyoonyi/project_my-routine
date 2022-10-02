import { useNavigate } from 'react-router-dom';
import { IDataType } from '../context/RoutineStateContext';

const RoutineItem = ({ id, title, content, date }: IDataType) => {
  const navigate = useNavigate();

  const strDate = new Date(date).toLocaleDateString();

  const openRoutine = () => {
    navigate(`/routine/${id}`);
  };

  return (
    <>
      <div className="routineItem" onClick={openRoutine}>
        <h3>{title}</h3>
        <p>{content}</p>
        <p>{strDate}</p>
      </div>
    </>
  );
};

export default RoutineItem;
