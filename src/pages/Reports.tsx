import Header from '../components/dashboard/Header';
import { ChangeEvent, useState } from 'react';

function Reports() {
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState('2023-08');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Header title="Reports" />

      <main className="text-[1.6rem]">
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
                onChange={(e) => setMonth(e.target.value)}
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

        <section className="mt-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ducimus beatae voluptates dolore illo. Blanditiis natus pariatur nesciunt sint. Natus, ea quae voluptatibus aperiam error illo laborum quidem labore nihil!
            </section>
      </main>
    </>
  );
}

export default Reports;
