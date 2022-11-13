import { Button } from 'antd';
import styles from './Btn.module.css';
interface IBtnProps {
	className?: string;
	value?: string;
	onClick?: (e?: any) => void;
	type?: 'text' | 'link' | 'ghost' | 'primary' | 'dashed';
	size?: 'large';
	children: React.ReactNode;
	htmlType?: 'button' | 'submit' | 'reset';
	disabled?: true | false;
}

const Btn = ({ className = styles.btnStyle, value, onClick, type, children, size, htmlType, disabled }: IBtnProps) => {
	return (
		<Button htmlType={htmlType} className={className} value={value} onClick={onClick} type={type} size={size} disabled={disabled}>
			{children}
		</Button>
	);
};

export default Btn;
