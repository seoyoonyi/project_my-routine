import { childrenType } from "../common/childrenType";
import Column from "./Column";

const MainContainer = ({ children, className }: childrenType) => {
  return (
    <div className={className}>
      <Column>
        <div className="w-3/4 pt-[200px] pb-12 mx-auto md:pt-[190px] md:pb-20">
          {children}
        </div>
      </Column>
    </div>
  );
};

export default MainContainer;
