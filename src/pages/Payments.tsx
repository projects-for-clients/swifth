import Header from '../components/dashboard/Header';
import {
  ChangeEvent,
  Fragment,
  useEffect,
  useState,
  useRef,
  SyntheticEvent,
} from 'react';
import SelectDropDown from '../components/utils/SelectDropDown';
import { GrClose } from 'react-icons/gr';

import {
  generateRandomDate,
  generateRandomNum,
} from '../container/order/OrdersData';

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
  amount: number;
}

interface PaymentHistory {
  id: number;
  date: Date;
  amount: number;
}

const paymentHistoryArr: PaymentHistory[] = Array.from(
  { length: 20 },
  (_, i) => ({
    id: i,
    date: generateRandomDate(),
    amount: Math.floor(Math.random() * 270000 + 40000),
  })
);

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
  amount: 50000,
}));

function Payments() {
  const PaymentsFilters: PaymentsFilterBy[] = ['Fully Paid', 'Pending Bill'];

  const [paymentsFilteredBy, setPaymentsFilteredBy] = useState('');
  const [paymentDetail, setPaymentDetail] = useState<Payments | null>(null);

  const [dropDownState, setDropDownState] = useState(false);
  const [showAccordion, setShowAccordion] = useState(false);

  const [search, setSearch] = useState('');

  const [paymentsData, setPaymentsData] = useState<Payments[]>(PAYMENTS);

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
    setDropDownState(false);
  };

  const eachOrderDialogRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseDialog = (): void => {
    if (eachOrderDialogRef.current) {
      eachOrderDialogRef.current.close();
    }
  };
  const handleOpenDialog = (item: Payments) => {
    setPaymentDetail(item);
    if (eachOrderDialogRef.current) {
      eachOrderDialogRef.current.showModal();
    }
  };

  const accordionHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
    setShowAccordion((prev) => !prev);
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
              onClick={() => handleCloseDialog()}
            />
          </figure>

          <section className="h-full">
            <div className=" h-full items-baseline w-[80rem] overflow-y-scroll pb-10">
              <main className="grid gap-16 ">
                <div className="grid justify-start justify-items-start gap-4">
                  <p className="text-[2rem] text-gray-600 text-center">
                    {paymentDetail?.name}
                  </p>
                  <p
                    className={`py-1.5 px-8 rounded-2xl ${
                      paymentDetail?.tag === 'Fully Paid'
                        ? 'bg-color-primary text-white'
                        : 'text-black bg-[#FAC772]'
                    }`}
                  >
                    {paymentDetail?.tag}
                  </p>{' '}
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

                <section className="bg-color-red-light-2 grid gap-4 rounded-2xl">
                  <div className="border-b border-b-color-purple-light-2 ">
                    <button
                      className={`flex justify-between p-8 cursor-pointer w-full `}
                      onClick={accordionHandler}
                    >
                      <p className="text-[1.4rem] text-color-purple-1">
                        Total Bill
                      </p>
                      <p className="text-color-purple font-semibold flex items-center gap-4">
                        <span>1,000,000</span>{' '}
                        {showAccordion ? (
                          <img src="/icons/arrow-circle-up.svg" alt="" />
                        ) : (
                          <img src="/icons/arrow-circle-down.svg" alt="" />
                        )}
                      </p>
                    </button>
                    {
                      <div
                        className={`grid  ${
                          showAccordion ? 'visible h-auto' : 'invisible h-0'
                        }`}
                      >
                        <div className=" border-b-color-purple-light-2 flex justify-between p-8">
                          <p className="text-[1.4rem] text-color-purple-1">
                            ICOC
                          </p>
                          <p className="text-color-purple-1 font-semibold">
                            400,000
                          </p>
                        </div>
                        <div className=" border-b-color-purple-light-2 flex justify-between p-8">
                          <p className="text-[1.4rem] text-color-purple-1">
                            Loan + (10%) Interest
                          </p>
                          <p className="text-color-purple-1 font-semibold">
                            220,000
                          </p>
                        </div>
                        <div className=" border-b-color-purple-light-2 flex justify-between p-8">
                          <p className="text-[1.4rem] text-color-purple-1">
                            Security charge as at: 3/6/23
                          </p>
                          <p className="text-color-purple-1 font-semibold">
                            80,000
                          </p>
                        </div>
                        <div className=" border-b-color-purple-light-2 flex justify-between p-8">
                          <p className="text-[1.4rem] text-color-purple-1">
                            Telex Charge
                          </p>
                          <p className="text-color-purple-1 font-semibold">
                            300,000
                          </p>
                        </div>
                      </div>
                    }
                  </div>
                  <div className="border-b border-b-color-purple-light-2 flex justify-between p-8">
                    <p className="text-[1.4rem] text-color-purple-1">Paid</p>
                    <p className="text-color-purple font-semibold">7,000,000</p>
                  </div>
                  <div className="flex justify-between p-8">
                    <p className="text-[1.4rem] text-color-purple-1">
                      Outstanding
                    </p>
                    <p className="text-color-purple font-semibold">300,000</p>
                  </div>
                </section>
                <section>
                  <p className="font-medium text-[2rem] mb-10">
                    Payment History
                  </p>
                  <div
                    className="grid gap-8"
                    style={{
                      gridTemplateColumns:
                        'repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                  >
                    {paymentHistoryArr.map((item, i) => {
                      return (
                        <div className="flex justify-between p-8 items-center border border-gray-300 bg-gray-100 rounded-3xl">
                          <p className="text-[1.4rem] text-[#4B5463]">
                            {item.date.toLocaleString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                          <p className="text-color-purple-1 flex gap-1">
                            <span className="text-gray-500">NGN</span>
                            {item.amount.toLocaleString()}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </main>
            </div>
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
                  />

                  {paymentsFilteredBy && (
                    <GrClose
                      className="text-[1.4rem] cursor-pointer"
                      onClick={() => handleClearFilter()}
                    />
                  )}
                </>
              </div>

              <div
                className="grid mt-10 gap-10"
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(33rem, 1fr))',
                }}
              >
                {paymentsData.map((item, i) => {
                  const { name, description, date, tag, amount } = item;

                  return (
                    <div
                      className="p-4 bg-white rounded-3xl border border-color-purple-light-2 cursor-pointer grid gap-8"
                      key={i}
                      onClick={() => handleOpenDialog(item)}
                    >
                      <div className="text-[1.2rem] flex items-center justify-between">
                        <p
                          className={`py-1.5 px-4 rounded-2xl ${
                            tag === 'Fully Paid'
                              ? 'bg-color-primary text-white'
                              : 'text-black bg-[#FAC772]'
                          }`}
                        >
                          {tag}
                        </p>
                        <p className="text-gray-500">
                          {date.toLocaleString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[1.6rem]">{name}</p>
                          <p className="text-[1.4rem] whitespace-nowrap text-ellipsis overflow-hidden text-gray-500 max-w-[20rem]">
                            {description}
                          </p>
                        </div>

                        <p className="text-color-purple-1 flex gap-1 font-medium">
                          <span className="text-gray-500">NGN</span>
                          {amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Fragment>
          )}
        </section>
      </main>
    </>
  );
}

export default Payments;
