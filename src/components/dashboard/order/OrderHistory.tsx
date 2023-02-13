import {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  FC,
} from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import {
  DialogType,
  OrderHistoryPath,
} from '../../../container/dashboard/orders';
import CalenderSvg from '../../icons/Calender';
import { filterByColors, InProgress, InProgressFilterBy, ORDER_HISTORY } from './OrdersData';

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
    adminName: string;
    agentName: string;
    amountPaid: number;
    date: Date;
    totalAmount: number;
    carTrim: string;
    carYear: string;
    carModel: string;
    carBrand: string;
  }

  const data = {
    id: id!,
    adminName: 'Jonathan Ogunleye',
    agentName: 'James Ibori',
    carYear: '2021',
    carModel: 'Toyota Corolla',
    carBrand: 'Toyota',
    carTrim: 'XLE',
    amountPaid: 1000000,
    date: new Date(),
    totalAmount: 20000000,
  } satisfies OrderHistoryDetail;

  const [orderHistoryDetail, setOrderHistoryDetail] =
    useState<OrderHistoryDetail>(data);

  const goBack = () => {
    setOrderHistoryPath({
      path: 'list',
      id: null,
    });
  };

  const {
    adminName,
    agentName,
    carBrand,
    carModel,
    date,
    carTrim,
    carYear,
    amountPaid,
    totalAmount,
  } = orderHistoryDetail;

  return (
    <>
      <div className=" h-full items-baseline ">
        <div className="flex gap-10 items-center">
          <BsArrowLeft
            className="text-[2.4rem] cursor-pointer"
            onClick={goBack}
          />
          <p className="text-[2rem] text-gray-600 text-center">Details</p>
        </div>
        <main className="grid gap-10 mt-10">
          <div className="grid justify-start justify-items-start gap-4">
            <p className="text-[2rem] text-gray-600 text-center">{adminName}</p>
            <p
              className={`py-1.5 px-8 rounded-2xl text-white text-center bg-[#40AD6B]`}
            >
              Completed
            </p>{' '}
          </div>
          <section
            className="grid gap-10"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
            }}
          >
            <div>
              <p className=" text-gray-400">Agent</p>
              <p className=" text-gray-600">{agentName}</p>
            </div>
            <div>
              <p className=" text-gray-400">Date</p>
              <p className=" text-gray-600">
                {date.toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div>
              <p className=" text-gray-400">Amount Paid</p>
              <p className=" text-gray-600">
                {amountPaid.toLocaleString('en-GB', {
                  style: 'currency',
                  currency: 'NGN',
                })}
              </p>
            </div>
            <div>
              <p className=" text-gray-400">Total Amount</p>
              <p className=" text-gray-600">
                {totalAmount.toLocaleString('en-GB', {
                  style: 'currency',
                  currency: 'NGN',
                })}
              </p>{' '}
            </div>
          </section>
          <section
            className="grid gap-10 border border-color-purple-light p-8 rounded-2xl"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
            }}
          >
            <div>
              <p className=" text-gray-400">Car Brand</p>
              <p className=" text-gray-600">{carBrand}</p>
            </div>
            <div>
              <p className=" text-gray-400">Car Year</p>
              <p className=" text-gray-600">{carYear}</p>
            </div>
            <div>
              <p className=" text-gray-400">Car Model</p>
              <p className=" text-gray-600">{carModel}</p>
            </div>
            <div>
              <p className=" text-gray-400">Car Trim</p>
              <p className=" text-gray-600">{carTrim}</p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export interface OrderHistoryDetail {
  id: number;
  adminName: string;
  agentName: string;
  amountPaid: number;
  date: Date;
  tag: InProgressFilterBy;
  totalAmount: number;
  carTrim: string;
  carYear: string;
  carModel: string;
  carBrand: string;
}

interface EachOrderDetail {
  handleCloseDialog: (type: DialogType) => void;
  orderDetail: InProgress;
}

