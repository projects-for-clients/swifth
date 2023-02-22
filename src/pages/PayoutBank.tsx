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
      <main>
        <div className="flex justify-between  mb-10">
          <h2 className="heading3"> Payout Bank</h2>{' '}
          <img src="/icons/arrow-right.svg" alt="" />
        </div>
        <div className="flex items-center gap-8">
          <img src="/icons/payoutBank.svg" alt="" />
          <div className=" text-gray-500">
                <img src="/icons/add-circle.svg" alt="" />
            <p className="text-[1.4rem]">Ore Adesanye</p>
          </div>
        </div>
      </main>
    </CreateFinanceContext.Provider>
  );
}

export default PayoutBank;
