import React, { useContext } from 'react';
import { CreateFinanceContext } from '../../../pages/Finance';

const LoanRequests = () => {
  const financeDetails = useContext(CreateFinanceContext);

  const { financeData,handleOpenDialog } = financeDetails;

  

  return (
    <div
      className="grid mt-10 gap-10"
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(33rem, 1fr))',
      }}
    >
      {financeData.map((item, i) => {
        const { name, date, loanAndInterest } = item;

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
                  {loanAndInterest.toLocaleString()}
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
  );
};

export default LoanRequests;
