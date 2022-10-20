import { Button } from 'antd';

interface IBtnProps {
	className?: string;
	onClick?: () => void;
	type?: 'text' | 'link' | 'ghost' | 'primary' | 'dashed';
	children: React.ReactNode;
}

const Btn = ({ className, onClick, type, children }: IBtnProps) => {
	return (
		<Button className={className} onClick={onClick} type={type}>
			{children}
		</Button>
	);
};

export default Btn;
