import Header from '../../components/dashboard/Header';
import { CiSearch } from 'react-icons/ci';

function orders() {
  return (
    <>
      <Header title="Orders" />

      <main className="text-[1.6rem]">
        <section className="relative flex items-center w-[45rem] mx-auto">
          <input
            type="text"
            className=" border border-gray-300 py-6 pr-3 pl-[4rem] outline-none w-full rounded-3xl"
            placeholder="Search"
          />

          <img
            src="/icons/search-normal.svg"
            alt=""
            className="absolute left-6 text-[1.8rem]"
          />
        </section>

        <div>
          <div className="radioBox">
            <input
              type="radio"
              name="notification"
              id="all"
              className="hidden"
              // onChange={() => setCurrentPath('all')}
              // checked={currentPath === 'all'}
            />
            <label htmlFor="all">All</label>

            <input
              type="radio"
              name="notification"
              id="quoteRequests"
              className="hidden"
              // checked={currentPath === 'quoteRequests'}
              // onChange={() => setCurrentPath('quoteRequests')}
            />
            <label htmlFor="quoteRequests" className="capitalize">
              Quote Requests
            </label>
          </div>
        </div>
      </main>
    </>
  );
}

export default orders;
