import Header from '../components/Header';
import Hero from '../components/Hero';
import Modal from '../components/Modal';
import Auth from '../container/Auth';

function Home() {

  return (
    <div className="app">
   
      <Header />

      <Hero /> 

      <Modal>
        <Auth />
      </Modal>
    </div>
  )
}

export default Home;
