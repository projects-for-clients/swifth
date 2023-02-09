import Header from '../../components/dashboard/Header';
import {CiSearch} from 'react-icons/ci';

function orders() {
  return (
    <>
      <Header title="Orders" />

      <main>
            <section className='relative'>
              <input type="text" />

              <CiSearch/>
            </section>
      </main>
    </>
  );
}

export default orders