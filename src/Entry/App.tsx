import Header from '../components/Header';
import { GrFormClose } from 'react-icons/gr';
import SocialButtons from '../components/AuthSteps/FirstAuthStep';
import FirstAuthStep from '../components/AuthSteps/SecondAuthStep';
import { useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  };


  const authSteps = () => {

    switch(step){
      case 0: return <SocialButtons setStep={setStep} />;

      case 1: return <FirstAuthStep/>

      default: return 'hello'
    }
  }



  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>

      <div className="app__hero">
        <Hero openModal={openModal} />
      </div>

      {isOpen && (
        <div className="authDialog relative z-10 " id="authDialog">
          <div
            className="authDialog__container"
            // onSubmit={handleSubmit}
          >
            <button className="authDialog__button" onClick={closeModal}>
              <GrFormClose className="text-3xl " />
            </button>

            {authSteps()}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
