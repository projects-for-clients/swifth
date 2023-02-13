import {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  FC,
  FormEvent,
} from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { OrderHistoryPath } from '../../../container/dashboard/orders';
import CalenderSvg from '../../icons/Calender';
import { InProgress, ORDER_HISTORY } from './OrdersData';

interface Props {
  setOrderHistoryPath: Dispatch<SetStateAction<OrderHistoryPath>>;
  id?: number | null;
}

export const ListOrderHistory: FC<Props> = ({ setOrderHistoryPath }) => {
  const [orderHistory, setOrderHistory] = useState<InProgress[]>(ORDER_HISTORY);

  useEffect(() => {
    const sortedDates = ORDER_HISTORY.sort((a, b) => {
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
      const filtered = ORDER_HISTORY.filter((item) => {
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

export const OrderHistoryDetail: FC<Props> = ({ setOrderHistoryPath, id }) => {
  interface OrderHistoryDetail {
    id: number;
    title: string;
    carYear: string;
    carModel: string;
    carBrand: string;
    trim: string;
    port: string;
    terminal: string;
  }
  const [orderHistoryDetail, setOrderHistoryDetail] =
    useState<OrderHistoryDetail>({} as OrderHistoryDetail);

  const [toDisplay, setToDisplay] = useState('hidden');
  const [toastDisplay, setToastDisplay] = useState('hidden');

  useEffect(() => {
    const data = {
      id: id!,
      title: 'Jonathan Ogunleye',
      carYear: '2021',
      carModel: 'Toyota Corolla',
      carBrand: 'Toyota',
      trim: 'XLE',
      port: 'Lagos',
      terminal: 'Terminal 1',
    };
    setOrderHistoryDetail(data);
  }, [id]);

  const goBack = () => {
    setOrderHistoryPath({
      path: 'list',
      id: null,
    });
  };

  const { title, carYear, carModel, carBrand, trim, port, terminal } =
    orderHistoryDetail;

  const closeModal = () => {
    setToDisplay('hidden');
  };

  const handleQuoteSubmit = (e: FormEvent) => {
    e.preventDefault();
    setToastDisplay('flex');
  };

  return (
    <>
      <section
        className={`absolute top-0 left-0 right-0 bottom-0 grid content-end bg-[#000000ad] ${toDisplay}`}
        style={{
          gridTemplateRows: '1.2fr 1fr',
        }}
      >
        <div
          className={`absolute rounded-3xl bg-green-50 border border-green-300 py-8 px-4 text-green-700 flex items-center w-[36rem] mx-auto top-4 left-0 right-0 ${toastDisplay}`}
        >
          <span className="w-full text-center">Quote Sent!</span>
          <GrClose
            onClick={() => setToastDisplay('hidden')}
            className="cursor-pointer"
          />
        </div>
        <div onClick={closeModal}>&nbsp;</div>
        <form
          className="bg-white py-10 px-10 rounded-t-3xl"
          onSubmit={handleQuoteSubmit}
        >
          <p className="text-[1.6rem] text-gray-600 mb-8">Quote Amount</p>

          <div>
            <label htmlFor="amount" className="text-[1.4rem] text-gray-600">
              Enter Amount
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              required
              id="amount"
              className="w-full bg-gray-100 rounded-md py-6 px-3 outline-none"
            />
          </div>

          <button className="flex w-full h-full items-center ">
            <span className="bg-color-primary rounded-lg text-white w-full py-4">
              Send Quote
            </span>
          </button>
        </form>
      </section>

      <div className="px-5 h-full items-baseline ">
        <div className="flex">
          <BsArrowLeft
            className="text-[2.4rem] cursor-pointer"
            onClick={goBack}
          />
          <p className="text-[1.6rem] text-gray-600 w-full text-center">
            {title}
          </p>
        </div>
        <main className="grid gap-4 mt-20">
          <div className="flex justify-between items-center border-b border-b-color-red-light-1 py-4">
            <div>
              <p className="text-[1.4rem] text-gray-400">Car Year</p>
              <p className="text-[1.6rem] text-gray-600">{carYear}</p>
            </div>
            <div>
              <p className="text-[1.4rem] text-gray-400">Car Brand</p>
              <p className="text-[1.6rem] text-gray-600">{carBrand}</p>
            </div>
          </div>
          <div className="flex justify-between items-center border-b border-b-color-red-light-1 py-4">
            <div>
              <p className="text-[1.4rem] text-gray-400">Car Model</p>
              <p className="text-[1.6rem] text-gray-600">{carModel}</p>
            </div>
            <div>
              <p className="text-[1.4rem] text-gray-400">Trim</p>
              <p className="text-[1.6rem] text-gray-600">{trim}</p>
            </div>
          </div>
          <div className="flex justify-between items-center border-b border-b-color-red-light-1 py-4">
            <div>
              <p className="text-[1.4rem] text-gray-400">Port</p>
              <p className="text-[1.6rem] text-gray-600">{port}</p>
            </div>
            <div>
              <p className="text-[1.4rem] text-gray-400">Terminal</p>
              <p className="text-[1.6rem] text-gray-600">{terminal}</p>
            </div>
          </div>
        </main>

        <button
          className="flex w-full h-full items-center "
          onClick={() => setToDisplay('grid')}
        >
          <span className="bg-color-primary rounded-lg text-white w-full py-4">
            Send Quote
          </span>
        </button>
      </div>
    </>
  );
};
