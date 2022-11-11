import { Button } from 'antd';
import styles from './Btn.module.css';
interface IBtnProps {
	className?: string;
	onClick?: () => void;
	type?: 'text' | 'link' | 'ghost' | 'primary' | 'dashed';
	size?: 'large';
	children: React.ReactNode;
	htmlType?: 'button' | 'submit' | 'reset';
	disabled?: true | false;
}

const Btn = ({ className = styles.btnStyle, onClick, type, children, size, htmlType, disabled }: IBtnProps) => {
	return (
		<Button htmlType={htmlType} className={className} onClick={onClick} type={type} size={size} disabled={disabled}>
			{children}
		</Button>
	);
};

export default Btn;
