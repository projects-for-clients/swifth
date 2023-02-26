import { FC, Fragment, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
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

  const keys: Keys[] = [
    'All documents submitted',
    'Delivery ready',
    'Payments completed',
    'Delivered',
  ];

  const [keyItem, setkeyItem] = useState<Keys | null>(null);
  const accordianHandler = (item: Keys) => {
    setkeyItem((prev) => {
      if (prev === item) {
        return null;
      }
      return item;
    });
  };

  return (
    <div className=" h-full items-baseline w-[80rem] overflow-y-scroll pb-10">
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
              className={`py-1.5 px-4 rounded-2xl ${filterByColors[deliveryData.tag].bg} ${filterByColors[deliveryData.tag].text}`}
            >
              {' '}
              {deliveryData.tag}
            </p>
          </div>

          <section className="grid gap-[2rem]">
            {keys.map((doc, i) => (
              <Fragment key={doc}>
                <div className="grid relative">
                  <button
                    className={` w-full `}
                    onClick={() => accordianHandler(doc)}
                  >
                    <div className="flex justify-between cursor-pointer">
                      <p className=" text-color-purple-1 flex items-center gap-6">
                        <div>
                          <img
                            src="/icons/check-success.svg"
                            alt=""
                            className="w-[2.4rem] relative z-[2]"
                          />
                          {i !== keys.length - 1 && (
                            <span className="accordion__line"></span>
                          )}
                        </div>
                        <span>{doc}</span>
                      </p>
                      <p className="text-color-purple flex items-center gap-4">
                        <span className="text-gray-600 text-[1.4rem]">
                          Dec 3, 2023
                        </span>{' '}
                        {keyItem === doc ? (
                          <img src="/icons/arrow-circle-up.svg" alt="" />
                        ) : (
                          <img src="/icons/arrow-circle-down.svg" alt="" />
                        )}
                      </p>
                    </div>
                  </button>
                  {keyItem === doc && i !== keys.length - 1 ? (
                    <div
                      className={`grid mt-10 gap-8 px-16 ${
                        keyItem === doc ? 'visible h-auto' : 'invisible h-0'
                      }`}
                    >
                      <div className=" border-b-color-purple-light-2 flex justify-between">
                        <p className="text-[1.4rem] text-color-purple-1">
                          All Documents
                        </p>
                      </div>
                      <div className=" border-b-color-purple-light-2 flex justify-between">
                        <p className="text-[1.4rem] text-color-purple-1">
                          All Documents
                        </p>
                      </div>
                    </div>
                  ) : keyItem === doc && i === keys.length - 1 ? (
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
      <button>Go to Orders</button>
    </div>
  );
};

export default DialogDetails;
