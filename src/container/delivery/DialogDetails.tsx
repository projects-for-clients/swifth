import { FC, Fragment, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import NotificationSvg from '../../components/icons/notificationSvg';
import { RCDocs } from '../../store/features/order/order';
import { DeliveryData, filterByColors } from './DeliveryPath';

interface DialogDetailsProps {
  deliveryData: DeliveryData;
  handleCloseDialog: () => void;
}

const DialogDetails: FC<DialogDetailsProps> = ({
  deliveryData,
  handleCloseDialog,
}) => {
  type Keys =
    | 'Delivery ready'
    | 'All documents submitted'
    | 'Payments completed'
    | 'Delivered';

  interface Steps {
    key: Keys;
    status: 'success' | 'pending' | 'idle';
  }

  const steps: Steps[] = [
    {
      key: 'Delivery ready',
      status: 'success',
    },
    {
      key: 'All documents submitted',
      status: 'success',
    },
    {
      key: 'Payments completed',
      status: 'pending',
    },
    {
      key: 'Delivered',
      status: 'success',
    },
  ];

  const allStagesCompleted = steps.every((step) => step.status === 'success');

  const [keyItem, setkeyItem] = useState<Keys | null>(null);
  const accordianHandler = (item: Keys) => {
    setkeyItem((prev) => {
      if (prev === item) {
        return null;
      }
      return item;
    });
  };

  const accordianContent: Record<Keys, JSX.Element> = {
    'Delivery ready': (
      <div className=" flex justify-between border-b border-b-color-purple-light-2">
        <p className="text-[1.4rem] text-gray-500">
          James Ibori marked {deliveryData.name}'s item as delivered
        </p>
      </div>
    ),
    'All documents submitted': (
      <>
        {RCDocs.content.map((doc, i) => {
          return (
            <div key={i} className="flex items-center justify-between">
              <p className="text-[1.4rem] text-gray-600">{doc.name}</p>

              {doc.submitted ? (
                <div className="text-color-primary flex gap-2 items-center">
                  <img
                    src="/icons/tick-square.svg"
                    alt=""
                    className="w-[2rem]"
                  />
                  <p className="text-[1.4rem]">Approved</p>
                </div>
              ) : (
                <div className="text-gray-500 flex items-center gap-2">
                  <NotificationSvg fill={'#787F8A'} width={20} />
                  <p className="text-[1.4rem]">Send submission reminder</p>
                </div>
              )}
            </div>
          );
        })}
      </>
    ),
    'Payments completed': (
      <>
        {RCDocs.content.map((doc, i) => {
          return (
            <div key={i} className="flex items-center justify-between">
              <p className="text-[1.4rem] text-gray-600">{doc.name}</p>

              <div className="text-color-primary flex gap-2 items-center">
                <img src="/icons/tick-square.svg" alt="" className="w-[2rem]" />
                <p className="text-[1.4rem]">Paid</p>
              </div>
            </div>
          );
        })}
      </>
    ),
    Delivered: (
      <>
        <p className="text-[1.4rem] text-gray-500">
          James Ibori marked {deliveryData?.name}'s item as delivered Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit ullam exercitationem aliquam adipisci, distinctio praesentium earum impedit amet tempora ducimus veritatis placeat officiis omnis assumenda doloribus quisquam dolores accusamus explicabo.
        </p>

        <div
          className={`flex border border-color-purple-light rounded-lg py-8 px-10 items-center gap-6 cursor-pointer text-[1.4rem] w-full h-[8rem]
                              `}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eligendi, aut voluptates explicabo a voluptatum officiis, ullam voluptas exercitationem deleniti ut facilis? Pariatur debitis, reprehenderit aspernatur dolorum eligendi commodi alias?
          <img src="/icons/admin/upload.svg" alt="" />

          <a href="/images/document.jpg" download className="grid">
            <p className="text-[1.4rem]">Proof of Delivery</p>
            <p className="text-color-grey-4 text-[1rem]">520KB</p>
          </a>
        <button className="btn border border-color-primary bg-color-primary text-white rounded-2xl absolute bottom-[5rem] right-[1rem] disabled:cursor-not-allowed disabled:opacity-50 " disabled={allStagesCompleted}>
          Mark as Delivered
        </button>
        </div>

      </>
    ),
  };


  return (
    <div className=" h-full items-baseline w-[80rem] overflow-y-scroll pb-10 relative">
      <>
        <div className="flex gap-10 items-center">
          <BsArrowLeft
            className="text-[2.4rem] cursor-pointer"
            onClick={() => handleCloseDialog()}
          />
          <p className="text-[2rem] text-gray-600 text-center">Details</p>
        </div>
        <main className="grid gap-16 mt-10  ">
          <div className="grid justify-start justify-items-start gap-4">
            <p className="text-[2rem] text-gray-600 text-center">
              {deliveryData.name}
            </p>
            <p
              className={`py-1.5 px-4 rounded-2xl ${
                filterByColors[deliveryData.tag].bg
              } ${filterByColors[deliveryData.tag].text}`}
            >
              {' '}
              {deliveryData.tag}
            </p>
          </div>

          <section className="grid gap-[2rem]">
            {steps.map((step, i) => (
              <Fragment key={step.key}>
                <div className="grid relative">
                  <button
                    className={` w-full disabled:opacity-50 disabled:cursor-not-allowed `}
                    onClick={() => accordianHandler(step.key)}
                    disabled={step.status === 'idle'}
                  >
                    <div className="flex justify-between cursor-pointer">
                      <p className=" text-color-purple-1 flex items-center gap-6">
                        <div>
                          {step.status === 'success' ? (
                            <img
                              src="/icons/check-success.svg"
                              alt=""
                              className="w-[2.4rem]"
                            />
                          ) : step.status === 'pending' ? (
                            <img
                              src="/icons/check-pending.svg"
                              alt=""
                              className="w-[2.4rem]"
                            />
                          ) : (
                            <img
                              src="/icons/check-empty.svg"
                              alt=""
                              className="w-[2.4rem]"
                            />
                          )}

                          {i !== steps.length - 1 && (
                            <span
                              className={`absolute w-[1px] bg-color-purple-2 z-[1] ${
                                keyItem ? 'h-[97%]' : 'h-[90%]'
                              }`}
                            ></span>
                          )}
                        </div>
                        <span
                          className={`${
                            keyItem === step.key ? 'font-semibold' : ''
                          }`}
                        >
                          {step.key}
                        </span>
                      </p>
                      {step.status !== 'idle' && (
                        <p className="text-color-purple flex items-center gap-4">
                          {i === 0 && (
                            <span className="text-gray-600 text-[1.4rem]">
                              Dec 3, 2023
                            </span>
                          )}

                          {keyItem === step.key ? (
                            <img src="/icons/arrow-circle-up.svg" alt="" />
                          ) : (
                            <img src="/icons/arrow-circle-down.svg" alt="" />
                          )}
                        </p>
                      )}
                    </div>
                  </button>
                  {keyItem === step.key && i !== steps.length - 1 ? (
                    <div
                      className={`grid gap-8 pl-16 py-5 ${
                        keyItem === step.key
                          ? 'visible h-auto'
                          : 'invisible h-0'
                      }`}
                    >
                      {accordianContent[step.key]}





                    </div>
                  ) : keyItem === step.key && i === steps.length - 1 ? (
                    <div className="grid gap-8 px-16 my-8">
                      <p className="text-[1.4rem] text-gray-500">
                        James Ibori marked {deliveryData.name}'s item as
                        delivered
                      </p>

                      <div
                        className={`flex border border-color-purple-light rounded-lg py-8 px-10 items-center gap-6 cursor-pointer text-[1.4rem] w-full h-[8rem]
                              `}
                      >
                        <img src="/icons/admin/upload.svg" alt="" />

                        <div className="grid">
                          <p className="text-[1.4rem]">Proof of Delivery</p>
                          <p className="text-color-grey-4 text-[1rem]">520KB</p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </Fragment>
            ))}
          </section>
        </main>
      </>
      <button className="btn border border-color-primary text-color-primary rounded-2xl absolute bottom-[5rem] right-[1rem] w-1/2" >
        Go to Orders
      </button>
    </div>
  );
};

export default DialogDetails;
