import { Link, Outlet, useLocation } from 'react-router-dom';
import { IDataType } from '../context/RoutineStateContext';

const RoutineItem = ({ id, title, content, date }: IDataType) => {
  const location = useLocation();
  const strDate = new Date(date).toLocaleDateString();

  return (
    <Link to="/routine" state={{ background: location }}>
      <div className="routineItem">
        <h3>{title}</h3>
        <p>{content}</p>
        <p>{strDate}</p>
      </div>
      <Outlet />
    </Link>
  );
};

export default RoutineItem;
