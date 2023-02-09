import Header from '../../components/dashboard/Header';
import { CiSearch } from 'react-icons/ci';

function orders() {
  return (
    <>
      <Header title="Orders" />

      <main>
        <section className="relative">
          <input type="text" className='max-w-[45rem] border border-gray-200' />

          <CiSearch />
        </section>
      </main>
    </>
  );
}

export default orders;
