import Header from '../../components/dashboard/Header';
import { CiSearch } from 'react-icons/ci';

function orders() {
  return (
    <>
      <Header title="Orders" />

      <main>
        <section className="relative flex items-center">
          <input
            type="text"
            className="max-w-[45rem] border border-gray-200 rounded-md py-6 pr-3 pl-10"
            placeholder='search'
          />

          <CiSearch className='absolute left-3'/>
        </section>
      </main>
    </>
  );
}

export default orders;
