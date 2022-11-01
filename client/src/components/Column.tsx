import { IChildrenType } from '../common/children-type';

const Column = ({ children }: IChildrenType) => {
	return <div className="max-w-6xl px-4 mx-auto md:max-w-5xl sm:px-6">{children}</div>;
};

export default Column;
