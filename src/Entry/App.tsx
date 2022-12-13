import Header from '../components/Header';
import { GrFormClose } from 'react-icons/gr';

import { useState } from 'react';
import Auth from '../container/Auth';
import Hero from '../components/Hero';



const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <
    <div className="app">
      <Header />

      <Hero openModal={openModal} />

      {isOpen && (
        <div className="authDialog relative z-10 " id="authDialog">
          <div
            className="authDialog__container"
            // onSubmit={handleSubmit}
          >
            <button className="authDialog__button" onClick={closeModal}>
              <GrFormClose className="text-3xl " />
            </button>

            <Auth />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
