import Header from '../components/dashboard/Header';
import { ChangeEvent, Fragment, useEffect, useState, useRef } from 'react';
import SelectDropDown from '../components/utils/SelectDropDown';
import { GrClose } from 'react-icons/gr';

import {
  InProgressFilterBy,
  InProgress,
  Waitlist,
  INPROGRESS,
  InProgressView,
  WAITLIST,
  WaitlistView,
} from '../container/order/OrdersData';
import {
  ListOrderHistory,
  OrderHistoryDetail,
} from '../container/order/OrderHistory';
import EachOrderDetail from '../container/order/AgentOrderDetail/AgentOrderDetail';
import DeliveryHistory from '../container/delivery/deliveryHistory';

export type OrderHistoryPath = {
  path: 'list' | 'detail';
  id?: number | null;
};

export type DialogType = 'orderHistory' | 'eachOrder' | 'waitlist';

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
  const [orderHistoryPath, setOrderHistoryPath] = useState<OrderHistoryPath>({
    path: 'list',
  });
  const [search, setSearch] = useState('');

  const [inProgressData, setInProgressData] = useState<InProgress[]>([]);
  const [waitlistData, setWaitlistData] = useState<Waitlist[]>(WAITLIST);
  const [waitlistItemDetails, setWaitlistItemDetails] =
    useState<Waitlist | null>(null);
  const [OrderDetail, setOrderDetail] = useState<InProgress>(null as any);

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
        const sortedNames = [...INPROGRESS].sort((a, b) => {
          return a.name.localeCompare(b.name);
        });

        return setInProgressData(() => [...sortedNames]);
      } else if ((selectedSort as SortBy) === 'Most Recent') {
        const sortedDates = [...INPROGRESS].sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        return setInProgressData(() => [...sortedDates]);
      }
    }
  }, [selectedSort]);

  const handleClearFilter = (toClear: 'inProgress' | 'waitlist') => {
    if (toClear === 'inProgress') {
      setInProgressFilteredBy('');
      setDropDownState((prev) => ({ ...prev, filterBy: false }));
    } else {
      setWaitlistFilterBy('');
    }
  };

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const eachOrderDialogRef = useRef<HTMLDialogElement | null>(null);

  const waitListDialogRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseDialog = (type: DialogType): void => {
    if (type === 'orderHistory' && dialogRef.current) {
      dialogRef.current.close();
    }

    if (type === 'eachOrder' && eachOrderDialogRef.current) {
      eachOrderDialogRef.current.close();
    }

    if (type === 'waitlist' && waitListDialogRef.current) {
      waitListDialogRef.current.close();
    }
  };
  const handleOpenDialog = (type: DialogType, item?: Waitlist) => {
    if (type === 'orderHistory' && dialogRef.current) {
      dialogRef.current.showModal();
    }

    if (type === 'eachOrder' && eachOrderDialogRef.current) {
      eachOrderDialogRef.current.showModal();
    }

    if (type === 'waitlist' && waitListDialogRef.current) {
      waitListDialogRef.current.showModal();
      item && setWaitlistItemDetails(item);
    }
  };

  const openOrderDetail = (item: InProgress) => {
    setOrderDetail(item);
    handleOpenDialog('eachOrder');
  };

  const orderHistoryPaths: Record<string, JSX.Element> = {
    list: <ListOrderHistory setOrderHistoryPath={setOrderHistoryPath} />,
    detail: <OrderHistoryDetail setOrderHistoryPath={setOrderHistoryPath} />,
  };

  const pathToSwitch: Record<SwitchPath, JSX.Element> = {
    inProgress: (
      <InProgressView
        inProgressData={inProgressData}
        openOrderDetail={openOrderDetail}
      />
    ),
    waitlist: (
      <WaitlistView
        waitlistData={waitlistData}
        handleOpenDialog={handleOpenDialog}
      />
    ),
  };


  return (
    <>
      <Header title="Orders" />
      <dialog className="dialog relative text-[1.6rem]" ref={waitListDialogRef}>
        <div className="bg-white fixed right-0 h-[100vh] py-4 px-12">
          <input type="text" className="absolute top-0 w-0" />
          <figure className="flex justify-end">
            <img
              src="/icons/close.svg"
              alt=""
              className="w-[3rem] cursor-pointer"
              onClick={() => handleCloseDialog('waitlist')}
            />
          </figure>

          <section className="h-full">
            <div className=" h-full items-baseline w-[40rem] overflow-y-scroll pb-10">
              <main className="grid gap-16 ">
                <div className="grid justify-start justify-items-start gap-4">
                  <p className="text-[2rem] text-gray-600 text-center">
                    {waitlistItemDetails?.name}
                  </p>
                </div>
                <section
                  className="grid gap-10 border border-color-purple-light p-8 rounded-2xl"
                  style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
                  }}
                >
                  <div>
                    <p className=" text-gray-400">Car Brand</p>
                    <p className=" text-gray-600">Toyota</p>
                  </div>
                  <div>
                    <p className=" text-gray-400">Car Year</p>
                    <p className=" text-gray-600">2022</p>
                  </div>
                  <div>
                    <p className=" text-gray-400">Car Model</p>
                    <p className=" text-gray-600">Camry</p>
                  </div>
                  <div>
                    <p className=" text-gray-400">Car Trim</p>
                    <p className=" text-gray-600">XLE</p>
                  </div>
                </section>
                <section className="grid gap-4 rounded-2xl">
                  <p className="text-gray-500 font-semibold text-[1.8rem]">
                    Documents Submitted
                  </p>
                  <div className={`grid gap-4`}>
                    <p className=" text-gray-500">Bills of Lading</p>
                    <p className=" text-gray-500">Releases</p>
                    <p className=" text-gray-500">CAC</p>
                    <p className=" text-gray-500">Signed POA</p>
                  </div>
                </section>
                <section className="grid gap-4 rounded-2xl">
                  <p className="text-gray-500 font-medium text-[1.8rem]">
                    Payments
                  </p>
                  <div className="border border-gray-400 flex justify-between items-center rounded-2xl py-4 px-8">
                    <p className="text-[1.8rem] text-gray-500">ICOC</p>
                    <div>
                      <p className="text-color-purple-1 flex gap-1 font-medium items-center">
                        <span className="text-gray-500">NGN</span>
                        {`230000`.toLocaleString()}
                      </p>
                      <p className="text-[1.4rem] text-gray-500">Dec 9, 2023</p>
                    </div>
                  </div>
                </section>
                <button className="flex w-full items-center">
                  <span className="bg-color-primary rounded-lg text-white w-full py-4">
                    Create Order
                  </span>
                </button>{' '}
              </main>
            </div>
          </section>
        </div>
      </dialog>
      <dialog
        className="dialog relative text-[1.6rem]"
        ref={eachOrderDialogRef}
      >
        <div className="bg-white fixed right-0 h-[100vh] py-4 px-12">
          <input type="text" className="absolute top-0 w-0" />
          <figure className="flex justify-end">
            <img
              src="/icons/close.svg"
              alt=""
              className="w-[3rem] cursor-pointer"
              onClick={() => handleCloseDialog('eachOrder')}
            />
          </figure>
                  
          <section className="h-full">
            <EachOrderDetail
              orderDetail={OrderDetail}
              handleCloseDialog={() => handleCloseDialog('eachOrder')}
            />
          </section>
        </div>
      </dialog>
      <dialog className="dialog relative text-[1.6rem]" ref={dialogRef}>
        <div className="bg-white fixed right-0 h-[100vh] w-[50rem] py-4 px-12">
          <input type="text" className="absolute top-0 w-0" />
          <figure className="flex justify-end">
            <img
              src="/icons/close.svg"
              alt=""
              className="w-[3rem] cursor-pointer"
              onClick={() => handleCloseDialog('orderHistory')}
            />
          </figure>

          <section className="h-full">
            <h3 className="text-[2.4rem] mb-10">Order history</h3>
            {orderHistoryPaths[orderHistoryPath.path]}
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
                  onClick={() => handleOpenDialog('orderHistory')}
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
