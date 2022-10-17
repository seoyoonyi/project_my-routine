import { Link } from 'react-router-dom';
import Btn from '../components/Btn';

const NotFound = () => {
  return (
    <>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <Btn>
        <Link to="/">Go to Home</Link>
      </Btn>
    </>
  );
};

export default NotFound;
