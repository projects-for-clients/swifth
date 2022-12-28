import { useAppDispatch } from '../store/app/hooks';
import { open } from '../store/features/modal';

const Hero = () => {
  const dispatch = useAppDispatch();

  const openModal = () => dispatch(open('signup'));

  return (
    <div className="hero">
      <div className="hero__container">
        <h1 className="hero__header">Manage Goods Clearing</h1>
        <p className="hero__text">
          Easily manage the process of clearing your goods with your clearing
          agents
        </p>
        <div className="btn hero__btn" onClick={openModal}>
          <button>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
