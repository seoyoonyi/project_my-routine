import { Link } from 'react-router-dom';
import Btn from '../components/Btn';
import FeaturesHome from '../components/FeaturesHome';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IntroMain from '../components/IntroMain';

const Intro = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="flex-grow">
        {/*  Page sections */}
        <IntroMain />
        <FeaturesHome />
        {/* <FeaturesBlocks />
        <Testimonials />
        <Newsletter /> */}
      </main>

      <Footer />
      {/* <h1>마이루틴 인트로페이지</h1>
<Btn>
  <Link to="/main">시작하기</Link>
</Btn> */}
    </div>
  );
};

export default Intro;
