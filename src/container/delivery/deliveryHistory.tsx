import {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  FC,
  useContext,
} from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { OrderHistoryPath } from '../../pages/Orders';
import CalenderSvg from '../../components/icons/Calender';
import { DeliveryContext } from '../../pages/Delivery';
import { nanoid } from 'nanoid';

export function generateRandomDate() {
  const today = new Date();
  const nextYear = new Date(today.getFullYear() + 1, 0, 1);
  const randomDate = new Date(
    today.getTime() + Math.random() * (nextYear.getTime() - today.getTime())
  );
  return randomDate;
}

export interface DeliveryHistory {
  id: string;
  name: string;
  description: string;
  date: Date;
  tag: string;
  assignedAgent?: string;
}

export const DELIVERY_HISTORY_DATA: DeliveryHistory[] = Array.from(
  { length: 10 },
  (_, i) => {
    return {
      id: nanoid(),
      name: `Jonathan Sunyi ${i}`,
      description: `Toyota Camry XLE, 2018 v6 with alloy wheels ${i}`,
      date: generateRandomDate(),
      tag: 'completed',
    };
  }
);

const DeliveryHistory = () => {
  const [deliveryHistory, setDeliveryHistory] = useState<DeliveryHistory[]>(
    DELIVERY_HISTORY_DATA
  );

  useEffect(() => {
    const sortedDates = [...DELIVERY_HISTORY_DATA].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    setDeliveryHistory(() => [...sortedDates]);
  }, []);

  const [searchDates, setSearchDates] = useState<Record<string, Date | null>>({
    from: null,
    to: null,
  });

  const [showCalendarIcon, setShowCalendarIcon] = useState({
    to: true,
    from: true,
  });

  const fromDateRef = useRef<HTMLInputElement>(null);
  const toDateRef = useRef<HTMLInputElement>(null);

  const handleDateSearch = () => {
    const { from, to } = searchDates;

    if (from && to) {
      const filtered = [...DELIVERY_HISTORY_DATA].filter((item) => {
        const date = new Date(item.date);
        return (
          date.getTime() >= from.getTime() && date.getTime() <= to.getTime()
        );
      });

      setDeliveryHistory(() => [...filtered]);
    }
  };

  const clearDateInputs = () => {
    if (fromDateRef.current) {
      fromDateRef.current.value = '';
    }

    if (toDateRef.current) {
      toDateRef.current.value = '';
    }

    setSearchDates({ from: null, to: null });
  };

   const dialogRef = useRef<HTMLDialogElement | null>(null);

   const handleCloseDialog = (): void => {
     if ( dialogRef.current) {
       dialogRef.current.close();
     }
   };
   const handleOpenDialog = () => {
     if ( dialogRef.current) {
       dialogRef.current.showModal();
     }
   };

  return (
    <>
      <dialog className="dialog relative text-[1.6rem]" ref={dialogRef}>
        <div className="bg-white fixed right-0 h-[100vh] w-[50rem] py-4 px-12">
          <input type="text" className="absolute top-0 w-0" />
          <figure className="flex justify-end">
            <img
              src="/icons/close.svg"
              alt=""
              className="w-[3rem] cursor-pointer"
              onClick={() => handleCloseDialog()}
            />
          </figure>

          <section className="h-full">
            <h3 className="text-[2.4rem] mb-10">Order history</h3>
          </section>
        </div>
      </dialog>
      <div className="flex justify-between gap-8 items-center">
        <div className="grid gap-4 w-full">
          <label className="text-[1.4rem]">From</label>
          <div className="relative flex items-center">
            <input
              type="text"
              ref={fromDateRef}
              placeholder="Select Date"
              className={`rounded-lg py-4 px-4 outline-none text-[1.6rem] w-full bg-color-purple-light-1 placeholder:text-color-purple-light border border-color-purple-light-2`}
              name="fromDate"
              id="fromDate"
              onChange={(e) =>
                setSearchDates((prev) => ({
                  ...prev,
                  from: new Date(e.target.value),
                }))
              }
              onFocus={(e) => {
                e.target.type = 'date';
                e.target.min = new Date().toISOString().split('T')[0];
                setShowCalendarIcon((prev) => ({
                  ...prev,
                  from: false,
                }));
              }}
            />
            {showCalendarIcon.from && (
              <span className="absolute right-4">
                <CalenderSvg fill={'#9D8DCE'} />
              </span>
            )}
          </div>
        </div>
        <div className="grid gap-4 w-full">
          <label className="text-[1.4rem]">To</label>
          <div className="relative flex items-center">
            <input
              type="text"
              id="toDate"
              ref={toDateRef}
              placeholder="Select Date"
              className={`rounded-lg py-4 px-4 outline-none text-[1.6rem] w-full bg-color-purple-light-1 placeholder:text-color-purple-light border border-color-purple-light-2 `}
              name="toDate"
              onChange={(e) =>
                setSearchDates((prev) => ({
                  ...prev,
                  to: new Date(e.target.value),
                }))
              }
              onFocus={(e) => {
                e.target.type = 'date';
                e.target.min = new Date().toISOString().split('T')[0];
                setShowCalendarIcon((prev) => ({
                  ...prev,
                  to: false,
                }));
              }}
            />
            {showCalendarIcon.to && (
              <span className="absolute right-4">
                <CalenderSvg fill={'#9D8DCE'} />
              </span>
            )}
          </div>
        </div>
        {searchDates.from && searchDates.to && (
          <span className="flex h-full mt-[3rem]" onClick={clearDateInputs}>
            <GrClose className="text-[1.4rem] cursor-pointer font-bold" />
          </span>
        )}
      </div>
      <button
        className="text-color-primary border border-color-primary rounded-lg w-full py-4 uppercase  mt-10 text-center disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleDateSearch}
        disabled={!searchDates.from || !searchDates.to}
      >
        Search
      </button>

      <div
        className="grid mt-[5rem] gap-10 max-h-[60vh] overflow-y-scroll"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(33rem, 1fr))',
        }}
      >
        {deliveryHistory.length > 0 ? (
          deliveryHistory.map((item, i) => {
            const { name, description, date, tag, id } = item;

            return (
              <div
                className="p-8 bg-white rounded-3xl border border-color-purple-light-2 cursor-pointer"
                key={i}
                onClick={() =>
                  setDeliveryHistoryPath({
                    path: 'detail',
                    id,
                  })
                }
              >
                <div>
                  <p className="text-[1.6rem]">{name}</p>
                  <p className="text-[1.4rem] whitespace-nowrap text-ellipsis overflow-hidden text-gray-500 max-w-[20rem]">
                    {description}
                  </p>
                </div>

                <div className="text-[1.2rem] flex items-center justify-between pt-8">
                  <p className="text-gray-500">
                    {date.toLocaleString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <p
                    className={`py-1.5 px-4 rounded-2xl text-white bg-[#40AD6B]`}
                  >
                    {tag}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="grid gap-2 justify-center justify-items-center">
            <img src="/icons/search-normal.svg" alt="" className="w-[3rem]" />
            <p className="text-[1.6rem] font-medium">No order found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DeliveryHistory;
