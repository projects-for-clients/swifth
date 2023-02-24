import React, { useContext, useState } from 'react';
import { CreateFinanceContext, Finance } from '../../pages/Finance';

const AppliedLoans = () => {
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

            <section className="bg-color-red-light-2 grid gap-4 rounded-2xl">
              <>
                <div
                  className={`flex justify-between p-8 cursor-pointer w-full items-center `}
                >
                  <p className="text-[1.4rem] text-color-purple-light grid justify-items-start">
                    <span>Dec 3, 2023</span>
                    <span className="text-color-purple-2">Loan applied</span>
                  </p>
                  <p className="text-color-purple font-semibold ">
                    <span>1,000,000</span>{' '}
                  </p>
                </div>
                <div
                  className={`flex justify-between p-8 cursor-pointer w-full items-center `}
                >
                  <p className="text-[1.4rem] text-color-purple-light grid justify-items-start">
                    <span>Dec 3, 2023</span>
                    <span className="text-color-purple-2">
                      Interest added (10%)
                    </span>
                  </p>
                  <p className="text-color-purple font-semibold ">
                    <span>100,000</span>{' '}
                  </p>
                </div>
                <div
                  className={`flex justify-between p-8 cursor-pointer w-full items-center `}
                >
                  <p className="text-[1.4rem] text-color-purple-light grid justify-items-start">
                    <span>Total to be paid:</span>
                    <span className="text-color-purple text-[1.6rem] font-semibold">
                      Loan applied
                    </span>
                  </p>
                  <p className="text-[1.4rem] text-color-purple-light grid justify-items-end">
                    <span>Paid:</span>
                    <span className="text-color-purple text-[1.6rem] font-semibold">
                      740,000
                    </span>
                  </p>
                </div>
              </>
            </section>
          </main>
          <button className="flex w-full absolute justify-center left-0 right-0 bottom-[3rem] px-[3rem]">
            <span className="border border-color-primary text-color-primary rounded-lg w-full py-4">
              Continue
            </span>
          </button>
        </div>
      </dialog>

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
    </>
  );
};

export default AppliedLoans;
