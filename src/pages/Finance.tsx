import Header from '../components/dashboard/Header';
import { ChangeEvent, Fragment, useState, createContext, useRef } from 'react';

import { generateRandomDate } from '../components/dashboard/order/OrdersData';
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
  wantsToLoan?: number;
  amountPaid?: number;
  loanAndInterest?: number;
}

export const FINANCE: Finance[] = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  name: `Ezekiel Doe ${i + 1}`,
  description: `Toyota Camry XLE, ${200 + (i + 1)}`,
  date: generateRandomDate(),
  amountPaid: Math.floor(Math.random() * 900000 + 500000),
  wantsToLoan: Math.floor(Math.random() * 900000 + 500000),
  loanAndInterest: Math.floor(Math.random() * 2000000 + 900000),
}));

export interface FinanceContext {
  financeData: Finance[];
}

type SwitchPath = 'appliedLoans' | 'loanRequests';
export const CreateFinanceContext = createContext<FinanceContext>(null as any);

function Finance() {
  const [currentPath, setCurrentPath] = useState<SwitchPath>('appliedLoans');

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
      }}
    >
      <Header title="Finance" />
      <dialog className="dialog relative text-[1.6rem]" ref={dialogRef}>
        
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
