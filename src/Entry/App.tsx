import Header from '../components/Header';
import { GrFormClose } from 'react-icons/gr';
import SocialButtons from '../components/SocialButtons';
import { useRef } from 'react';

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
  const closeModal = () => {
    const dialog = document.querySelector('#authDialog') as any;

    dialog.close();
  };

  const openModal = () => {
    console.log('clicked');
    const dialog = document.querySelector('#authDialog') as any;
    dialog.showModal();
  };

  const handleSocialLogin = (user: any) => {
    console.log(user);
  };

  const handleSocialLoginFailure = (err: any) => {
    console.error(err);
  };

  const ref = useRef();

  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>

      <div className="app__hero">
        <Hero openModal={openModal} />
      </div>

      <dialog className="authDialog relative z-10" id="authDialog">
        <div
          className="authDialog__container"
          // onSubmit={handleSubmit}
        >

          <button className="authDialog__button ">
            <GrFormClose className="text-3xl " />
          </button>

          <SocialButtons/>


        </div>
      </dialog>
    </div>
  );
};

export default App;
