import Header from '../components/Header';
import { GrFormClose } from 'react-icons/gr';

import { useState } from 'react';
import Auth from '../container/Auth'

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

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  

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

            <Auth/>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
