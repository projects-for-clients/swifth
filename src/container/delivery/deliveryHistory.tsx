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
import { InProgress, INPROGRESS } from '../order/OrdersData';

interface Props {
  setOrderHistoryPath: Dispatch<SetStateAction<OrderHistoryPath>>;
  id?: number | null;
}

export const ListOrderHistory = () => {

    const { deliveryData } = useContext(DeliveryContext);

  useEffect(() => {
    const sortedDates = [...INPROGRESS].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    setOrderHistory(() => [...sortedDates]);
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
      const filtered = [...INPROGRESS].filter((item) => {
        const date = new Date(item.date);
        return (
          date.getTime() >= from.getTime() && date.getTime() <= to.getTime()
        );
      });

      setOrderHistory(() => [...filtered]);
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

  return (
    <>
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
        {orderHistory.length > 0 ? (
          orderHistory.map((item, i) => {
            const { name, description, date, tag, id } = item;

            return (
              <div
                className="p-8 bg-white rounded-3xl border border-color-purple-light-2 cursor-pointer"
                key={i}
                onClick={() =>
                  setOrderHistoryPath({
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



