import { Button } from 'antd';

interface IBtnProps {
	className?: string;
	onClick?: () => void;
	type?: 'text' | 'link' | 'ghost' | 'primary' | 'dashed';
	size?: 'large';
	children: React.ReactNode;
	htmlType?: 'button' | 'submit' | 'reset';
}

const Btn = ({ className, onClick, type, children, size, htmlType }: IBtnProps) => {
	return (
		<Button htmlType={htmlType} className={className} onClick={onClick} type={type} size={size}>
			{children}
		</Button>
	);
};

export default Btn;
