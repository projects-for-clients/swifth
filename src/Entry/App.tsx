import Header from '../components/Header';
import { GrFormClose } from 'react-icons/gr';

const Hero = () => (
  <div className="hero">
    {/* <img src="/heroImg.svg" alt="heroImg" /> */}
    <h1 className="hero__header">Manage Goods Clearing</h1>
    <p className="hero__text">
      Easily manage the process of clearing your goods with your clearing agents
    </p>
    <div className="btn hero__btn">
      <button>Get Started</button>
    </div>
  </div>
);

const App = () => {
  const closeModal = () => {
    const dialog = document.querySelector('#registerDialog') as any;

    dialog.close();
  };

  const openModal = () => {
    const dialog = document.querySelector('#registerDialog') as any;
    dialog.showModal();
  };

  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>

      <div className="app__hero">
        <Hero />
      </div>

      <dialog className="registerDialog relative" id="registerDialog">
        <div
          id="makeDepositForm"
          className="bg-white shadow-md w-full md:(w-3/5 mx-auto) rounded pb-8 md:(px-8 m-2) mb-4  grid  justify-center"
          // onSubmit={handleSubmit}
        >
          <button className="bg-orange-300 text-[#1a1a2d] rounded absolute">
            <GrFormClose className="text-3xl " />
          </button>

          <form className="grid my-2 justify-center w-full text-black justify-items-center">
            <input type="text" />
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default App;