export const EachOrderDetail: FC<EachOrderDetail> = ({
  handleCloseDialog,
  orderDetail,
}) => {
  const [orderHistoryDetail, setOrderHistoryDetail] =
    useState<OrderHistoryDetail | null>(null);
    const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (orderDetail){

      setOrderHistoryDetail({
        ...orderDetail,
        date: new Date(orderDetail.date),
        adminName: orderDetail.name,
        agentName: 'James Ibori',
        carYear: '2021',
        carModel: 'Toyota Corolla',
        carBrand: 'Toyota',
        carTrim: 'XLE',
        amountPaid: 1000000,
        totalAmount: 20000000,
      });
      setLoaded(true);
    }
  }, [orderDetail]);

  if(orderHistoryDetail){
    
  }
  const {
    adminName,
    agentName,
    carBrand,
    carModel,
    date,
    tag,
    carTrim,
    carYear,
    amountPaid,
    totalAmount,
  } = orderHistoryDetail || {} ;


  return (
    <>
      <div className=" h-full items-baseline ">
        <div className="flex gap-10 items-center">
          <BsArrowLeft
            className="text-[2.4rem] cursor-pointer"
            onClick={() => handleCloseDialog('eachOrder')}
          />
          <p className="text-[2rem] text-gray-600 text-center">Details</p>
        </div>
        {loaded && (
          <main className="grid gap-10 mt-10">
            <div className="grid justify-start justify-items-start gap-4">
              <p className="text-[2rem] text-gray-600 text-center">
                {adminName}
              </p>
              <p
                className={`py-1.5 px-8 rounded-2xl text-white ${
                  filterByColors[tag!].bg
                } ${filterByColors[tag!].text}`}
              >
                {tag}
              </p>{' '}
            </div>
            <section
              className="grid gap-10"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
              }}
            >
              <div>
                <p className=" text-gray-400">Agent</p>
                <p className=" text-gray-600">{agentName}</p>
              </div>
              <div>
                <p className=" text-gray-400">Date</p>
                <p className=" text-gray-600">
                  {date?.toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className=" text-gray-400">Amount Paid</p>
                <p className=" text-gray-600">
                  {amountPaid?.toLocaleString('en-GB', {
                    style: 'currency',
                    currency: 'NGN',
                  })}
                </p>
              </div>
              <div>
                <p className=" text-gray-400">Total Amount</p>
                <p className=" text-gray-600">
                  {totalAmount?.toLocaleString('en-GB', {
                    style: 'currency',
                    currency: 'NGN',
                  })}
                </p>{' '}
              </div>
            </section>
            <section
              className="grid gap-10 border border-color-purple-light p-8 rounded-2xl"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
              }}
            >
              <div>
                <p className=" text-gray-400">Car Brand</p>
                <p className=" text-gray-600">{carBrand}</p>
              </div>
              <div>
                <p className=" text-gray-400">Car Year</p>
                <p className=" text-gray-600">{carYear}</p>
              </div>
              <div>
                <p className=" text-gray-400">Car Model</p>
                <p className=" text-gray-600">{carModel}</p>
              </div>
              <div>
                <p className=" text-gray-400">Car Trim</p>
                <p className=" text-gray-600">{carTrim}</p>
              </div>
            </section>

            <section>
              <div
                className="radioBox"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                }}
              >
                <input
                  type="radio"
                  name="notification"
                  id="all"
                  className="hidden"
                  // onChange={() => setCurrentPath('all')}
                  // checked={currentPath === 'all'}
                />
                <label htmlFor="all">All</label>

                <input
                  type="radio"
                  name="notification"
                  id="quoteRequests"
                  className="hidden"
                  // checked={currentPath === 'quoteRequests'}
                  // onChange={() => setCurrentPath('quoteRequests')}
                />
                <label htmlFor="quoteRequests" className="capitalize">
                  Quote Requests
                </label>
              </div>
            </section>
          </main>
        )}
      </div>
    </>
  );
};
