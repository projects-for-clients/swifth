import Header from '../../components/dashboard/Header';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import SelectDropDown from '../../components/utils/SelectDropDown';
import dayjs from 'dayjs';

type FilterBy =
  | 'Docs in Review'
  | 'Valuating'
  | 'Duty Processing'
  | 'Custom Releasing'
  | 'Delivery Pending'
  | 'Completed';
interface OrdersArr {
  id: number;
  name: string;
  description: string;
  date: Date;
  tags: FilterBy;
}

interface FiltersProps {

}
const filterByColors = [
{name: 'Docs in Review', text: 'bg-[#F9F9F9]', background: 'bg-[#F9F9F9]'},
];

//if

const ORDERS: OrdersArr[] = [
  {
    id: Math.random(),
    name: 'Jonathan Sunyi',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tags: 'Docs in Review',
  },
  {
    id: Math.random(),
    name: 'Akpan Sunyi',
    description: 'Lexus ES350, 2017 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tags: 'Duty Processing',
  },
  {
    id: Math.random(),
    name: 'Solomon Henry',
    description: 'Lexus RX350, 2017 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tags: 'Custom Releasing',
  },
  {
    id: Math.random(),
    name: 'Joseph Isaac',
    description: 'Mercedes GLE350, 2022 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tags: 'Delivery Pending',
  },
  {
    id: Math.random(),
    name: 'Jonathan Sunyi',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tags: 'Completed',
  },
  {
    id: Math.random(),
    name: 'Akpan Sunyi',
    description: 'Lexus ES350, 2017 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tags: 'Custom Releasing',
  },
  {
    id: Math.random(),
    name: 'Solomon Henry',
    description: 'Lexus RX350, 2017 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tags: 'Custom Releasing',
  },
  {
    id: Math.random(),
    name: 'Joseph Isaac',
    description: 'Mercedes GLE350, 2022 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tags: 'Delivery Pending',
  },
  {
    id: Math.random(),
    name: 'Jonathan Sunyi',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tags: 'Valuating',
  },
  {
    id: Math.random(),
    name: 'Akpan Sunyi',
    description: 'Lexus ES350, 2017 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tags: 'Delivery Pending',
  },
  {
    id: Math.random(),
    name: 'Solomon Henry',
    description: 'Lexus RX350, 2017 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tags: 'Custom Releasing',
  },
  {
    id: Math.random(),
    name: 'Joseph Isaac',
    description: 'Mercedes GLE350, 2022 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tags: 'Delivery Pending',
  },
];

function orders() {
  type SwitchPath = 'inProgress' | 'waitlist';
  const sortBy = ['Most Recent', 'A-Z'];
  const filters: FilterBy[] = [
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
            {/* {if item.name === filterByColors.name? bg-[filterByColrs.bg] text-[filterByColors.text] : ''} */}

              <div className="p-8 bg-white rounded-3xl border border-gray-400">
                <div>
                  <p className="text-[1.6rem]">Jonathan Sunyi</p>
                  <p className="text-[1.4rem] whitespace-nowrap text-ellipsis overflow-hidden text-gray-500">
                    Toyota Camry XLE, 2018 v6 with alloy wheels and
                  </p>
                </div>

                <div className="text-[1.2rem] flex justify-end pt-8"></div>
                <p>
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
