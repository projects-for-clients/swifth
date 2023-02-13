import Header from '../../components/dashboard/Header';
import { ChangeEvent, FC, Fragment, useEffect, useState, useRef } from 'react';
import SelectDropDown from '../../components/utils/SelectDropDown';
import { GrClose } from 'react-icons/gr';

import {
  InProgressFilterBy,
  InProgress,
  Waitlist,
  INPROGRESS,
  InProgressView,
  WAITLIST,
  WaitlistView,
  ORDER_HISTORY,
} from '../../components/dashboard/OrdersData';
import CalenderSvg from '../../components/icons/Calender';

export type SortBy = 'Most Recent' | 'A-Z';
export type SwitchPath = 'all' | 'quoteRequests';
export type ShowDetails = {
  show: boolean;
  id?: number | null;
};

type waitlistFilterBy = 'Quote Sent' | 'Submitted';

export interface DropDownState {
  sortBy: boolean;
  filterBy: boolean;
}

function orders() {
  type SwitchPath = 'inProgress' | 'waitlist';
  const sortBy: SortBy[] = ['Most Recent', 'A-Z'];
  const InProgressFilters: InProgressFilterBy[] = [
    'Docs in Review',
    'Valuating',
    'Duty Processing',
    'Custom Releasing',
    'Delivery Pending',
    'Completed',
  ];

  const waitlistFilters: waitlistFilterBy[] = ['Quote Sent', 'Submitted'];

  const [inProgressFilteredBy, setInProgressFilteredBy] = useState('');
  const [waitlistFilterBy, setWaitlistFilterBy] = useState('');
  const [selectedSort, setSelectedSort] = useState<SortBy | string>(
    'Most Recent'
  );
  const [dropDownState, setDropDownState] = useState<DropDownState>({
    sortBy: false,
    filterBy: false,
  });

  const [currentPath, setCurrentPath] = useState<SwitchPath>('inProgress');
  const [search, setSearch] = useState('');
  const [searchDates, setSearchDates] = useState<Record<string, Date | null>>({
    from: null,
    to: null,
  });

  const [inProgressData, setInProgressData] = useState<InProgress[]>([]);
  const [waitlistData, setWaitlistData] = useState<Waitlist[]>(WAITLIST);
  const [orderHistory, setOrderHistory] = useState<InProgress[]>(ORDER_HISTORY);

  const pathToSwitch: Record<SwitchPath, JSX.Element> = {
    inProgress: <InProgressView inProgressData={inProgressData} />,
    waitlist: <WaitlistView waitlistData={waitlistData} />,
  };

  const [showCalendarIcon, setShowCalendarIcon] = useState({
    to: true,
    from: true,
  });

  const dateRef = useRef<HTMLInputElement>(null);

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
    if (inProgressFilteredBy && currentPath === 'inProgress') {
      const filtered = INPROGRESS.filter(
        (item) => item.tag === inProgressFilteredBy
      );

      return setInProgressData(() => [...filtered]);
    }

    if (waitlistFilterBy && currentPath === 'waitlist') {
      const filtered = WAITLIST.filter((item) => {
        return item.submitted === (waitlistFilterBy === 'Submitted');
      });

      return setWaitlistData(() => [...filtered]);
    }
  }, [inProgressFilteredBy, waitlistFilterBy]);

  useEffect(() => {
    if (selectedSort) {
      if ((selectedSort as SortBy) === 'A-Z') {
        const sortedNames = INPROGRESS.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });

        return setInProgressData(() => [...sortedNames]);
      } else if ((selectedSort as SortBy) === 'Most Recent') {
        const sortedDates = INPROGRESS.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        return setInProgressData(() => [...sortedDates]);
      }
    }
  }, [selectedSort]);

  useEffect(() => {
    const sortedDates = ORDER_HISTORY.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    setOrderHistory(() => [...sortedDates]);
  }, []);

  const handleClearFilter = (toClear: 'inProgress' | 'waitlist') => {
    if (toClear === 'inProgress') {
      setInProgressFilteredBy('');
      setDropDownState((prev) => ({ ...prev, filterBy: false }));
    } else {
      setWaitlistFilterBy('');
    }
  };

  const handleDateSearch = () => {
    const { from, to } = searchDates;

    if (from && to) {
      const filtered = ORDER_HISTORY.filter((item) => {
        const date = new Date(item.date);
        return (
          date.getTime() >= from.getTime() && date.getTime() <= to.getTime()
        );
      });

      console.log({ filtered });
      setOrderHistory(() => [...filtered]);
    }
  };

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleOpen = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  return (
    <>
      <Header title="Orders" />
      <dialog className="dialog relative text-[1.6rem]" ref={dialogRef}>
        <div className="bg-white fixed right-0 h-[100vh] w-[50rem] py-4 px-12">
          <input type="text" ref={dateRef} className="absolute top-0 w-0" />
          <figure className="flex justify-end">
            <img
              src="/icons/close.svg"
              alt=""
              className="w-[3rem] cursor-pointer"
              onClick={() => handleClose()}
            />
          </figure>

          <section className="h-full">
            <h3 className="text-[2.4rem] mb-4">Order history</h3>
            <div className="flex justify-between gap-8 items-center">
              <div className="grid gap-4 w-full">
                <label className="text-[1.4rem]">From</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Select Date"
                    className={`rounded-lg py-4 px-4 outline-none text-[1.6rem] w-full bg-color-purple-light-1 placeholder:text-color-purple-light border border-color-purple-light-2`}
                    name="fromDate"
                    id="fromDate"
                    onChange={(e) =>
                      setSearchDates((prev) => ({
                        ...prev,
                        from: new Date(e.target.value),
                      }))
                    }
                    onFocus={(e) => {
                      e.target.type = 'date';
                      e.target.min = new Date().toISOString().split('T')[0];
                      setShowCalendarIcon((prev) => ({ ...prev, from: false }));
                    }}
                  />
                  {showCalendarIcon.from && (
                    <span className="absolute right-4">
                      <CalenderSvg fill={'#9D8DCE'} />
                    </span>
                  )}
                </div>
              </div>
              <div className="grid gap-4 w-full">
                <label className="text-[1.4rem]">To</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    id="toDate"
                    placeholder="Select Date"
                    className={`rounded-lg py-4 px-4 outline-none text-[1.6rem] w-full bg-color-purple-light-1 placeholder:text-color-purple-light border border-color-purple-light-2 `}
                    name="toDate"
                    onChange={(e) =>
                      setSearchDates((prev) => ({
                        ...prev,
                        to: new Date(e.target.value),
                      }))
                    }
                    onFocus={(e) => {
                      e.target.type = 'date';
                      e.target.min = new Date().toISOString().split('T')[0];
                      setShowCalendarIcon((prev) => ({ ...prev, to: false }));
                    }}
                  />
                  {showCalendarIcon.to && (
                    <span className="absolute right-4">
                      <CalenderSvg fill={'#9D8DCE'} />
                    </span>
                  )}
                </div>
              </div>
              {searchDates.from && searchDates.to && (
                <span className="flex h-full mt-[3rem]">
                  <GrClose className="text-[1.4rem] cursor-pointer font-bold" />
                </span>
              )}
            </div>
            <button
              className="text-color-primary border border-color-primary rounded-lg w-full py-4 uppercase  mt-10 text-center disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleDateSearch}
              disabled={!searchDates.from || !searchDates.to}
            >
              Search
            </button>

            <div
              className="grid mt-[5rem] gap-10 max-h-[60vh] overflow-y-scroll"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(33rem, 1fr))',
              }}
            >
              {orderHistory.length > 0 ? (
                orderHistory.map((item, i) => {
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
                          className={`py-1.5 px-4 rounded-2xl text-white bg-[#40AD6B]`}
                        >
                          {tag}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="grid gap-2 justify-center justify-items-center">
                  <img
                    src="/icons/search-normal.svg"
                    alt=""
                    className="w-[3rem]"
                  />
                  <p className="text-[1.6rem] font-medium">No order found</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </dialog>
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
                <div
                  className="flex items-center bg-gray-100 border border-gray-300 py-3 px-8 rounded-xl gap-4 justify-center cursor-pointer w-[15rem]"
                  onClick={() => handleOpen()}
                >
                  <img
                    src="/icons/history.svg"
                    alt=""
                    className="w-[1.6rem] h-[1.6rem]"
                  />
                  <p>History</p>
                </div>
                <div className="flex items-center gap-8">
                  {currentPath === 'inProgress' && (
                    <SelectDropDown
                      selectFrom={sortBy}
                      selectedItem={selectedSort}
                      setSelectedItem={setSelectedSort}
                      label={'sortBy'}
                      setDropDownState={setDropDownState}
                      dropDownState={dropDownState}
                    />
                  )}
                  {currentPath === 'inProgress' ? (
                    <>
                      <SelectDropDown
                        selectFrom={InProgressFilters}
                        selectedItem={inProgressFilteredBy}
                        setSelectedItem={setInProgressFilteredBy}
                        isFilter
                        label={'filterBy'}
                        setDropDownState={setDropDownState}
                        dropDownState={dropDownState}
                      />
                      {inProgressFilteredBy && (
                        <GrClose
                          className="text-[1.4rem] cursor-pointer"
                          onClick={() => handleClearFilter('inProgress')}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <SelectDropDown
                        selectFrom={waitlistFilters}
                        selectedItem={waitlistFilterBy}
                        setSelectedItem={setWaitlistFilterBy}
                        isFilter
                      />
                      {waitlistFilterBy && (
                        <GrClose
                          className="text-[1.4rem] cursor-pointer"
                          onClick={() => handleClearFilter('waitlist')}
                        />
                      )}
                    </>
                  )}
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
