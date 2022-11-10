/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { Input, Form, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { validateEmail, validatePW } from '../common/utils/validate-check';
import { useAuth } from '../common/auth/Auth';
import alertInfo from '../common/utils/alert';
import MainContainer from '../components/MainContainer';
import api from '../service/api';
import Btn from '../components/Btn';
import Header from '../components/Header';
import styles from './Login.module.css';

type ErrorResponse = {
	message: string;
};

const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	const onFinish = async (values: any) => {
		const loginForm = {
			email: values.email,
			password: values.pw,
		};

		try {
			const response = await axios.post(`${api.users}/login`, loginForm);

			if (response.data.success === true) {
				// 브라우저 종료 후에도 로그인 유지하기 위함
				login(response.data.data.token);
				navigate('/');
			}
		} catch (error) {
			const err = error as AxiosError;

			alertInfo((err.response?.data as ErrorResponse).message, null, 'warning');
		}
	};

	return (
		<>
			<Header />
			<MainContainer className={styles.loginContainer}>
				<Form className={styles.loginForm} onFinish={onFinish}>
					<Form.Item
						name="email"
						rules={[{ validator: validateEmail(useCallback) }]}
						className={styles.loginFormItem}
					>
						<Input
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
							className={styles.loginBox}
							placeholder="비밀번호"
							iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
							required
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
