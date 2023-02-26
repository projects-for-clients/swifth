import Header from '../components/dashboard/Header';
import {
  ChangeEvent,
  Fragment,
  useState,
  createContext,
  useRef,
  FormEvent,
} from 'react';

import { generateRandomDate } from '../container/order/OrdersData';
import AppliedLoans from '../container/finance/AppliedLoans';
import LoanRequests from '../container/finance/LoanRequests';

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

function Team() {
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
  const handleOpenDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };
  const switchPath: Record<SwitchPath, JSX.Element> = {
    appliedLoans: <AppliedLoans />,
    loanRequests: <LoanRequests />,
  };

  const submitInterestRate = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <CreateFinanceContext.Provider
      value={{
        financeData,
      }}
    >
      <Header title="Finance" />
     
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
          <button
            className="flex gap-2 rounded-lg py-4 px-8 bg-color-purple-light-1 border border-color-purple-light items-center cursor-pointer"
            onClick={() => handleOpenDialog()}
          >
            <img src="/icons/percentage-circle.svg" alt="" />
            <p className="text-color-purple-1 font-medium">Set Interest Rate</p>
          </button>
        </section>

        <section>
          {financeData.length < 1 ? (
            <div className="grid place-content-center h-[70vh] text-center">
              <p>Nothing Found</p>
            </div>
          ) : (
            <div
              className="grid mt-10 gap-10"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(33rem, 1fr))',
              }}
            >
              {financeData.map((item, i) => {
                const { name, date, loanAndInterest, amountPaid } = item;

                return (
                  <div
                    className="p-8 bg-white rounded-3xl border border-color-purple-light-2 cursor-pointer grid gap-8"
                    key={i}
                    onClick={() => handleOpenDialog(item)}
                  >
                    <div className="text-[1.2rem] flex items-center justify-between">
                      <div className="grid gap-4">
                        <p className="text-[1.6rem]">{name}</p>
                        <p className="text-color-purple-1 flex gap-1 font-medium items-center">
                          <span className="text-gray-500 text-[1.4rem] font-normal">
                            Loan + Int :
                          </span>
                          {loanAndInterest?.toLocaleString()}
                        </p>
                      </div>

                      <div className="grid gap-4">
                        <p className="text-gray-500">
                          {date.toLocaleString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                        <p className="text-color-purple-1 flex gap-1 font-medium items-center">
                          <span className="text-gray-500 text-[1.4rem] font-normal">
                            Paid :
                          </span>
                          {amountPaid?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </CreateFinanceContext.Provider>
  );
}

export default Team;
