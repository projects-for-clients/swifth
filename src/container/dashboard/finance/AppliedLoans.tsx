import React, { useContext } from 'react';
import { CreateFinanceContext } from '../../../pages/Finance';

const AppliedLoans = () => {
  const financeDetails = useContext(CreateFinanceContext);

  const { financeData, handleOpenDialog, handleSearch } =
    financeDetails;

  return (
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
            className="p-4 bg-white rounded-3xl border border-color-purple-light-2 cursor-pointer grid gap-8"
            key={i}
            onClick={() => handleOpenDialog(item)}
          >
            <div className="text-[1.2rem] flex items-center justify-between">
              <div>
                <p className="text-[1.6rem]">{name}</p>
                <p className="text-[1.4rem] whitespace-nowrap text-ellipsis overflow-hidden text-gray-500 max-w-[20rem]">
                  {loanAndInterest.toLocaleString()}
                </p>
              </div>

              <div className=" justify-between items-end">
                <p className="text-gray-500">
                  {date.toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-color-purple-1 flex gap-1 font-medium">
                  <span className="text-gray-500">NGN</span>
                  {amountPaid.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AppliedLoans;
