import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import MainContainer from '../components/MainContainer';
import styles from './NotFound.module.css';
import Btn from '../components/Btn';
import { AlertCircle } from 'lucide-react';

const NotFound = () => {
	const navigate = useNavigate();

	const goToHome = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		navigate('/');
	};
	return (
		<>
			<Header />
			<MainContainer className="text-center">
				<div className={styles.errorIconGroup}>
					<AlertCircle size={80} color="#37e2d5" />
					<h2 className={styles.errorIcon404}>404</h2>
				</div>

				<h2 className={styles.errorTit}>요청하신 페이지를 찾을 수 없습니다.</h2>
				<p className={styles.errorDesc}>불편을 드려 죄송합니다. 확인 후 다시 시도해주세요.</p>

				<Btn onClick={goToHome} className={styles.errorBtn} size="large">
					홈으로 가기
				</Btn>
			</MainContainer>
		</>
	);
};

export default NotFound;
