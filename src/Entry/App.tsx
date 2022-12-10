import Header from '../components/Header';


const Hero = () => (
  <div className='hero'>
    Hero

    <img src="/heroImg.svg" alt="heroImg" />
  </div>
)

const App = () => {
  return (
    <div className='app'>
      <Header/>
      <Hero/>
    </div>
  );
};

export default App;
