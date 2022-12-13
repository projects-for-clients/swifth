interface IHero {
  openModal: () => void;
}
const Hero = ({ openModal }: IHero) => (
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

export default Hero