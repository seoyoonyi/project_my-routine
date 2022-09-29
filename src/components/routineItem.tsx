import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IDataType } from '../context/RoutineStateContext';
import Routine from '../pages/routine';

const RoutineItem = ({ id, title, content, date }: IDataType) => {
  const [onRoutine, setOnRoutine] = useState(false);
  const navigate = useNavigate();

  const strDate = new Date(date).toLocaleDateString();

  const openRoutine = () => {
    setOnRoutine(true);
    navigate(`/routine/${id}`);
  };

  const closeRoutine = () => {
    setOnRoutine(false);
    navigate('/', { replace: true });
  };

  return (
    <>
      <div className="routineItem" onClick={openRoutine}>
        <h3>{title}</h3>
        <p>{content}</p>
        <p>{strDate}</p>
      </div>
      {onRoutine === true ? <Routine closeRoutine={closeRoutine} /> : null}
    </>
  );
};

export default RoutineItem;
