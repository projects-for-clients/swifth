import Header from '../../components/dashboard/Header';
import { ChangeEvent, useState, createContext, useRef, FormEvent } from 'react';

import { generateRandomDate } from '../../container/order/OrdersData';
import AppliedLoans from '../../container/finance/AppliedLoans';
import LoanRequests from '../../container/finance/LoanRequests';
import { IoMdAdd } from 'react-icons/io';

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

  const roles = [
    'admin',
    'field agent',
    'customer care rep',
    'revoke invite',
  ] as const;

  const keyNames = [
    'Suleman Henry',
    'Ezekiel Doe',
    'Jonathan Sunyi',
    'Peter Oluwasegun',
    'Isaac Joseph',
    'Dikachi Nwankwo',
    'Chukwudi Okoro',
  ] as const;

  interface Team {
    id: number;
    name: typeof keyNames[number];
    role: typeof roles[number];
  }

  const teamArr:Team[] = Array.from({ length: 10 }, (_, i) => {
    return {
      id: i,
      name: keyNames[Math.floor(Math.random() * keyNames.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
    };
  });

  const openMemberDetails = (item: Team) => {
    
  }

  return (
    <>
      <Header title="Team" />

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
          <div className="flex items-center gap-4">
            <button className="flex gap-2 rounded-lg py-4 px-8 bg-color-green-light-1 text-color-primary-dark border border-color-green-light items-center cursor-pointer">
              <IoMdAdd />
              <p className=" font-medium">Add Member</p>
            </button>
            <button
              className="flex gap-2 rounded-lg py-4 px-8 bg-color-purple-light-1 border border-color-purple-light items-center cursor-pointer"
              onClick={() => handleOpenDialog()}
            >
              <img src="/icons/percentage-circle.svg" alt="" />
              <p className="text-color-purple-1 font-medium">
                Set Interest Rate
              </p>
            </button>
          </div>
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(40rem, 1fr))',
              }}
            >
              {teamArr.map((item, i) => {
                const { name, role } = item;

                return (
                  <div
                    className="p-8 bg-white rounded-3xl border border-color-purple-light-2 cursor-pointer grid gap-8"
                    key={i}
                   onClick={() => openMemberDetails(item)}
                  >
                    <div className="text-[1.2rem] flex items-center justify-between ">
                      <p className="capitalize">{name}</p>
                      <p
                        className={`${
                          role === 'revoke invite'
                            ? 'text-red-600'
                            : 'text-color-purple-1'
                        } capitalize`}
                      >
                        {role}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Team;
