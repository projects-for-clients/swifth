import { createContext, Fragment } from 'react';
import Header from '../components/dashboard/Header';

export const CreateFinanceContext = createContext(null as any);
const dialogRef = useRef<HTMLDialogElement>(null);

function PayoutBank() {
  return (
    <CreateFinanceContext.Provider value={null}>
      <Header title="Finance" />
      <dialog className="dialog relative text-[1.6rem]" ref={dialogRef}>
        <section className="grid place-content-center w-screen h-[100vh]">
          <div className="bg-white rounded-2xl grid place-content-center justify-items-center  gap-16 w-[60rem] py-20 px-10"></div>
        </section>
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
          <button
            className="flex gap-2 rounded-lg py-4 px-8 bg-color-purple-light-1 border border-color-purple-light items-center cursor-pointer"
            onClick={() => handleOpenDialog()}
          >
            <img src="/icons/percentage-circle.svg" alt="" />
            <p className="text-color-purple-1 font-medium">Set Interest Rate</p>
          </button>
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

export default PayoutBank;
