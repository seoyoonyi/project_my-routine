import { IChildrenType } from '../common/type/type';
import Column from './Column';

const MainContainer = ({ children, className }: IChildrenType) => {
	return (
		<div className={className}>
			<Column>
				<div className="w-3/4 pt-[170px] pb-12 mx-auto ">{children}</div>
			</Column>
		</div>
	);
};

export default MainContainer;
