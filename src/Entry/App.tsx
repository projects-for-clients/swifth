import Header from '../components/Header';

const Hero = () => (
  <div className="hero">
    {/* <img src="/heroImg.svg" alt="heroImg" /> */}
    <h1>Manage Goods Clearing</h1>
  </div>
);

const App = () => {
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>
      <Hero />
    </div>
  );
};

export default App;
