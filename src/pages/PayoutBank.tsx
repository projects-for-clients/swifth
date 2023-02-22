import { createContext, Fragment, useRef, useState } from 'react';
import Header from '../components/dashboard/Header';

export const CreateFinanceContext = createContext(null as any);

function PayoutBank() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [currentPath, setCurrentPath] = useState();
  const [addedBank, setAddedBank] = useState(true);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  return (
    <CreateFinanceContext.Provider value={null}>
      <Header title="Payout Bank" />
      <dialog className="dialog relative text-[1.6rem]" ref={dialogRef}>
        <section className="grid place-content-center w-screen h-[100vh]">
          <div className="bg-white rounded-2xl grid place-content-center justify-items-center gap-8 w-[60rem] py-20 px-10">
            <div>
              <p className="text-[2.4rem] font-medium text-left flex w-full">
               Delete bank
              </p>
              <p className="font-medium text-left">
                Do you want to delete bank details?
              </p>
            </div>

           
              <div className=" flex gap-8 w-[40rem] justify-self-end items-center">
                <button
                  className="w-full btn border border-gray-200 bg-gray-100 text-color-dark rounded-2xl"
                  type="reset"
                  onClick={() => handleCloseDialog()}
                >
                  Cancel
                </button>
                <button
                  className="w-full btn border border-color-primary text-color-primary rounded-2xl"
                  onClick={() => handleCloseDialog()}
                >
                  Save
                </button>
              </div>
          </div>
        </section>
      </dialog>
      <main>
        {addedBank ? (
          <div className="flex border border-[#BEB3DE] p-8 rounded-3xl w-full justify-between">
            <div className="flex items-center gap-8">
              <img src="/icons/payoutBank.svg" alt="" className="w-[8rem]" />
              <div className=" text-gray-500 grid items-center gap-4">
                <p className="uppercase text-[#144024] bg-[#D6ECDE] rounded-3xl py-2 px-4 justify-self-start">
                  verified
                </p>
                <div>
                  <p className="text-[2.4rem]">0128232349</p>
                  <p className="">Guaranty Trust Bank</p>
                  <p>James Bori</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 items-center self-end">
              <button className="btn rounded-2xl text-white bg-color-primary capitalize">
                Edit Bank details
              </button>
              <button
                className="btn rounded-2xl text-red-600 border border-red-600 capitalize"
                onClick={() => openDialog()}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-8 border border-[#BEB3DE] p-8 rounded-3xl w-[40rem]">
            <img src="/icons/payoutBank.svg" alt="" className="w-[8rem]" />
            <div className=" text-gray-500 flex items-center gap-4">
              <img src="/icons/add-circle.svg" alt="" className="w-[3rem]" />
              <p className="text-[1.4rem]">Add Payout Bank</p>
            </div>
          </div>
        )}
      </main>
    </CreateFinanceContext.Provider>
  );
}

export default PayoutBank;
