import Header from '../../components/dashboard/Header';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import SelectDropDown from '../../components/utils/SelectDropDown';
import dayjs from 'dayjs';

type FilterBy = 'Docs in Review' | 'Valuating' | 'Duty Processing' | 'Custom Releasing' | 'Delivery Pending' | 'Completed';
interface OrdersArr {
  id: number;
  name: string;
  description: string;
  date: Date
  tags: FilterBy;
}


const ORDERS:OrdersArr[] = [
  {
    id: 1,
    name: 'Jonathan Sunyi',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels and',
    date: dayjs().subtract(1, 'day').toDate(),
    tags: 'Docs in Review',
  },
  {
    id: 2,
    name: 'Akpan Sunyi',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels and',
    date: dayjs().subtract(12, 'day').toDate(),
    tags: 'Docs in Review',
  },
  {
    id: 3,
    name: 'Solomon Henry',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels and',
    date: dayjs().subtract(10, 'day').toDate(),
    tags: 'Docs in Review',
  },
  {
    id: 4,
    name: 'Joseph Isaac',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels and',
    date: dayjs().subtract(5, 'day').toDate(),
    tags: 'Docs in Review',
  },
 
];

function orders() {
  type SwitchPath = 'inProgress' | 'waitlist';
  const sortBy = ['Most Recent', 'A-Z'];
  const filters:FilterBy[] = [
    'Docs in Review',
    'Valuating',
    'Duty Processing',
    'Custom Releasing',
    'Delivery Pending',
    'Completed',
  ];

  const [filteredBy, setFilteredBy] = useState('Docs in Review');

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
                selectFrom={filters}
                selectedItem={filteredBy}
                setSelectedItem={setFilteredBy}
                isFilter
              />
            </div>

            <div>
              <div className="p-8 w-[22rem] bg-white rounded-3xl">
                <div>
                  <p className="text-[1.6rem]">Jonathan Sunyi</p>
                  <p className="text-[1.4rem] whitespace-nowrap text-ellipsis overflow-hidden text-gray-500">
                    Toyota Camry XLE, 2018 v6 with alloy wheels and
                  </p>
                </div>

                <p className="text-[1.2rem] flex justify-end pt-8">
                  <span className="bg-color-orange py-1 px-2 rounded-lg">
                    Docs in review
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default orders;
