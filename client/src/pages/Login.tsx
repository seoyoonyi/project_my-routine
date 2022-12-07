import { useEffect, useState } from "react";
import { Input, Form, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useAuth } from "../common/auth/Auth";
import alertInfo from "../common/utils/alert";
import MainContainer from "../components/MainContainer";
import api from "../service/api";
import Btn from "../components/Btn";
import Header from "../components/Header";
import styles from "./Login.module.css";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

type ErrorResponse = {
  message: string;
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [checked, setChecked] = useState(false);

  const onChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    const loginForm = {
      email: values.email,
      password: values.pw,
      haskeepLogin: checked,
    };

    try {
      const response = await axios.post(`${api.users}/login`, loginForm);
      const {
        data: { data, success },
      } = response;
      if (success) {
        // 브라우저 종료 후에도 로그인 유지하기 위함
        login({ id: data.id, token: data.token });
        navigate("/");
      }
    } catch (error) {
      const err = error as AxiosError;

      alertInfo((err.response?.data as ErrorResponse).message, null, "warning");
    }
  };

  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <>
      <Header />

      <MainContainer className={styles.loginContainer}>
        <Form
          form={form}
          className={styles.loginForm}
          onFinish={onFinish}
          onFieldsChange={() => {
            setIsDirty(form.isFieldsTouched()); // 필드가 하나라도 터치(작동)되었다면 form에 변화가 있다고 판단
            const hasError = form
              .getFieldsError()
              .some(({ errors }) => errors.length); // 필드별 에러 메시지가 하나라도 존재하는지 확인
            setIsValid(!hasError); // 에러 메시지가 하나도 없으면 form이 유효하다고 판단
          }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "이메일을 입력해주세요." }]}
            className={styles.loginFormItem}
            hasFeedback
          >
            <Input className={styles.loginBox} placeholder="이메일" required />
          </Form.Item>

          <Form.Item
            name="pw"
            rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
            className={styles.loginFormItem}
            hasFeedback
          >
            <Input.Password
              className={styles.loginBox}
              placeholder="비밀번호"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              required
            />
          </Form.Item>
          <div className={styles.autoLogin}>
            <Checkbox checked={checked} onChange={onChange}>
              로그인 상태 유지
            </Checkbox>
          </div>

          <Form.Item shouldUpdate>
            {() => (
              <Btn
                type="primary"
                htmlType="submit"
                size="large"
                className={styles.loginBtn}
                disabled={!isDirty || !isValid}
              >
                로그인
              </Btn>
            )}
          </Form.Item>
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
