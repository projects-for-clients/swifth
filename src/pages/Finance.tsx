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
import LoanRequests from '../container/dashboard/finance/LoanRequests';

export interface FinanceHistory {
  id: number;
  date: Date;
  amount: number;
}

export type FinanceFilterBy = 'Fully Paid' | 'Pending Bill';

export interface Finance {
  id: number;
  name: string;
  date: Date;
  history: FinanceHistory[];
  amountPaid: number;
  loanAndInterest: number;
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
  history: financeHistoryArr,
  amountPaid: Math.floor(Math.random() * 900000 + 500000),
  loanAndInterest: Math.floor(Math.random() * 2000000 + 900000),
}));

export interface FinanceContext {
  financeData: Finance[];
  setFinanceData: React.Dispatch<React.SetStateAction<Finance[]>>;
  handleOpenDialog: (item: Finance) => void;
}

type SwitchPath = 'appliedLoans' | 'loanRequests';
export const CreateFinanceContext = createContext<FinanceContext>(null as any);

function Finance() {
  const [currentPath, setCurrentPath] = useState<SwitchPath>('appliedLoans');

  const [paymentDetail, setPaymentDetail] = useState<Finance | null>(null);


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

  

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseDialog = (): void => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };
  const handleOpenDialog = (item: Finance) => {
    setPaymentDetail(item);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

 

  const switchPath: Record<SwitchPath, JSX.Element> = {
    appliedLoans: <AppliedLoans />,
    loanRequests: <LoanRequests />,
  };

  return (
    <CreateFinanceContext.Provider
      value={{
        financeData,
        setFinanceData,
        handleOpenDialog,
      }}
    >
      <Header title="Finance" />
      <dialog className="dialog relative text-[1.6rem]" ref={dialogRef}>
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
            <div className=" h-full items-baseline w-[40rem] overflow-y-scroll pb-10">
              <main className="grid gap-16 ">
                <div className="grid justify-start justify-items-start gap-4">
                  <p className="text-[2rem] text-gray-600 text-center">
                    {paymentDetail?.name}
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

                <section className="bg-color-red-light-2 grid gap-4 rounded-2xl">
                  <div className="border-b border-b-color-purple-light-2 ">
                    <button
                      className={`flex justify-between p-8 cursor-pointer w-full `}
                    >
                      <p className="text-[1.4rem] text-color-purple-1">
                        Total Bill
                      </p>
                      <p className="text-color-purple font-semibold flex items-center gap-4">
                        <span>1,000,000</span>{' '}
                      </p>
                    </button>
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

                <button
                  className="flex w-full items-center"
                >
                  <span className="border-color-primary text-color-primary rounded-lg w-full py-4">
                    Continue
                  </span>
                </button>
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
        <section className="flex justify-end">
          <div className="flex gap-2 rounded-lg py-4 px-8 bg-color-purple-light-1 border border-color-purple-light items-center cursor-pointer">
            <img src="/icons/percentage-circle.svg" alt="" />
            <p className="text-color-purple-1 font-medium">Set Interest Rate</p>
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
