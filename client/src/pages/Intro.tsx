import { Link } from 'react-router-dom';
import Btn from '../components/Btn';

const Intro = () => {
  return (
    <>
      <h1>마이루틴 인트로페이지</h1>
      <Btn>
        <Link to="/main">시작하기</Link>
      </Btn>
    </>
  );
};

export default Intro;
