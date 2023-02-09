import Header from '../../components/dashboard/Header';
import { CiSearch } from 'react-icons/ci';
import { useState } from 'react';

function orders() {
  type SwitchPath = 'inProgress' | 'waitlist'

  const [currentPath, setCurrentPath] = useState<SwitchPath>('inProgress');

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

        <section>
          <div className="radioBox gap-16">
            <input
              type="radio"
              name="notification"
              id="inProgress"
              className="hidden"
              onChange={() => setCurrentPath('inProgress')}
              checked={currentPath === 'inProgress'}
            />
            <label htmlFor="inProgress" className='capitalize text-[2rem]'>In Progress</label>

            <input
              type="radio"
              name="notification"
              id="waitlist"
              className="hidden"
              checked={currentPath === 'waitlist'}
              onChange={() => setCurrentPath('waitlist')}
            />
            <label htmlFor="waitlist" className="capitalize text-[2rem]">
              Waitlist
            </label>
          </div>

          <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <img src="/icons/history.svg" alt="" />
          <p>History</p>
        </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default orders;
