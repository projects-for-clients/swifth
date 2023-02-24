import { useState, useContext } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { filterByColors } from '../OrdersData';
import { AgentOrderDetailContext } from './AgentOrderDetail';
import { AgentClearing, AgentOrderHistory } from './EachOrderDetailPath';

const InitialRender = () => {
  const agentDetailContext = useContext(AgentOrderDetailContext);

  const { orderHistoryDetail, handleCloseDialog } =
    agentDetailContext;

  type Path = 'AgentClearing' | 'AgentOrderHistory';

  const [currentPath, setCurrentPath] = useState<Path>('AgentClearing');

  const {
    id,
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
  } = orderHistoryDetail;

  const switchPaths: Record<Path, JSX.Element> = {
    AgentClearing: <AgentClearing />,
    AgentOrderHistory: <AgentOrderHistory />,
  };

  return (
    <div className=" h-full items-baseline w-[80rem] overflow-y-scroll pb-10">
      <div className="flex gap-10 items-center">
        <BsArrowLeft
          className="text-[2.4rem] cursor-pointer"
          onClick={() => handleCloseDialog('eachOrder')}
        />
        <p className="text-[2rem] text-gray-600 text-center">Details</p>
      </div>
      <main className="grid gap-10 mt-10  ">
        <div className="grid justify-start justify-items-start gap-4">
          <p className="text-[2rem] text-gray-600 text-center">{adminName}</p>
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
              onChange={() => setCurrentPath('AgentClearing')}
              checked={currentPath === 'AgentClearing'}
            />
            <label htmlFor="clearing" className="capitalize text-[1.6rem]">
              Review/Clearing
            </label>

            <input
              type="radio"
              name="order"
              id="history"
              className="hidden"
              checked={currentPath === 'AgentOrderHistory'}
              onChange={() => setCurrentPath('AgentOrderHistory')}
            />
            <label htmlFor="history" className="capitalize text-[1.6rem]">
              History
            </label>
          </div>

          <div className="mt-10 mb-20 h-[50rem]">
            {switchPaths[currentPath]}
          </div>
        </section>
      </main>
    </div>
  );
};

export default InitialRender;
