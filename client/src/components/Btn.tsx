import { Button } from 'antd';

interface IBtnProps {
	className?: string;
	onClick?: () => void;
	type?: 'text' | 'link' | 'ghost' | 'primary' | 'dashed';
	size?: 'large';
	children: React.ReactNode;
}

const Btn = ({ className, onClick, type, children, size }: IBtnProps) => {
	return (
		<Button className={className} onClick={onClick} type={type} size={size}>
			{children}
		</Button>
	);
};

export default Btn;
