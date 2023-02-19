import Header from '../../components/dashboard/Header';
import { ChangeEvent, Fragment, useEffect, useState, useRef } from 'react';
import SelectDropDown from '../../components/utils/SelectDropDown';
import { GrClose } from 'react-icons/gr';

import {
  ListOrderHistory,
  OrderHistoryDetail,
} from '../../components/dashboard/order/OrderHistory';
import EachOrderDetail from '../../components/dashboard/order/AgentOrderDetail/AgentOrderDetail';
import {
  generateRandomDate,
  generateRandomNum,
} from '../../components/dashboard/order/OrdersData';

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

export interface PaymentsHistory {
  id: number;
  date: Date;
  amount: number;
}

export type PaymentsFilterBy = 'Fully Paid' | 'Pending Bill';

export interface Payments {
  id: number;
  name: string;
  description: string;
  date: Date;
  tag: PaymentsFilterBy;
  history: PaymentsHistory[];
}

const paymentsHistoryArr: PaymentsHistory[] = Array.from(
  { length: 20 },
  (_, i) => ({
    id: i,
    date: generateRandomDate(),
    amount: generateRandomNum(),
  })
);

export const PAYMENTS: Payments[] = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  name: `Ezekiel Doe ${i + 1}`,
  description: `Toyota Camry XLE, ${200 + (i + 1)}`,
  date: generateRandomDate(),
  tag: Math.random() > 0.5 ? 'Fully Paid' : 'Pending Bill',
  history: paymentsHistoryArr,
}));

function Payments() {
  const PaymentsFilters: PaymentsFilterBy[] = ['Fully Paid', 'Pending Bill'];

  const [paymentsFilteredBy, setPaymentsFilteredBy] = useState('');

  const [dropDownState, setDropDownState] = useState<DropDownState>({
    sortBy: false,
    filterBy: false,
  });

  const [search, setSearch] = useState('');

  const [paymentsData, setPaymentsData] = useState<Payments[]>([]);
  const [OrderDetail, setOrderDetail] = useState<Payments>(null as any);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);

    const filtered = PAYMENTS.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setPaymentsData(filtered);
  };

  useEffect(() => {
    if (paymentsFilteredBy) {
      const filtered = PAYMENTS.filter(
        (item) => item.tag === paymentsFilteredBy
      );

      return setPaymentsData(() => [...filtered]);
    }
  }, [paymentsFilteredBy]);

  const handleClearFilter = () => {
    setPaymentsFilteredBy('');
    setDropDownState((prev) => ({ ...prev, filterBy: false }));
  };

  const eachOrderDialogRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseDialog = (): void => {
    if (eachOrderDialogRef.current) {
      eachOrderDialogRef.current.close();
    }
  };
  const handleOpenDialog = () => {
    if (eachOrderDialogRef.current) {
      eachOrderDialogRef.current.showModal();
    }
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

      <main className="text-[1.6rem] grid gap-10">
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
        <section
          className="grid gap-8"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(30rem, 1fr))',
          }}
        >
          <div className="bg-color-green-light-1 text-color-primary-dark-2 rounded-3xl border border-green-600 p-8">
            <p className="font-semibold">Total Received</p>
            <p className="text-[2.4rem] font-semibold">
              {' '}
              <span className="text-color-green-light">NGN</span> 35,923 M
            </p>
          </div>
          <div className="bg-color-red-light-2 text-color-tertiary rounded-3xl border border-red-300 p-8">
            <p className="font-semibold"> Received Today</p>
            <p className="text-[2.4rem] font-semibold">
              {' '}
              <span className="text-color-purple-light">NGN</span> 1.85 M
            </p>
          </div>
          <div className="bg-[#FDECD0] text-[#312004] rounded-3xl border border-[#94610c] p-8">
            <p className="font-semibold">Pending Payments</p>
            <p className="text-[2.4rem] font-semibold">
              {' '}
              <span className="text-[#94610c]">NGN</span> 690,000
            </p>
          </div>
        </section>
        <section>
          {paymentsData.length < 1 ? (
            <div className="grid place-content-center h-[70vh] text-center">
              <p>Nothing Found</p>
             
            </div>
          ) : (
            <Fragment>
              <div className="flex items-center gap-8 justify-end">
                <>
                  <SelectDropDown
                    selectFrom={PaymentsFilters}
                    selectedItem={paymentsFilteredBy}
                    setSelectedItem={setPaymentsFilteredBy}
                    isFilter
                    label={'filterBy'}
                    setDropDownState={setDropDownState}
                    dropDownState={dropDownState}
                  />
                  {paymentsFilteredBy && (
                    <GrClose
                      className="text-[1.4rem] cursor-pointer"
                      onClick={() => handleClearFilter()}
                    />
                  )}
                </>
              </div>
            </Fragment>
          )}
        </section>
      </main>
    </>
  );
}

export default Payments;
