import Header from '../components/Header';

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
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>

      <div className="app__hero">
        <Hero />
      </div>
    </div>
  );
};

export default App;
