import { Input, Form, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import Btn from "../components/Btn";
import Header from "../components/Header";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <>
      <Header />

      <MainContainer className="bg-gray-100">
        <div className="w-[400px] md:w-[350px] sm:w-[300px] mx-auto ">
          <Form>
            <Form.Item name="id">
              <Input
                className={styles.loginBox}
                placeholder="아이디"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item name="pw">
              <Input.Password
                className={styles.loginBox}
                placeholder="비밀번호"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <div className="auto-login">
              <Checkbox>로그인 상태 유지</Checkbox>
            </div>

            {/* button에서 앤트디자인 버튼으로 바꿔서 호버시 버튼색상 꺠지니 scss 조절해주세요 */}

            <Btn type="primary" className="w-full rounded-md">
              로그인
            </Btn>
            <ul className="login-sub-menu">
              <li>
                <Link to="/">비밀번호 찾기</Link>
              </li>
              <li>
                <Link to="/signUp">회원가입</Link>
              </li>
            </ul>
          </Form>
        </div>
      </MainContainer>
    </>
  );
};

export default Login;
