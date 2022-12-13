import Header from '../components/Header';
import { GrFormClose } from 'react-icons/gr';
import FirstAuthStep from '../components/AuthSteps/FirstStep';
import SecondAuthStep from '../components/AuthSteps/SecondStep';
import { useState } from 'react';
import ThirdAuthStep from '../components/AuthSteps/ThirdStep';

interface IHero {
  openModal: () => void;
}

const Hero = ({ openModal }: IHero) => (
  <div className="hero">
    <h1 className="hero__header">Manage Goods Clearing</h1>
    <p className="hero__text">
      Easily manage the process of clearing your goods with your clearing agents
    </p>
    <div className="btn hero__btn" onClick={openModal}>
      <button>Get Started</button>
    </div>
  </div>
);

const App = () => {
  const [step, setStep] = useState(0);

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  // const openModal = () => {
  //   setIsOpen(true);
  // };

  

  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>

      <div className="app__hero">
        {/* <Hero openModal={openModal} /> */}
      </div>

      
    </div>
  );
};

export default App;
