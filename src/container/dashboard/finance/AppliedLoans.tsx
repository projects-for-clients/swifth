import React from 'react'

const AppliedLoans = () => {
  return (
    <div
      className="grid mt-10 gap-10"
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(33rem, 1fr))',
      }}
    >
      {financeData.map((item, i) => {
        const { name, description, date, tag, amount } = item;

        return (
          <div
            className="p-4 bg-white rounded-3xl border border-color-purple-light-2 cursor-pointer grid gap-8"
            key={i}
            onClick={() => handleOpenDialog(item)}
          >
            <div className="text-[1.2rem] flex items-center justify-between">
              <p
                className={`py-1.5 px-4 rounded-2xl ${
                  tag === 'Fully Paid'
                    ? 'bg-color-primary text-white'
                    : 'text-black bg-[#FAC772]'
                }`}
              >
                {tag}
              </p>
              <p className="text-gray-500">
                {date.toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[1.6rem]">{name}</p>
                <p className="text-[1.4rem] whitespace-nowrap text-ellipsis overflow-hidden text-gray-500 max-w-[20rem]">
                  {description}
                </p>
              </div>

              <p className="text-color-purple-1 flex gap-1 font-medium">
                <span className="text-gray-500">NGN</span>
                {amount.toLocaleString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AppliedLoans