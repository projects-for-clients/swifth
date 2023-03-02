import Header from '../components/dashboard/Header';
import { ChangeEvent, useEffect, useState } from 'react';

function Reports() {
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState('2023-08');
  const [dates, setDates] = useState<Date[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const generateMonth = (month: string) => {
    const startDate = new Date(month); // use current date
    startDate.setDate(1); // set to 1st day of the month

    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    ); // get the last day of the month

    const dates = [];

    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      dates.push(new Date(date)); // add each date to the list
    }

    return dates;
  };

  useEffect(() => {
    setDates(generateMonth(month));
  }, []);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMonth(e.target.value);
    setDates(generateMonth(e.target.value));
  };

  interface ReportTable {
    date: Date;
    activeCustomers: number;
    quotesRequested: number;
    ordersPlaced: number;
    deliveredItems: number;
    individualPayments: number;
    completedPayments: number;
  }

  const reportTable: ReportTable[] = Array.from({length: dates.length}, (_, i) => {
    return {
      date: dates[i],
      activeCustomers: Math.floor(Math.random() * 20 + 2),
      quotesRequested: Math.floor(Math.random() * 40 + 5),
      ordersPlaced: Math.floor(Math.random() * 50 + 10),
      deliveredItems: Math.floor(Math.random() * 100 + 20),
      individualPayments: Math.floor(Math.random() * 100 + 20),
      completedPayments: Math.floor(Math.random() * 100 + 20),
    };
  })

 

  

  return (
    <>
      <Header title="Reports" />

      <main className="text-[1.6rem] ">
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
        <section>
          <div className="flex justify-between items-center mt-10">
            <div>
              <input
                type="month"
                id="month"
                value={month}
                onChange={handleDateChange}
                name="month"
                className="flex items-center bg-gray-100 border border-gray-300 py-3 px-8 rounded-xl gap-4 justify-center cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-8">
              <button className="btn text-color-purple bg-color-red-light-1 border border-color-red-light-3 flex items-center gap-4 rounded-2xl">
                <img
                  src="/icons/send-square.svg"
                  alt=""
                  className="w-[2rem] h-[2rem]"
                />
                <span>Download</span>
              </button>
              <button className="btn text-green-600 bg-green-100 border border-[#ADD9BD] items-center gap-4 rounded-2xl flex">
                <img
                  src="/icons/send-2.svg"
                  alt=""
                  className="w-[2rem] h-[2rem]"
                />
                <span>Share</span>
              </button>
            </div>
          </div>
        </section>
        <section className="mt-10 w-[90rem]">
          <table className="w-full text-center  reports">
            <thead>
              <tr>
                <th>Date</th>
                <th>Active Customers</th>
                <th>Quotes Requested</th>
                <th>Orders placed</th>
                <th>Delivered Items</th>
                <th>Individual Payments</th>
                <th>Completed Payments</th>
              </tr>
            </thead>
            <tbody>
              {
                reportTable.map((report, i) => (
                    <tr key={i}>
                        <td>{report.date.toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'

                        })}</td>
                        <td>{report.activeCustomers}</td>
                        <td>{report.quotesRequested}</td>
                        <td>{report.ordersPlaced}</td>
                        <td>{report.deliveredItems}</td>
                        <td>{report.individualPayments}</td>
                        <td>{report.completedPayments}</td>
                    </tr>
                ))
              }
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default Reports;
