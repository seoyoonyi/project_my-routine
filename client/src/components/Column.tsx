import { childrenType } from "../common/childrenType";

const Column = ({ children }: childrenType) => {
  return (
    <div className="max-w-6xl px-4 mx-auto md:max-w-5xl sm:px-6">
      {children}
    </div>
  );
};

export default Column;
