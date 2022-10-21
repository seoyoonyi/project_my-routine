import FeaturesHome from '../components/FeaturesHome';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IntroMain from '../components/IntroMain';

const Intro = () => {
	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			<Header />

			<main className="flex-grow">
				<IntroMain />
				<FeaturesHome />
			</main>

			<Footer />
		</div>
	);
};

export default Intro;
