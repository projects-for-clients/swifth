import { useState, useEffect, FC } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { DialogType } from "../../../../container/dashboard/orders";
import { OrderHistoryDetail } from "../OrderHistory";
import { filterByColors } from "../OrdersData";
import { AgentClearing, AgentOrderHistory } from "./EachOrderDetailPath";


interface InitialRender {
  orderHistoryDetail: OrderHistoryDetail;
  handleCloseDialog: (type: DialogType) => void;
}

const InitialRender:FC<InitialRender> = ({orderHistoryDetail, handleCloseDialog}) => {
   

    type Path = 'AgentClearing' | 'AgentOrderHistory';

    const [currentPath, setCurrentPath] = useState<Path>('AgentClearing');
    const [isAssignAgent, setIsAssignAgent] = useState(false);

  
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
    } = orderHistoryDetail ;

    const switchPaths: Record<Path, JSX.Element> = {
      AgentClearing: <AgentClearing setIsAssignAgent={setIsAssignAgent} />,
      AgentOrderHistory: <AgentOrderHistory />,
    };
    
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

            <div className="mt-10">{switchPaths[currentPath]}</div>
          </section>
        </main>
      )}
    </div>
  );
};

export default InitialRender
