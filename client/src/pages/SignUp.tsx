import { useCallback } from 'react';
import { Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import MainContainer from '../components/MainContainer';
import styles from './SingUp.module.css';
import Btn from '../components/Btn';
import {
	validateEmail,
	validateName,
	validatePW,
	validatePWCheck,
} from '../common/utils/validate-check';

const SignUp = () => {
	const [form] = Form.useForm();

	return (
		<>
			<Header />
			<MainContainer className={styles.signUpContainer}>
				<div className={styles.signUpForm}>
					<Form form={form}>
						<fieldset>
							<legend>회원가입</legend>
							<ul>
								<li>
									<p>이메일</p>
									<Form.Item
										name="id"
										className={styles.signUpFormItem}
										rules={[{ validator: validateEmail(useCallback) }]}
									>
										<Input className={styles.signUpBox} />
									</Form.Item>
								</li>
								<li>
									<p>비밀번호</p>
									<span className={styles.smallTxt}>
										영문/숫자/특수문자를 포함한 10자 이상의 비밀번호를 입력해주세요.
									</span>
									<Form.Item
										name="password"
										className={styles.signUpFormItem}
										rules={[{ validator: validatePW(useCallback) }]}
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
									<p>비밀번호 확인</p>
									<Form.Item
										className={styles.signUpFormItem}
										name="pwRe"
										dependencies={['password']}
										hasFeedback
										rules={[
											validatePWCheck.options,
											({ getFieldValue }) => ({
												validator(_, value) {
													return validatePWCheck.validate(getFieldValue, value);
												},
											}),
										]}
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
									<Form.Item
										className={styles.signUpFormItem}
										name="name"
										rules={[
											() => ({
												validator(_, value) {
													return validateName(value);
												},
											}),
										]}
									>
										<Input className={styles.signUpBox} />
									</Form.Item>
								</li>
							</ul>

							<Form.Item shouldUpdate>
								{() => (
									<Btn
										type="primary"
										htmlType="submit"
										size="large"
										className={styles.singUpBtn}
										disabled={
											!form.isFieldsTouched(true) ||
											!!form.getFieldsError().filter(({ errors }) => errors.length).length
										}
									>
										가입하기
									</Btn>
								)}
							</Form.Item>
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
