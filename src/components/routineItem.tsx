import { IDataType } from '../context/routineStateContext';

interface IRoutineItem extends IDataType {
  showModal: (item: IDataType) => void;
}

const RoutineItem = ({ id, title, content, date, showModal }: IRoutineItem) => {
  const strDate = new Date(date).toLocaleDateString();

  return (
    <>
      <div
        className="routineItem"
        onClick={() => {
          showModal({ id, title, content, date });
        }}
      >
        <h3>{title}</h3>
        <p>{content}</p>
        <p>{strDate}</p>
      </div>
    </>
  );
};

export default RoutineItem;
