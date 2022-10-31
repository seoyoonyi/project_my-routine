import { Input, Form, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import MainContainer from '../components/MainContainer';
import Btn from '../components/Btn';
import Header from '../components/Header';
import styles from './Login.module.css';

const Login = () => {
	return (
		<>
			<Header />

			<MainContainer className={styles.loginContainer}>
				<Form className={styles.loginForm}>
					<Form.Item name="id" className={styles.loginFormItem}>
						<Input className={styles.loginBox} placeholder="아이디" prefix={<UserOutlined />} />
					</Form.Item>
					<Form.Item name="pw" className={styles.loginFormItem}>
						<Input.Password
							className={styles.loginBox}
							placeholder="비밀번호"
							iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
						/>
					</Form.Item>
					<div className={styles.autoLogin}>
						<Checkbox>로그인 상태 유지</Checkbox>
					</div>

					<Btn type="primary" size="large" className={styles.loginBtn}>
						로그인
					</Btn>
					<ul className={styles.loginSubMenu}>
						<li>
							<Link to="/">비밀번호 찾기</Link>
						</li>
						<li>
							<Link to="/signup">회원가입</Link>
						</li>
					</ul>
				</Form>
			</MainContainer>
		</>
	);
};

export default Login;
