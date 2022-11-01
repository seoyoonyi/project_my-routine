import { useCallback } from 'react';
import { Input, Form, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { validateID, validatePW } from '../common/validate-check';
import TokenStorage from '../common/token';
import MainContainer from '../components/MainContainer';
import Btn from '../components/Btn';
import Header from '../components/Header';
import styles from './Login.module.css';
import axios, { AxiosError } from 'axios';
import useInput from '../common/useInput';

const Login = () => {
	const [email, handleEmail] = useInput<string>('');
	const [password, handlePassword] = useInput<string>('');
	const handleLogin = useCallback(async () => {
		try {
			const response = await axios.post('http://localhost:8000/user/login', {
				email,
				password,
			});
			console.log(response.data);
		} catch (error) {
			const err = error as AxiosError;
			throw new Error(err.message);
		}
	}, [email, password]);

	return (
		<>
			<Header />
			<MainContainer className={styles.loginContainer}>
				<Form className={styles.loginForm} onFinish={handleLogin}>
					<Form.Item name="id" className={styles.loginFormItem}>
						<Input
							value={email}
							onChange={handleEmail}
							className={styles.loginBox}
							placeholder="이메일"
							prefix={<UserOutlined />}
						/>
					</Form.Item>
					<Form.Item name="pw" className={styles.loginFormItem}>
						<Input.Password
							value={password}
							onChange={handlePassword}
							className={styles.loginBox}
							placeholder="비밀번호"
							iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
						/>
					</Form.Item>
					<div className={styles.autoLogin}>
						<Checkbox>로그인 상태 유지</Checkbox>
					</div>
					<Btn type="primary" size="large" className={styles.loginBtn} htmlType="submit">
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
