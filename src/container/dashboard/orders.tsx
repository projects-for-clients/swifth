import Header from '../../components/dashboard/Header';
import { ChangeEvent, FC, Fragment, useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import SelectDropDown from '../../components/utils/SelectDropDown';
import dayjs from 'dayjs';


export type SortBy = 'Most Recent' | 'A-Z'
type FilterBy =
  | 'Docs in Review'
  | 'Valuating'
  | 'Duty Processing'
  | 'Custom Releasing'
  | 'Delivery Pending'
  | 'Completed';
interface InProgress {
  id: number;
  name: string;
  description: string;
  date: Date;
  tag: FilterBy;
}
interface Waitlist {
  id: number;
  name: string;
  description: string;
  subDescription?: string;
  date: Date;
  submitted: boolean;
}

interface FiltersProps {
  text: string;
  bg: string;
}
const filterByColors: Record<FilterBy, FiltersProps> = {
  'Docs in Review': {
    text: 'text-[#182130]',
    bg: 'bg-[#FAC772]',
  },
  'Delivery Pending': {
    text: 'text-[#182130]',
    bg: 'bg-[#D3EE87]',
  },
  'Custom Releasing': {
    text: 'text-[#450C3C]',
    bg: 'bg-[#EDD7ED]',
  },
  'Duty Processing': {
    text: 'text-[#120D23]',
    bg: 'bg-[#DED9EF]',
  },
  Valuating: { text: 'text-[#182130]', bg: 'bg-[#FAC772]' },
  Completed: { text: 'text-[#ffffff]', bg: 'bg-[#40AD6B]' },
};

const INPROGRESS: InProgress[] = [
  {
    id: Math.random(),
    name: 'Jonathan Sunyi',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
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
    tag: 'Completed',
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
    tag: 'Docs in Review',
  },
  {
    id: Math.random(),
    name: 'Solomon Henry',
    description: 'Lexus RX350, 2017 v6 with alloy wheels and',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    tag: 'Valuating',
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

const WAITLIST: Waitlist[] = [
  {
    id: Math.random(),
    name: 'Jonathan Sunya',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    submitted: true,
  },
  {
    id: Math.random(),
    name: 'Robert Sunya',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    submitted: true,
  },
  {
    id: Math.random(),
    name: 'Tommy Yaun',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    subDescription: 'and 2 more',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    submitted: false,
  },
  {
    id: Math.random(),
    name: 'Daniel Okafor',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    submitted: true,
  },
  {
    id: Math.random(),
    name: 'Jonathan Sunya',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    submitted: true,
  },
  {
    id: Math.random(),
    name: 'Robert Sunya',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    submitted: true,
  },
  {
    id: Math.random(),
    name: 'Tommy Yaun',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    subDescription: 'and 2 more',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    submitted: false,
  },
  {
    id: Math.random(),
    name: 'Daniel Okafor',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    submitted: true,
  },
  {
    id: Math.random(),
    name: 'Jonathan Sunya',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    submitted: true,
  },
  {
    id: Math.random(),
    name: 'Robert Sunya',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    submitted: true,
  },
  {
    id: Math.random(),
    name: 'Tommy Yaun',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    subDescription: 'and 2 more',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    submitted: false,
  },
  {
    id: Math.random(),
    name: 'Daniel Okafor',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: dayjs()
      .subtract(Math.floor(Math.random() * 20), 'day')
      .toDate(),
    submitted: true,
  },
];

const InProgressView: FC<{ inProgressData: InProgress[] }> = ({
  inProgressData,
}) => (
  <div
    className="grid mt-[5rem] gap-10"
    style={{
      gridTemplateColumns: 'repeat(auto-fit, minmax(33rem, 1fr))',
    }}
  >
    {inProgressData.map((item, i) => {
      const { name, description, date, tag } = item;

      return (
        <div
          className="p-8 bg-white rounded-3xl border border-color-purple-light-2"
          key={i}
        >
          <div>
            <p className="text-[1.6rem]">{name}</p>
            <p className="text-[1.4rem] whitespace-nowrap text-ellipsis overflow-hidden text-gray-500 max-w-[20rem]">
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
              {tag}
            </p>
          </div>
        </div>
      );
    })}
  </div>
);
const WaitlistView: FC<{ waitlistData: Waitlist[] }> = ({ waitlistData }) => (
  <div
    className="grid mt-[5rem] gap-10"
    style={{
      gridTemplateColumns: 'repeat(auto-fit, minmax(40rem, 1fr))',
    }}
  >
    {waitlistData.map((item, i) => {
      const { name, description, date, submitted, subDescription } = item;

      return (
        <div
          className="p-8 bg-white rounded-3xl border border-color-purple-light-2 flex justify-between items-center"
          key={i}
        >
          <div>
            <p className="text-[1.6rem]">{name}</p>
            <p className="text-[1.4rem] whitespace-nowrap text-ellipsis overflow-hidden text-gray-500 flex max-w-[20rem]">
              {description}
              {subDescription && (
                <span className="text-gray-400">{subDescription}</span>
              )}
            </p>
          </div>

          <div className="text-[1.6rem] justify-between">
            {submitted ? (
              <span className="text-green-500 font-medium">
                Documents Submitted
              </span>
            ) : (
              <span className="text-[#BEB3DE] font-medium">Quote Sent</span>
            )}
            <p className="text-gray-500 text-[1.4rem]">
              {date.toLocaleString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      );
    })}
  </div>
);

function orders() {
  type SwitchPath = 'inProgress' | 'waitlist';
  const sortBy:SortBy[] = ['Most Recent', 'A-Z'];
  const filters: FilterBy[] = [
    'Docs in Review',
    'Valuating',
    'Duty Processing',
    'Custom Releasing',
    'Delivery Pending',
    'Completed',
  ];

  const [filteredBy, setFilteredBy] = useState('');
  const [selectedSort, setSelectedSort] = useState<SortBy>('Most Recent');
  const [currentPath, setCurrentPath] = useState<SwitchPath>('inProgress');
  const [search, setSearch] = useState('');

  const [inProgressData, setInProgressData] =
    useState<InProgress[]>(INPROGRESS);
  const [waitlistData, setWaitlistData] = useState<Waitlist[]>(WAITLIST);

  const pathToSwitch: Record<SwitchPath, JSX.Element> = {
    inProgress: <InProgressView inProgressData={inProgressData} />,
    waitlist: <WaitlistView waitlistData={waitlistData} />,
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);

    if (currentPath === 'inProgress') {
      const filtered = INPROGRESS.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setInProgressData(filtered);
    } else {
      const filtered = WAITLIST.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setWaitlistData(filtered);
    }
  };

  useEffect(() => {
    if (filteredBy && currentPath === 'inProgress') {
      const filtered = INPROGRESS.filter((item) => item.tag === filteredBy);
      setInProgressData(filtered);
    } else {
      setInProgressData(INPROGRESS);
    }
  }, [filteredBy]);

  useEffect(() => {
    if (selectedSort === 'Most' && currentPath === 'inProgress') {

    }
  }, [selectedSort]);

  return (
    <>
      <Header title="Orders" />

      <main className="text-[1.6rem]">
        <section className="relative flex items-center w-[45rem] mx-auto">
          <input
            type="text"
            className=" border border-gray-300 py-6 pr-3 pl-[4rem] outline-none w-full rounded-3xl"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
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

          {(currentPath === 'inProgress' && inProgressData.length < 1) ||
          (currentPath === 'waitlist' && waitlistData.length < 1) ? (
            <div className="grid place-content-center h-[70vh] text-center">
              <p>Nothing to Show here</p>
              <p className="text-gray-500 text-[1.4rem] max-w-[35rem]">
                {currentPath === 'inProgress' ? (
                  <span>
                    Orders initiated from the waiting list would appear here
                  </span>
                ) : (
                  <span>
                    Quotes sent, and customers ready for their clearing process
                    would appear here
                  </span>
                )}
              </p>
            </div>
          ) : (
            <Fragment>
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
              <>{pathToSwitch[currentPath]}</>
            </Fragment>
          )}
        </section>
      </main>
    </>
  );
}

export default orders;
