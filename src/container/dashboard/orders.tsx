import Header from '../../components/dashboard/Header';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import SelectDropDown from '../../components/utils/SelectDropDown';

function orders() {
  type SwitchPath = 'inProgress' | 'waitlist';
  const sortBy = ['Most Recent', 'A-Z'] 
  const filters = ['Docs in Review', 'Valuating', 'Duty Processing', 'Custom Releasing', 'Delivery Pending', 'Completed']

  
  const [selectedSort, setSelectedSort] = useState('Most Recent');
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
            <label htmlFor="inProgress" className="capitalize text-[2rem]">
              In Progress
            </label>

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

          <div className="flex justify-between items-center mt-10">
            <div className="flex items-center bg-gray-100 border border-gray-300 py-3 px-8 rounded-xl gap-4 justify-center cursor-pointer w-[15rem]">
              <img
                src="/icons/history.svg"
                alt=""
                className="w-[1.6rem] h-[1.6rem]"
              />
              <p>History</p>
            </div>

            <div className="flex items-center gap-8">
              
                <SelectDropDown
                  selectFrom={sortBy}
                  selectedItem={selectedSort}
                  setSelectedItem={setSelectedSort}

                />
                <SelectDropDown
                  selectFrom={sortBy}
                  selectedItem={selectedSort}
                  setSelectedItem={setSelectedSort}

                />
              
              <img src="/icons/filter.svg" alt="" className="cursor-pointer" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default orders;
