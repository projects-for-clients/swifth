import {
  useState,
  Fragment,
  Dispatch,
  SetStateAction,
  FC,
  FormEvent,
} from 'react';
import { GrClose } from 'react-icons/gr';

interface AgentClearing {
  setIsAssignAgent: Dispatch<SetStateAction<boolean>>;
}

export const AgentClearing: FC<AgentClearing> = ({ setIsAssignAgent }) => {
  const [isBillOfLading, setIsBillOfLading] = useState(false);
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
    setIsAssignAgent(true);
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

  const closeModal = () => {
    setToDisplay('hidden');
  };

  const handleQuoteSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <section
        className={`absolute top-0 left-0 right-0 bottom-0 grid content-end bg-[#000000ad] ${toDisplay}`}
        style={{
          gridTemplateRows: '1.2fr 1fr',
        }}
      >
        <div onClick={closeModal}>&nbsp;</div>
        <form
          className="bg-white py-10 px-10 rounded-t-3xl"
          onSubmit={handleQuoteSubmit}
        >
          <p className="text-[1.6rem] text-gray-600 mb-8">Quote Amount</p>

          <div>
            <label htmlFor="amount" className="text-[1.4rem] text-gray-600">
              Comment
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              required
              id="amount"
              className="w-full bg-gray-100 rounded-md py-6 px-3 outline-none"
            />
            <textarea
              name="amount"
              placeholder="Enter Amount"
              required
              rows={3}
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
      <div className="pt-10">
        <p className="text-gray-400 font-semibold text-[1.8rem]">RC Docs</p>

        <div className="grid gap-4 mt-10 ">
          {clearingDocs.map((doc, i) => (
            <Fragment key={i}>
              <div className="relative">
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
            disabled={!isBillOfLading}
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
