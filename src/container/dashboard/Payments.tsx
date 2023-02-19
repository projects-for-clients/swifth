import Header from '../../components/dashboard/Header';
import { ChangeEvent, Fragment, useEffect, useState, useRef } from 'react';
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
} from '../../components/dashboard/order/OrdersData';
import {
  ListOrderHistory,
  OrderHistoryDetail,
} from '../../components/dashboard/order/OrderHistory';
import EachOrderDetail from '../../components/dashboard/order/AgentOrderDetail/AgentOrderDetail';

export type OrderHistoryPath = {
  path: 'list' | 'detail';
  id?: number | null;
};

export type DialogType = 'orderHistory' | 'eachOrder';

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

function Payments() {
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

  const handleCloseDialog = (type: DialogType): void => {
    if (type === 'orderHistory' && dialogRef.current) {
      dialogRef.current.close();
    }

    if (type === 'eachOrder' && eachOrderDialogRef.current) {
      eachOrderDialogRef.current.close();
    }
  };
  const handleOpenDialog = (type: DialogType, id?: number) => {
    if (type === 'orderHistory' && dialogRef.current) {
      dialogRef.current.showModal();
    }

    if (type === 'eachOrder' && eachOrderDialogRef.current) {
      eachOrderDialogRef.current.showModal();
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
    waitlist: <WaitlistView waitlistData={waitlistData} />,
  };

  return (
    <>
      <Header title="Payments" />
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
          <div className="bg-color-green-light-1 text-color-primary-dark-2">
            <p className="font-semibold">Total Received</p>
            <p className="text-[2.4rem] font-semibold">
              {' '}
              <span className="text-color-green-light">NGN</span>{' '}
            </p>
          </div>
        </section>
        <section>
          {inProgressData.length < 1 ? (
            <div className="grid place-content-center h-[70vh] text-center">
              <p>Nothing to Show here</p>
              <p className="text-gray-500 text-[1.4rem] max-w-[35rem]">
                <span>No Payments yet</span>
              </p>
            </div>
          ) : (
            <Fragment>
              <div className="flex items-center gap-8 justify-end">
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
              </div>
              <>{pathToSwitch[currentPath]}</>
            </Fragment>
          )}
        </section>
      </main>
    </>
  );
}

export default Payments;
