import { IRoutine } from "../pages/Main";
import { IRoutineListProps } from "./RoutineList";

interface IRoutineItemProps extends IRoutineListProps {
  showModal: () => void;
}

const RoutineItem = ({
  title,
  content,
  date,
  showModal,
}: IRoutineItemProps) => {
  return (
    <>
      <div
        className="routineItem w-9/12 h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3"
        onClick={() => {
          showModal();
        }}
      >
        <h3>{title}</h3>
        <p>{content}</p>
        <p>{date}</p>
      </div>
    </>
  );
};

export default RoutineItem;
