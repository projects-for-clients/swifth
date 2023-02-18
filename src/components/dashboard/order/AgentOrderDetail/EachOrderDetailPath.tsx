import {
  useState,
  Fragment,
  Dispatch,
  SetStateAction,
  FC,
  FormEvent,
  useEffect,
  EffectCallback,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/app/hooks';
import {
  DocsContent,
  RCDocsKeys,
  selectOrder,
  updateClearingDoc,
  updateRCDocs,
} from '../../../../store/features/order/order';

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

  const [toDisplay, setToDisplay] = useState('hidden');

  const [RCDocsItem, setRCDocsItem] = useState<{ key: string | null }>({
    key: null,
  });
  const [clearingDocItem, setclearingDocItem] = useState<{
    key: string | null;
  }>({
    key: null,
  });

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedClearingItem, setSelectedClearingItem] = useState<
    string | null
  >(null);
  const [openToolTip, setOpenToolTip] = useState(false);
  const [openClearingDocToolTip, setOpenClearingDocToolTip] = useState(false);

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

  const selectClearingOptions = [
    {
      imgUri: '/icons/document-upload.svg',
      name: 'Upload clearing Agent',
      className: 'text-color-dark-3',
    },
    {
      imgUri: '/icons/user-tick.svg',
      name: 'Assign Field Agent',
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

  useEffect(() => {
    setOpenToolTip(false);
    setRCDocsItem({ key: null });
    setOpenClearingDocToolTip(false);
    setclearingDocItem({ key: null });
  }, [orderId]);

  const handleRCDocChange = (item: string) => {
    setRCDocsItem((prev) => {
      if (prev.key === item) {
        return { key: null };
      }
      return { key: item };
    });
    setOpenToolTip(true);
  };
  const handleClearingDocChange = (item: string) => {
    setclearingDocItem((prev) => {
      if (prev.key === item) {
        return { key: null };
      }
      return { key: item };
    });

    setOpenClearingDocToolTip(true);
  };

  const handleSelectedClearingDocItem = (item: string) => {
    if (item === 'Approve' && clearingDocItem.key) {
      setOpenClearingDocToolTip(false);
      setSelectedClearingItem(clearingDocItem.key);
      setclearingDocItem({ key: null });

      dispatch(
        updateClearingDoc({
          orderId,
          content: {
            name: clearingDocItem.key as RCDocsKeys,
            submitted: true,
            status: 'Approved',
          },
        })
      );
    }

    if (item === 'Decline') {
      setToDisplay('grid');
      setOpenClearingDocToolTip(false);
    }
  };

  const handleSelectedItem = (item: string) => {
    if (item === 'Approve' && RCDocsItem.key) {
      setOpenToolTip(false);
      setSelectedItem(RCDocsItem.key);
      setRCDocsItem({ key: null });

      dispatch(
        updateRCDocs({
          orderId,
          content: {
            name: RCDocsItem.key as RCDocsKeys,
            submitted: true,
            status: 'Approved',
          },
        })
      );
      dispatch(
        updateRCDocs({
          orderId,
          content: {
            name: 'CAC',
            submitted: true,
            status: 'Approved',
          },
        })
      );
    }

    if (item === 'Decline') {
      setToDisplay('grid');
      setOpenToolTip(false);
    }
  };

  const closeModal = () => {
    setToDisplay('hidden');
  };

  const handleRejectBOL = (e: FormEvent) => {
    e.preventDefault();

    setToDisplay('hidden');
    dispatch(
      updateRCDocs({
        orderId,
        content: {
          name: RCDocsItem.key as RCDocsKeys,
          submitted: true,
          status: 'Declined',
        },
      })
    );
  };

  const { RCDocsArr, ordersData, clearingDocsArr } = orderDetails;

  let RCDocContent = [] as DocsContent[];
  let clearingDocContent = [] as DocsContent[];

  const isBOLApproved = RCDocsArr.some((RCDoc) => {
    if (RCDoc.orderId === orderId) {
      RCDocContent = RCDoc.content;
      return RCDoc.content.some(
        (doc) => doc.name === 'Bills of Lading' && doc.status === 'Approved'
      );
    }
  });

  clearingDocsArr.find((clearingDoc) => {
    if (clearingDoc.orderId === orderId) {
      return (clearingDocContent = clearingDoc.content);
    }
  });

  const isOrderAssignedAgent = ordersData.find(
    (order) => order.id === orderId && order.assignedAgent
  );

  const handleNextDocAction = () => {};

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
          onSubmit={handleRejectBOL}
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
            isOrderAssignedAgent ? 'flex w-full' : 'grid'
          }`}
        >
          {RCDocContent.map((doc, i) => (
            <Fragment key={i}>
              <div className="relative">
                <p
                  className={`p-6 border cursor-pointer border-color-purple-light-2 rounded-3xl flex items-center justify-between gap-4 whitespace-nowrap ${
                    isOrderAssignedAgent ? 'w-[18rem]' : ''
                  }`}
                  onClick={() => handleRCDocChange(doc.name)}
                >
                  {doc.name}

                  {(isOrderAssignedAgent && doc.status === 'Approved') ||
                  selectedItem === doc.name ? (
                    <span>
                      <img src="/icons/tick-square.svg" alt="" />
                    </span>
                  ) : doc.status === 'Declined' ? (
                    <span>
                      <img src="/icons/close-square.svg" alt="" />
                    </span>
                  ) : null}
                </p>
                {openToolTip && RCDocsItem.key === doc.name && (
                  <div
                    className={`absolute top-[6rem] w-[25rem] shadow-lg bg-white rounded-xl grid gap-2 z-20 capitalize ${
                      isOrderAssignedAgent ? 'left-0' : 'right-0 '
                    }`}
                  >
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
        {isOrderAssignedAgent && (
          <div className="grid gap-4 mt-10 ">
            <p className="text-gray-400 font-semibold text-[1.8rem]">
              Clearing
            </p>

            {clearingDocContent.map((doc, i) => (
              <Fragment key={i}>
                <div className="relative">
                  <p
                    className={`p-6 border cursor-pointer border-color-purple-light-2 rounded-3xl flex items-center justify-between gap-4 whitespace-nowrap `}
                    onClick={() => handleClearingDocChange(doc.name)}
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
                  {openClearingDocToolTip &&
                    clearingDocItem.key === doc.name && (
                      <div
                        className={`absolute top-[6rem] w-[25rem] shadow-lg bg-white rounded-xl grid gap-2 z-20 capitalize right-0 `}
                      >
                        {selectClearingOptions.map((item, i) => {
                          return (
                            <button
                              className={`text-[1.4rem] hover:bg-gray-100 p-4 text-left flex items-center gap-4 disabled:opacity-25 disabled:cursor-not-allowed `}
                              key={i}
                              onClick={() =>
                                handleSelectedClearingDocItem(item.name)
                              }
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
        )}
        <div className=" flex w-full justify-end mt-10">
          {isOrderAssignedAgent ? (
            <button
              className="border p-6 rounded-lg cursor-pointer text-white border-color-primary bg-color-primary disabled:opacity-50 disabled:cursor-not-allowed basis-1/2 "
              disabled={!isBOLApproved}
              onClick={handleNextDocAction}
            >
              Next
            </button>
          ) : (
            <button
              className="border p-6 rounded-lg cursor-pointer border-color-primary text-color-primary disabled:opacity-50 disabled:cursor-not-allowed basis-1/2 "
              disabled={!isBOLApproved}
              onClick={assignAgentHandler}
            >
              Assign Field Agent
            </button>
          )}
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
