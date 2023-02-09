import Header from '../../components/dashboard/Header';
import { CiSearch } from 'react-icons/ci';

function orders() {
  return (
    <>
      <Header title="Orders" />

      <main className='text-[1.6rem]'>
        <section className="relative flex items-center max-w-[45rem]">
          <input
            type="text"
            className=" border border-gray-200 rounded-md py-6 pr-3 pl-10 outline-none"
            placeholder="search"
          />

          <CiSearch className="absolute left-3 text-[1.8rem]" />
        </section>
      </main>
    </>
  );
}

export default orders;
