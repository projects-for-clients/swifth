import React, { useContext, useState } from 'react';
import { CreateFinanceContext, Finance } from '../../../pages/Finance';

const LoanRequests = () => {
  const financeDetails = useContext(CreateFinanceContext);
  const dialogRef = React.useRef<HTMLDialogElement | null>(null);
  const [detailsData, setDetailsData] = useState<Finance | null>(null);

  const { financeData } = financeDetails;

  const handleCloseDialog = (): void => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };
  const handleOpenDialog = (item: Finance) => {
    setDetailsData(item);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const wantsToLoan =
    detailsData?.wantsToLoan && Math.floor(detailsData.wantsToLoan * 0.1);

  const totalPaidBack =
    detailsData?.wantsToLoan &&
    wantsToLoan &&
    detailsData.wantsToLoan + wantsToLoan;

  return (
    <>
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

          <main className="w-[40rem] overflow-y-scroll pb-10 grid gap-10 h-full content-start ">
            <div className="grid justify-start justify-items-start gap-4">
              <p className="text-[2rem] text-gray-600 text-center">
                {detailsData?.name}
              </p>
            </div>

            <section
              className="grid gap-10 border border-color-purple-light p-8 rounded-2xl self-start"
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

            <section className=" grid gap-4 rounded-2xl">
              <div>
                <p>Requesting a loan of:</p>
                <p className="text-[3.2rem] text-color-purple">
                  {' '}
                  <span className="text-color-purple-light">N</span>
                  {detailsData?.wantsToLoan?.toLocaleString()}
                </p>
              </div>
              <div className="border p-8 rounded-3xl bg-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-color-grey-4">
                    Interest to be added (10%)
                  </span>
                  <p className=" text-color-purple">
                    <span className="text-color-purple-light">N</span>
                    {wantsToLoan?.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-color-grey-4">
                    Total to be paid back
                  </span>
                  <p className=" text-color-purple">
                    <span className="text-color-purple-light">N</span>
                    {totalPaidBack?.toLocaleString()}
                  </p>
                </div>
              </div>
            </section>
          </main>
          <div className="grid w-full absolute justify-center left-0 right-0 bottom-[3rem] px-[3rem] gap-8">
            <p className="flex items-center gap-2">
              <img src="/icons/info-circle.svg" alt="" />
              Approving loan immediately applies loan amount to registered
              user's bill
            </p>
            <div className="flex items-center w-full justify-between gap-4">
              <button className="btn border border-red-600 text-red-600 rounded-lg w-full">
                Reject Loan
              </button>
              <button className="btn bg-green-600 text-white rounded-lg w-full">
                Approve loan
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <div
        className="grid mt-10 gap-10"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(33rem, 1fr))',
        }}
      >
        {financeData.map((item, i) => {
          const { name, date, wantsToLoan } = item;

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
                      Wants to Loan :
                    </span>
                    {wantsToLoan?.toLocaleString()}
                  </p>
                </div>

                <p className="text-gray-500 self-start">
                  {date.toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LoanRequests;
