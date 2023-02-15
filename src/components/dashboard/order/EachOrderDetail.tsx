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
  const [isBillOfLading, setIsBillOfLading] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const selectFrom = [
    {
      imgUri: '/icons/notification.svg',
      name: 'Send submission reminder',
      className: 'text-color-dark-3',
    },
    {
      imgUri: '/icons/document-upload.svg',
      name: 'Open',
      className: 'text-color-dark-3',
    },
    {
      imgUri: '/icons/tick-square.svg',
      name: 'Approve',
      className: 'text-color-primary',
    },
    {
      imgUri: '/icons/close-square.svg',
      name: 'Decline',
      className: 'text-red-600',
    },
  ];

  const clearingDocs = [
    {
      name: 'Bills of Lading',
      submitted: true,
    },
    {
      name: 'Releases',
      submitted: true,
    },
    {
      name: 'CAC',
      submitted: false,
    },
    {
      name: 'Signed POA',
      submitted: false,
    },
  ] as const;

  const assignAgentHandler = () => {
    console.log('Assigning Agent');
  };

  const [toggleSortMenu, setToggleSortMenu] = useState<{ key: string | null }>({
    key: null,
  });

  const sortMenuToggler = (item: string) => {
    setToggleSortMenu((prev) => {
      if (prev.key === item) {
        return { key: null };
      }
      return { key: item };
    });
  };

  const handleSelectedItem = (item: string) => {
    setSelectedItem(item);

    if (item === 'Approve') {
      setIsBillOfLading(true);
    }
    setToggleSortMenu({ key: null });
  };

  return (
    <div className="py-10">
      <p className="text-gray-400 font-semibold text-[1.8rem]">RC Docs</p>

      <div className="grid gap-4 mt-10 ">
        {clearingDocs.map((doc, i) => (
          <>
            <div key={i} className="relative">
              <p
                className="p-6 border cursor-pointer border-color-purple-light-2 rounded-3xl flex items-center justify-between"
                onClick={() => sortMenuToggler(doc.name)}
              >
                {doc.name}
                {isBillOfLading && doc.name === 'Bills of Lading' && (
                  <span>
                    <img src="/icons/tick-square.svg" alt="" />
                  </span>
                )}
              </p>
              {toggleSortMenu.key === doc.name && (
                <div className="absolute top-[6rem] w-[25rem] right-0 shadow-lg bg-white rounded-xl grid gap-2 z-20 capitalize">
                  {selectFrom.map((item) => (
                    <button
                      className="text-[1.4rem] hover:bg-gray-100 p-4 text-left flex items-center gap-4"
                      key={item.name}
                      disabled={!doc.submitted}
                      onClick={() => handleSelectedItem(item.name)}
                    >
                      <img src={item.imgUri} alt="" />
                      <span className={`${item.className} font-semibold`}>
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        ))}
      </div>

      <div className=" flex w-full justify-end mt-10">
        <button
          className="border p-6 rounded-lg cursor-pointer border-color-primary text-color-primary disabled:opacity-50 disabled:cursor-not-allowed basis-1/2 "
          disabled={!isBillOfLading}
          onClick={assignAgentHandler}
        >
          Assign Field Agent
        </button>
      </div>
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

  const switchPaths: Record<Path, JSX.Element> = {
    clearing: <Clearing />,
    history: <History />,
  };

  return (
    <>
      <div className=" h-full items-baseline  ">
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
    </>
  );
};

export default EachOrderDetail;
