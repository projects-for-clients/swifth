import {
  useState,
  FormEvent,
  useEffect,
  FC,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { DialogType } from '../../../../container/dashboard/orders';

interface AssignAgentRender {
  handleCloseDialog: (type: DialogType) => void;
  setIsAssignAgent: Dispatch<SetStateAction<boolean>>;
}

const AssignAgentRender: FC<AssignAgentRender> = ({
  handleCloseDialog,
  setIsAssignAgent,
}) => {
  const [toDisplay, setToDisplay] = useState('hidden');
  const [toastDisplay, setToastDisplay] = useState('hidden');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSelectAgent = () => {

  }
  

  const handleQuoteSubmit = (e: FormEvent) => {
    e.preventDefault();
    setToastDisplay('flex');
  };

  const goBack = () => {
    setIsAssignAgent(false);
  };

  const closeModal = () => {
    setToDisplay('hidden');
  };

  useEffect(() => {
    if (toastDisplay === 'flex') {
      setTimeout(() => {
        setToastDisplay('hidden');
      }, 3000);
    }
  }, [toastDisplay]);

  const agents = ['James Ibori', 'Kunle Afolayan', 'Femi Adebayo'];

  return (
    <>
      <section
        className={`absolute top-0 left-0 right-0 bottom-0 grid content-end bg-[#000000ad] ${toDisplay}`}
        style={{
          gridTemplateRows: '1.2fr 1fr',
        }}
      >
        <div
          className={`absolute rounded-3xl bg-green-50 border border-green-300 py-8 px-4 text-green-700 flex items-center w-[36rem] mx-auto top-4 left-0 right-0 ${toastDisplay}`}
        >
          <span className="w-full text-center">Quote Sent!</span>
          <GrClose
            onClick={() => setToastDisplay('hidden')}
            className="cursor-pointer"
          />
        </div>
        <div onClick={closeModal}>&nbsp;</div>
        <form
          className="bg-white py-10 px-10 rounded-t-3xl"
          onSubmit={handleQuoteSubmit}
        >
          <p className="text-[1.6rem] text-gray-600 mb-8">Quote Amount</p>

          <div>
            <label htmlFor="amount" className="text-[1.4rem] text-gray-600">
              Enter Amount
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              required
              id="amount"
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

      <div className="px-5 items-baseline w-[40rem] h-3/4">
        <div className="flex gap-8">
          <BsArrowLeft
            className="text-[2.4rem] cursor-pointer"
            onClick={goBack}
          />
          <p className="text-[1.6rem] text-gray-600 w-full text-left">
            Choose Field Agent
          </p>
        </div>
        <main className=" gap-4 mt-20 h-full">
          <section className="relative flex items-center">
            <input
              type="text"
              className=" border border-gray-300 py-4 pr-3 pl-[4rem] outline-none w-full rounded-3xl"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
            />

            <img
              src="/icons/search-normal.svg"
              alt=""
              className="absolute left-6 text-[1.8rem]"
            />
          </section>

          <section className='grid mt-10'>
            {agents
              .filter((agent) => agent.toLowerCase().includes(search))
              .map((agent) => (
                <button className='border-b rounded-lg border-b-color-red-light-1 py-4 text-start hover:bg-gray-100 hover:translate-x-1 hover:pl-4 transition-all' onClick={() => handleSelectAgent (agent)}>
                  <span>{agent}</span>
                </button>
              ))}
          </section>
        </main>

        <button
          className="flex w-full items-center"
          onClick={() => setToDisplay('grid')}
        >
          <span className="bg-color-primary rounded-lg text-white w-full py-4">
            Continue
          </span>
        </button>
      </div>
    </>
  );
};

export default AssignAgentRender;
