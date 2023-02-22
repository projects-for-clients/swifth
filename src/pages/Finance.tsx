import Header from '../components/dashboard/Header';
import {
  ChangeEvent,
  Fragment,
  useEffect,
  useState,
  useRef,
  SyntheticEvent,
  createContext,
} from 'react';
import SelectDropDown from '../components/utils/SelectDropDown';
import { GrClose } from 'react-icons/gr';

import {
  generateRandomDate,
  generateRandomNum,
} from '../components/dashboard/order/OrdersData';
import AppliedLoans from '../container/dashboard/finance/AppliedLoans';

export interface FinanceHistory {
  id: number;
  date: Date;
  amount: number;
}

export type FinanceFilterBy = 'Fully Paid' | 'Pending Bill';

export interface Finance {
  id: number;
  name: string;
  description: string;
  date: Date;
  tag: FinanceFilterBy;
  history: FinanceHistory[];
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

const financeHistoryArr: FinanceHistory[] = Array.from(
  { length: 20 },
  (_, i) => ({
    id: i,
    date: generateRandomDate(),
    amount: generateRandomNum(),
  })
);

export const FINANCE: Finance[] = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  name: `Ezekiel Doe ${i + 1}`,
  description: `Toyota Camry XLE, ${200 + (i + 1)}`,
  date: generateRandomDate(),
  tag: Math.random() > 0.5 ? 'Fully Paid' : 'Pending Bill',
  history: financeHistoryArr,
  amount: 50000,
}));

export interface FinanceContext {
  financeData: Finance[];
  setFinanceData: React.Dispatch<React.SetStateAction<Finance[]>>;
  handleOpenDialog: (item: Finance) => void;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

type SwitchPath = 'appliedLoans' | 'loanRequests';
export const CreateFinanceContext = createContext<FinanceContext>(null as any);

function Finance() {
  const FinanceFilters: FinanceFilterBy[] = ['Fully Paid', 'Pending Bill'];
  const [currentPath, setCurrentPath] = useState<SwitchPath>('appliedLoans');

  const [financeFilteredBy, setFinanceFilteredBy] = useState('');
  const [paymentDetail, setPaymentDetail] = useState<Finance | null>(null);

  const [showAccordion, setShowAccordion] = useState(false);

  const [search, setSearch] = useState('');

  const [financeData, setFinanceData] = useState<Finance[]>(FINANCE);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);

    const filtered = FINANCE.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFinanceData(filtered);
  };

  useEffect(() => {
    if (financeFilteredBy) {
      const filtered = FINANCE.filter((item) => item.tag === financeFilteredBy);

      return setFinanceData(() => [...filtered]);
    }
  }, [financeFilteredBy]);

 

  const eachOrderDialogRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseDialog = (): void => {
    if (eachOrderDialogRef.current) {
      eachOrderDialogRef.current.close();
    }
  };
  const handleOpenDialog = (item: Finance) => {
    setPaymentDetail(item);
    if (eachOrderDialogRef.current) {
      eachOrderDialogRef.current.showModal();
    }
  };

  const accordionHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
    console.log(e);
    setShowAccordion((prev) => !prev);
  };

  const switchPath: Record<SwitchPath, JSX.Element> = {
    appliedLoans: <AppliedLoans/>,
    loanRequests: <AppliedLoans/>,
  };

  return (
    <CreateFinanceContext.Provider
      value={{
        financeData,
        setFinanceData,
        handleOpenDialog,
        handleSearch,
      }}
    >
      <Header title="Finance" />
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
        <section className='flex justify-end'>
          <div className='flex gap-2 rounded-lg py-4 px-8 bg-color-purple-light-1 border border-color-purple-light items-center cursor-pointer'>
            <img src="/icons/percentage-circle.svg" alt="" />
            <p className='text-color-purple-1 font-medium'>Set Interest Rate</p>
          </div>
        </section>
        <section>
          <div className="radioBox gap-16">
            <input
              type="radio"
              name="notification"
              id="appliedLoans"
              className="hidden"
              onChange={() => setCurrentPath('appliedLoans')}
              checked={currentPath === 'appliedLoans'}
            />
            <label htmlFor="appliedLoans" className="capitalize text-[1.8rem]">
              Applied Loans
            </label>

            <input
              type="radio"
              name="notification"
              id="loanRequests"
              className="hidden"
              checked={currentPath === 'loanRequests'}
              onChange={() => setCurrentPath('loanRequests')}
            />
            <label htmlFor="loanRequests" className="capitalize text-[1.8rem]">
              Loan Requests
            </label>
          </div>
        </section>

        <section>
          {financeData.length < 1 ? (
            <div className="grid place-content-center h-[70vh] text-center">
              <p>Nothing Found</p>
            </div>
          ) : (
            <Fragment>{switchPath[currentPath]}</Fragment>
          )}
        </section>
      </main>
    </CreateFinanceContext.Provider>
  );
}

export default Finance;
