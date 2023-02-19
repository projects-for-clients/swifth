import {
  useState,
  Fragment,
  FormEvent,
  useEffect,
  useContext,
  ChangeEvent,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/app/hooks';
import {
  ClearingKeys,
  DocsContent,
  RCDocsKeys,
  selectOrder,
  updateClearingDoc,
  updateRCDocs,
} from '../../../../store/features/order/order';
import { getPhotoUri } from '../../../../utils/getPhotoUri';
import { AgentOrderDetailContext } from './AgentOrderDetail';

export const AgentClearing = () => {
  const dispatch = useAppDispatch();
  const orderDetails = useAppSelector(selectOrder);
  const agentDetailContext = useContext(AgentOrderDetailContext);

  const { setShowAssignAgentView, orderId, setUpdateDocsPayload } =
    agentDetailContext;

  const [toDisplay, setToDisplay] = useState<{
    docType?: 'RCDoc' | 'clearingDoc';
    display: 'hidden' | 'grid';
  }>({
    display: 'hidden',
  });

  const [RCDocsItem, setRCDocsItem] = useState<{ key: string | null }>({
    key: null,
  });
  const [clearingDocItem, setclearingDocItem] = useState<{
    key: ClearingKeys | null;
  }>({
    key: null,
  });

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedClearingItem, setSelectedClearingItem] =
    useState<ClearingKeys | null>(null);
  const [openToolTip, setOpenToolTip] = useState(false);
  const [openClearingDocToolTip, setOpenClearingDocToolTip] = useState(false);

  const [imgUris, setImgUris] = useState<Record<ClearingKeys, string>>({
    Valuating: '',
    'Custom Releasing': '',
    'Duty Processing': '',
  });

  const [toUploadCount, setToUploadCount] = useState(1)

  const keyProps = {
    error: false,
    message: null,
    size: '',
    pathName: '',
  };

  const [imageDetails, setImageDetails] = useState<
    Record<ClearingKeys, typeof keyProps>
  >({
    Valuating: keyProps,
    'Custom Releasing': keyProps,
    'Duty Processing': keyProps,
  });

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
      imgUri: '/icons/document-upload2.svg',
      name: 'Upload clearing Document',
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

  type ClearingOptionName = typeof selectClearingOptions[number]['name'];

  const assignRCDocAgent = () => {
    setShowAssignAgentView({
      show: true,
      whichDoc: 'RCDoc',
    });
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
  const handleClearingDocChange = (item: ClearingKeys) => {
    setclearingDocItem(({ key }) => {
      if (key === item) {
        return { key: null };
      }
      return { key: item };
    });

    setOpenClearingDocToolTip(true);
  };

  const handleSelectedClearingDocItem = (item: ClearingOptionName) => {
    if (item === 'Assign Field Agent') {
      if (selectedClearingItem) {
        setUpdateDocsPayload({
          orderId,
          content: {
            name: selectedClearingItem,
          },
        });
      }

      setShowAssignAgentView({
        show: true,
        whichDoc: 'clearingDoc',
      });
    }

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
      setToDisplay({
        docType: 'clearingDoc',
        display: 'grid',
      });
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
      setToDisplay({
        docType: 'RCDoc',
        display: 'grid',
      });
      setOpenToolTip(false);
    }
  };

  const closeModal = () => {
    setToDisplay({ display: 'hidden' });
  };

  const handleRejectBOL = (e: FormEvent) => {
    e.preventDefault();

    setToDisplay({
      display: 'hidden',
    });
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
  const handleRejectClearingDoc = (e: FormEvent) => {
    e.preventDefault();

    setToDisplay({
      display: 'hidden',
    });
    dispatch(
      updateClearingDoc({
        orderId,
        content: {
          name: clearingDocItem.key as ClearingKeys,
          submitted: true,
          status: 'Declined',
        },
      })
    );
  };

  const uploadUriHandler = async (key: ClearingKeys) => {
    const getUri = await getPhotoUri(key);

    setImgUris((prev) => ({ ...prev, [key]: getUri }));
  };

  const formUploadHandler = (
    e: ChangeEvent<HTMLInputElement>,
    key: ClearingKeys
  ) => {
    setOpenClearingDocToolTip(false);
    setclearingDocItem({ key: null });

    const fileObj = e.target as HTMLInputElement;

    const { name } = fileObj.files![0];
    const path = fileObj.files![0];

    const size = path.size / 1000;

    const KBSize = size.toString().split('.')[0];

    if (KBSize.length > 3) {
      const MBSize = Number(KBSize) / 1000;

      setImageDetails((prev) => ({
        ...prev,
        [key]: {
          pathName: name,
          error: MBSize > 2 ? true : false,
          message: MBSize > 2 ? 'File size must not exceed 2MB' : null,
          size: `${MBSize.toFixed(1)}MB`,
        },
      }));
    } else {
      setToUploadCount((prev) => prev + 1);
      setImageDetails((prev) => ({
        ...prev,
        [key]: {
          error: false,
          message: null,
          pathName: name,
          size: `${KBSize}KB`,
        },
      }));
    }
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


  useEffect(() => {
    console.log({imgUris})
    console.log({clearingDocContent})
  }, [imgUris])
  const handleNextDocAction = () => {};

  return (
    <>
      <section
        className={`absolute top-0 left-0 right-0 bottom-0 grid content-end bg-[#000000ad] ${toDisplay.display} z-20`}
        style={{
          gridTemplateRows: '1.2fr 1fr',
        }}
      >
        <div onClick={closeModal}>&nbsp;</div>

        {toDisplay.docType === 'RCDoc' ? (
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
        ) : (
          <form
            className="bg-white py-10 px-10 rounded-t-3xl"
            onSubmit={handleRejectClearingDoc}
          >
            <p className="text-[1.6rem] text-gray-600 mb-8">
              Reject Clearing Doc - Leave a Comment
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
                Reject Clearing Doc
              </span>
            </button>
          </form>
        )}
      </section>
      <div
        className={`pt-10 ${
          openToolTip || openClearingDocToolTip ? 'pb-[15rem]' : ''
        }`}
      >
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

            {clearingDocContent.map((doc, i) => {
              const docName = doc.name as ClearingKeys;
              console.log({i, toUploadCount})
              return (
                <Fragment key={i}>
                  <div className="relative">
                    <button
                      className={`p-6 border cursor-pointer border-color-purple-light-2 rounded-3xl flex items-center justify-between gap-4 whitespace-nowrap w-full disabled:opacity-25 disabled:cursor-not-allowed `}
                      onClick={() =>
                        handleClearingDocChange(doc.name as ClearingKeys)
                      }
                      disabled={i >= toUploadCount && !doc.submitted}
                    >
                      {docName} 

                      {imageDetails[docName].pathName ? (
                        <div className="grid">
                          <p className="text-[1.4rem] font-normal">
                            {imageDetails[docName].pathName}
                          </p>
                          <p className="text-color-grey-4 text-[1rem]">
                            {imageDetails[docName].message
                              ? imageDetails[docName].message
                              : imageDetails[docName].size}
                          </p>
                        </div>
                      ) : doc.status === 'Approved' ? (
                        <span>
                          <img src="/icons/tick-square.svg" alt="" />
                        </span>
                      ) : doc.status === 'Declined' ? (
                        <span>
                          <img src="/icons/close-square.svg" alt="" />
                        </span>
                      ) : null}
                    </button>

                    {openClearingDocToolTip &&
                      clearingDocItem.key === doc.name && (
                        <div
                          className={`absolute top-[6rem] w-[25rem] shadow-lg bg-white rounded-xl grid gap-2 z-20 capitalize right-0 `}
                        >
                          {selectClearingOptions.map((item, i) => {
                            return (
                              <button
                                className={`text-[1.4rem] hover:bg-gray-100 p-4 text-left disabled:opacity-25 disabled:cursor-not-allowed `}
                                key={i}
                                disabled={!doc.submitted}
                                onClick={() =>
                                  handleSelectedClearingDocItem(item.name)
                                }
                              >
                                {item.name === 'Upload clearing Document' ? (
                                  <div>
                                    <label
                                      htmlFor={clearingDocItem.key!}
                                      className={` ${
                                        item.className
                                      } font-medium flex items-center gap-4 cursor-pointer ${
                                        imageDetails.Valuating.error
                                          ? 'border-red-600 border bg-red-50'
                                          : ''
                                      }`}
                                    >
                                      <img src={item.imgUri} alt="" />

                                      {item.name}
                                    </label>
                                    <input
                                      type="file"
                                      name={clearingDocItem.key!}
                                      id={clearingDocItem.key!}
                                      accept="pdf/*"
                                      className="hidden"
                                      onClick={() =>
                                        uploadUriHandler(clearingDocItem.key!)
                                      }
                                      onChange={(e) =>
                                        formUploadHandler(
                                          e,
                                          clearingDocItem.key!
                                        )
                                      }
                                    />
                                  </div>
                                ) : (
                                  <span
                                    className={`${item.className} font-medium flex items-center gap-4 `}
                                  >
                                    {' '}
                                    <img src={item.imgUri} alt="" />
                                    {item.name}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                  </div>
                </Fragment>
              );
            })}
          </div>
        )}
        <div className=" flex w-full justify-end mt-10">
          {isOrderAssignedAgent ? (
            <button
              className="border p-6 rounded-lg cursor-pointer text-white border-color-primary bg-color-primary disabled:opacity-50 disabled:cursor-not-allowed basis-1/2 "
              onClick={handleNextDocAction}
            >
              Next
            </button>
          ) : (
            <button
              className="border p-6 rounded-lg cursor-pointer border-color-primary text-color-primary disabled:opacity-50 disabled:cursor-not-allowed basis-1/2 "
              disabled={!isBOLApproved}
              onClick={assignRCDocAgent}
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
