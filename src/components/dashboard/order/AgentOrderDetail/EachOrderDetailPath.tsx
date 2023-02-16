import {
  useState,
  Fragment,
  Dispatch,
  SetStateAction,
  FC,
  FormEvent,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/app/hooks';
import { selectOrder } from '../../../../store/features/order/order';

interface AgentClearing {
  setIsAssignAgent: Dispatch<SetStateAction<boolean>>;
  orderId: number;
}

export const AgentClearing: FC<AgentClearing> = ({
  setIsAssignAgent,
  orderId,
}) => {
  const dispatch = useAppDispatch();
  const orderDetails = useAppSelector(selectOrder);
  const [isBOLApproved, setIsBOLApproved] = useState(false);

  const [selectedItem, setSelectedItem] = useState('');
  const [toDisplay, setToDisplay] = useState('hidden');

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
  ] as const;

  const assignAgentHandler = () => {
    setIsAssignAgent(true);
  };

  const [RCDocsItem, setRCDocsItem] = useState<{ key: string | null }>({
    key: null,
  });

  const handleRCDocChange = (item: string) => {
    setRCDocsItem((prev) => {
      if (prev.key === item) {
        return { key: null };
      }
      return { key: item };
    });
  };

  const handleSelectedItem = (item: string) => {
    setSelectedItem(item);

    if (item === 'Approve') {
      //dispatch(handleIsBOL(true));
    }

    if (item === 'Decline') {
      setToDisplay('grid');
    }

    setRCDocsItem({ key: null });
  };

  const closeModal = () => {
    setToDisplay('hidden');
  };

  const handleQuoteSubmit = (e: FormEvent) => {
    e.preventDefault();

    setToDisplay('hidden');
  };

  const { RCDocs, ordersData } = orderDetails;

  console.log({ RCDocs });
  return (
    <>
      <section
        className={`absolute top-0 left-0 right-0 bottom-0 grid content-end bg-[#000000ad] ${toDisplay} z-20`}
        style={{
          gridTemplateRows: '1.2fr 1fr',
        }}
      >
        <div onClick={closeModal}>&nbsp;</div>
        <form
          className="bg-white py-10 px-10 rounded-t-3xl"
          onSubmit={handleQuoteSubmit}
        >
          <p className="text-[1.6rem] text-gray-600 mb-8">
            Reject BOL - Leave a Comment
          </p>

          <div>
            <label htmlFor="comment" className="text-[1.4rem] text-gray-600">
              Comment
            </label>

            <textarea
              id="comment"
              placeholder="Enter Comment"
              required
              rows={3}
              className="w-full bg-gray-100 rounded-md py-6 px-3 outline-none"
            />
          </div>

          <button className="flex w-full items-center justify-end mt-10">
            <span className="text-red-600  border border-red-600 rounded-lg  py-4 basis-1/2">
              Reject BOL
            </span>
          </button>
        </form>
      </section>
      <div className="pt-10">
        <p className="text-gray-400 font-semibold text-[1.8rem]">RC Docs</p>

        <div
          className={`gap-4 mt-10 ${
            ordersData?.id === orderId ? 'flex' : 'grid'
          }`}
        >
          {RCDocs.map((doc, i) => (
            <Fragment key={i}>
              <div className="relative">
                <p
                  className="p-6 border cursor-pointer border-color-purple-light-2 rounded-3xl flex items-center justify-between"
                  onClick={() => handleRCDocChange(doc.name)}
                >
                  {doc.name}
                  {doc.status === 'Approved' ? (
                    <span>
                      <img src="/icons/tick-square.svg" alt="" />
                    </span>
                  ) : doc.status === 'Declined' ? (
                    <span>
                      <img src="/icons/close-square.svg" alt="" />
                    </span>
                  ) : null}
                </p>
                {RCDocsItem.key === doc.name && (
                  <div className="absolute top-[6rem] w-[25rem] right-0 shadow-lg bg-white rounded-xl grid gap-2 z-20 capitalize">
                    {selectFrom.map((item, i) => {
                      return (
                        <button
                          className={`text-[1.4rem] hover:bg-gray-100 p-4 text-left flex items-center gap-4 disabled:opacity-25 disabled:cursor-not-allowed ${
                            doc.submitted &&
                            item.name === 'Send submission reminder'
                              ? 'hidden'
                              : 'flex'
                          }`}
                          key={i}
                          disabled={
                            !doc.submitted &&
                            item.name !== 'Send submission reminder'
                          }
                          onClick={() => handleSelectedItem(item.name)}
                        >
                          <img src={item.imgUri} alt="" />
                          <span className={`${item.className} font-medium`}>
                            {item.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </Fragment>
          ))}
        </div>

        <div className=" flex w-full justify-end mt-10">
          <button
            className="border p-6 rounded-lg cursor-pointer border-color-primary text-color-primary disabled:opacity-50 disabled:cursor-not-allowed basis-1/2 "
            disabled={!isBOLApproved}
            onClick={assignAgentHandler}
          >
            Assign Field Agent
          </button>
        </div>
      </div>
    </>
  );
};

export const AgentOrderHistory = () => {
  return (
    <div>
      <p>History</p>
    </div>
  );
};
