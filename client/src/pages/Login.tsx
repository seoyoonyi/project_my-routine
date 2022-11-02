/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { Input, Form, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { validateEmail, validatePW } from '../common/validate-check';
// import alertInfo, { timer } from '../common/alert';
import TokenStorage from '../common/token';
import MainContainer from '../components/MainContainer';
import useInput from '../common/useInput';
import api from '../service/api';
import Btn from '../components/Btn';
import Header from '../components/Header';
import styles from './Login.module.css';

const Login = () => {
	const [email, handleEmail] = useInput<string>('');
	const [password, handlePassword] = useInput<string>('');
	const tokenStorage = new TokenStorage();

	const handleLogin = useCallback(async () => {
		try {
			const response = await axios.post(`${api.users}/login`, {
				email,
				password,
			});

			if (response.data.success === true) {
				// 브라우저 종료 후에도 로그인 유지하기 위함
				tokenStorage.saveToken(response.data.data.token);
				console.log('성공');
			}
			/* else {
					alertInfo(e.message, null, 'warning');
				} */
		} catch (error) {
			const err = error as AxiosError;
			throw new Error(err.message);
		}
	}, [email, password, tokenStorage]);

	return (
		<>
			<Header />
			<MainContainer className={styles.loginContainer}>
				<Form className={styles.loginForm}>
					<Form.Item
						name="email"
						rules={[{ validator: validateEmail(useCallback) }]}
						className={styles.loginFormItem}
					>
						<Input
							value={email}
							onChange={handleEmail}
							className={styles.loginBox}
							placeholder="이메일"
							prefix={<UserOutlined />}
							required
						/>
					</Form.Item>
					<Form.Item
						name="pw"
						rules={[{ validator: validatePW(useCallback) }]}
						className={styles.loginFormItem}
					>
						<Input.Password
							value={password}
							onChange={handlePassword}
							className={styles.loginBox}
							placeholder="비밀번호"
							iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
							required
						/>
					</Form.Item>
					<div className={styles.autoLogin}>
						<Checkbox>로그인 상태 유지</Checkbox>
					</div>
					<Btn
						type="primary"
						size="large"
						className={styles.loginBtn}
						htmlType="submit"
						onClick={handleLogin}
					>
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
