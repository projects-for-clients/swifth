import { useState, useEffect, FC } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { DialogType } from '../../../container/dashboard/orders';
import { OrderHistoryDetail } from './OrderHistory';
import { InProgress, filterByColors } from './OrdersData';

interface EachOrderDetail {
  handleCloseDialog: (type: DialogType) => void;
  orderDetail: InProgress;
}

const Clearing = () => {
  return (
    <div>
      <p>Clearing</p>
    </div>
  );
};

const History = () => {
  return (
    <div>
      <p>History</p>
    </div>
  );
};

const EachOrderDetail: FC<EachOrderDetail> = ({
  handleCloseDialog,
  orderDetail,
}) => {
  const [orderHistoryDetail, setOrderHistoryDetail] =
    useState<OrderHistoryDetail | null>(null);
  const [loaded, setLoaded] = useState(false);

type Path = 'clearing' | 'history';

  const [currentPath, setCurrentPath] = useState<Path>('clearing');

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


  const switchPaths:Record<Path, JSX.Element> = {

    'clearing': <Clearing />,
    'history': <History />,
  }

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
                  name="order"
                  id="clearing"
                  className="hidden"
                  defaultChecked
                  onChange={() => setCurrentPath('clearing')}
                  checked={currentPath === 'clearing'}
                />
                <label htmlFor="clearing">Review/Clearing</label>

                <input
                  type="radio"
                  name="order"
                  id="history"
                  className="hidden"
                  checked={currentPath === 'history'}
                  onChange={() => setCurrentPath('history')}
                />
                <label htmlFor="history" className="capitalize">
                  History
                </label>
              </div>

                {switchPaths[currentPath]}
            </section>
          </main>
        )}
      </div>
    </>
  );
};

export default EachOrderDetail;
