import { createContext, Fragment, useRef } from 'react';
import Header from '../components/dashboard/Header';

export const CreateFinanceContext = createContext(null as any);

function PayoutBank() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  return (
    <CreateFinanceContext.Provider value={null}>
      <Header title="Payout Bank" />
      <dialog className="dialog relative text-[1.6rem]" ref={dialogRef}>
        <section className="grid place-content-center w-screen h-[100vh]">
          <div className="bg-white rounded-2xl grid place-content-center justify-items-center  gap-16 w-[60rem] py-20 px-10"></div>
        </section>
      </dialog>
      Payout Bank
    </CreateFinanceContext.Provider>
  );
}

export default PayoutBank;
