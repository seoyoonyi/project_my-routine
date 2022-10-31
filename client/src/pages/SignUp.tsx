import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Form, Input } from 'antd';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import MainContainer from '../components/MainContainer';
import styles from './SingUp.module.css';
import Btn from '../components/Btn';

const SignUp = () => {
	return (
		<>
			<Header />
			<MainContainer className={styles.signUpContainer}>
				<div className={styles.signUpForm}>
					<Form>
						<fieldset>
							<legend>회원가입</legend>
							<ul>
								<li>
									<p>이메일</p>
									<Form.Item className={styles.signUpFormItem} name="id">
										<Input className={styles.signUpBox} />
									</Form.Item>
								</li>
								<li>
									<p>비밀번호</p>
									<span className={styles.smallTxt}>
										영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
									</span>
									<Form.Item className={styles.signUpFormItem} name="password" hasFeedback>
										<Input.Password
											className={styles.signUpBox}
											iconRender={(visible) =>
												visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
											}
										/>
									</Form.Item>
								</li>
								<li>
									<p>비밀번호 확인</p>
									<Form.Item
										className={styles.signUpFormItem}
										name="pwRe"
										dependencies={['password']}
										hasFeedback
									>
										<Input.Password
											className={styles.signUpBox}
											iconRender={(visible) =>
												visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
											}
										/>
									</Form.Item>
								</li>
								<li>
									<p>닉네임</p>
									<Form.Item className={styles.signUpFormItem} name="email">
										<Input className={styles.signUpBox} />
									</Form.Item>
								</li>
							</ul>

							<Btn type="primary" htmlType="submit" size="large" className={styles.nextBtn}>
								다음
							</Btn>
						</fieldset>
					</Form>
					<div className={styles.loginLink}>
						<p>이미 아이디가 있으신가요?&nbsp;</p>
						<Link to="/login">로그인</Link>
					</div>
				</div>
			</MainContainer>
		</>
	);
};

export default SignUp;
