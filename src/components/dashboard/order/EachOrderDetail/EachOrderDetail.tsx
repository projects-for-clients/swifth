import { useState, useEffect, FC, FormEvent } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { DialogType } from '../../../../container/dashboard/orders';
import { OrderHistoryDetail } from '../OrderHistory';
import { InProgress, filterByColors } from '../OrdersData';
import { Clearing } from './EachPath';

interface EachOrderDetail {
  handleCloseDialog: (type: DialogType) => void;
  orderDetail: InProgress;
}





const EachOrderDetail: FC<EachOrderDetail> = ({
  handleCloseDialog,
  orderDetail,
}) => {
  const [orderHistoryDetail, setOrderHistoryDetail] =
    useState<OrderHistoryDetail | null>(null);
  const [loaded, setLoaded] = useState(false);

  type Path = 'clearing' | 'history';

  const [currentPath, setCurrentPath] = useState<Path>('clearing');
  const [isAssignAgent, setIsAssignAgent] = useState(false);

  useEffect(() => {
    if (orderDetail) {
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

  if (orderHistoryDetail) {
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
  } = orderHistoryDetail || {};

  const switchPaths: Record<Path, JSX.Element> = {
    clearing: <Clearing />,
    history: <History />,
  };

  const InitialRender = () => {
    return (
      <div className=" h-full items-baseline w-[80rem]">
        <div className="flex gap-10 items-center">
          <BsArrowLeft
            className="text-[2.4rem] cursor-pointer"
            onClick={() => handleCloseDialog('eachOrder')}
          />
          <p className="text-[2rem] text-gray-600 text-center">Details</p>
        </div>
        {loaded && (
          <main className="grid gap-10 mt-10 ">
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

            <section className="">
              <div
                className="radioBox"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                }}
              >
                <input
                  type="radio"
                  name="order"
                  id="clearing"
                  className="hidden"
                  onChange={() => setCurrentPath('clearing')}
                  checked={currentPath === 'clearing'}
                />
                <label htmlFor="clearing" className="capitalize text-[1.6rem]">
                  Review/Clearing
                </label>

                <input
                  type="radio"
                  name="order"
                  id="history"
                  className="hidden"
                  checked={currentPath === 'history'}
                  onChange={() => setCurrentPath('history')}
                />
                <label htmlFor="history" className="capitalize text-[1.6rem]">
                  History
                </label>
              </div>

              <div className="mt-10">{switchPaths[currentPath]}</div>
            </section>
          </main>
        )}
      </div>
    );
  };

  const AssignAgentRender = () => {
    const [toDisplay, setToDisplay] = useState('hidden');
    const [toastDisplay, setToastDisplay] = useState('hidden');

    const goBack = () => {
      // setShowDetails({
      //   show: false,
      // });
      // setCurrentPath('quoteRequests');
    };

    const closeModal = () => {
      setToDisplay('hidden');
    };

    const handleQuoteSubmit = (e: FormEvent) => {
      e.preventDefault();
      setToastDisplay('flex');
    };

    useEffect(() => {
      if (toastDisplay === 'flex') {
        setTimeout(() => {
          setToastDisplay('hidden');
        }, 3000);
      }
    }, [toastDisplay]);

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
              Choose Field Agent
            </p>
          </div>
          <main className="grid gap-4 mt-20"></main>

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

  return <div>{isAssignAgent ? <AssignAgentRender /> : <InitialRender />}</div>;
};

export default EachOrderDetail;
