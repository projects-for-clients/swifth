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
  tag: FilterBy;
}

interface FiltersProps {
  name: FilterBy;
  text: string;
  bg: string;
}
const filterByColors: Record<FilterBy, FiltersProps> = {
  'Docs in Review': {
    name: 'Docs in Review',
    text: 'text-[#182130]',
    bg: 'bg-[#FAC772]',
  },
  'Delivery Pending': {
    name: 'Delivery Pending',
    text: 'text-[#182130]',
    bg: 'bg-[#D3EE87]',
  },
  'Custom Releasing': {
    name: 'Custom Releasing',
    text: 'text-[#450C3C]',
    bg: 'bg-[#EDD7ED]',
  },
  'Duty Processing': {
    name: 'Duty Processing',
    text: 'text-[#120D23]',
    bg: 'bg-[#DED9EF]',
  },
  Valuating: { name: 'Valuating', text: 'text-[#182130]', bg: 'bg-[#FAC772]' },
  Completed: { name: 'Completed', text: 'text-[#ffffff]', bg: 'bg-[#40AD6B]' },
};

const ORDERS: OrdersArr[] = [
  {
    id: Math.random(),
    name: 'Jonathan Sunyi',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tag: 'Docs in Review',
  },
  {
    id: Math.random(),
    name: 'Akpan Sunyi',
    description: 'Lexus ES350, 2017 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tag: 'Duty Processing',
  },
  {
    id: Math.random(),
    name: 'Solomon Henry',
    description: 'Lexus RX350, 2017 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tag: 'Custom Releasing',
  },
  {
    id: Math.random(),
    name: 'Joseph Isaac',
    description: 'Mercedes GLE350, 2022 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tag: 'Delivery Pending',
  },
  {
    id: Math.random(),
    name: 'Jonathan Sunyi',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tag: 'Completed',
  },
  {
    id: Math.random(),
    name: 'Akpan Sunyi',
    description: 'Lexus ES350, 2017 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tag: 'Custom Releasing',
  },
  {
    id: Math.random(),
    name: 'Solomon Henry',
    description: 'Lexus RX350, 2017 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tag: 'Custom Releasing',
  },
  {
    id: Math.random(),
    name: 'Joseph Isaac',
    description: 'Mercedes GLE350, 2022 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tag: 'Delivery Pending',
  },
  {
    id: Math.random(),
    name: 'Jonathan Sunyi',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tag: 'Valuating',
  },
  {
    id: Math.random(),
    name: 'Akpan Sunyi',
    description: 'Lexus ES350, 2017 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tag: 'Delivery Pending',
  },
  {
    id: Math.random(),
    name: 'Solomon Henry',
    description: 'Lexus RX350, 2017 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tag: 'Custom Releasing',
  },
  {
    id: Math.random(),
    name: 'Joseph Isaac',
    description: 'Mercedes GLE350, 2022 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tag: 'Delivery Pending',
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
            <label htmlFor="inProgress" className="capitalize text-[1.8rem]">
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
            <label htmlFor="waitlist" className="capitalize text-[1.8rem]">
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
          </div>

          <div
            className="grid mt-[5rem] gap-10"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(33rem, 1fr))',
            }}
          >
            {ORDERS.map((item, i) => {
              const { name, description, date, tag } = item;

              return (
                <div
                  className="p-8 bg-white rounded-3xl border border-color-purple-light-2"
                  key={i}
                >
                  <div>
                    <p className="text-[1.6rem]">{name}</p>
                    <p className="text-[1.4rem] whitespace-nowrap text-ellipsis overflow-hidden text-gray-500">
                      {description}
                    </p>
                  </div>

                  <div className="text-[1.2rem] flex items-center justify-between pt-8">
                    <p className="text-gray-500">
                      {date.toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <p
                      className={`py-1.5 px-4 rounded-2xl ${filterByColors[tag].bg} ${filterByColors[tag].text}`}
                    >
                      Docs in review
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

export default orders;
