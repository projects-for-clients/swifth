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
import { useAppDispatch, useAppSelector } from '../../../../store/app/hooks';
import {
  selectOrder,
  updateOrder,
} from '../../../../store/features/order/order';

interface AssignAgentRender {
  setIsAssignAgent: Dispatch<SetStateAction<boolean>>;
}

const AssignAgentRender: FC<AssignAgentRender> = ({ setIsAssignAgent }) => {
  const dispatch = useAppDispatch();
  const orderData = useAppSelector(selectOrder);

  const [toastDisplay, setToastDisplay] = useState('hidden');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSelectAgent = () => {
    dispatch(updateOrder({ isBOLApproved: true }));

    setToastDisplay('flex');
  };

  const goBack = () => {
    setIsAssignAgent(false);
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
      <div
        className={`absolute rounded-3xl bg-green-50 border border-green-300 py-8 px-4 text-green-700 flex items-center w-[36rem] mx-auto top-4 left-0 right-0 ${toastDisplay}`}
      >
        <span className="w-full text-center">{selected} Assigned</span>
        <GrClose
          onClick={() => setToastDisplay('hidden')}
          className="cursor-pointer"
        />
      </div>

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

          <section className="grid mt-10">
            {agents
              .filter((agent) => agent.toLowerCase().includes(search))
              .map((agent, i) => (
                <div
                  className="border-b rounded-lg border-b-color-red-light-1 py-4 text-start hover:bg-gray-100 hover:translate-x-1 hover:pl-4 transition-all capitalize flex items-center justify-between"
                  key={i}
                  onChange={() => setSelected(agent)}
                >
                  <input
                    type="radio"
                    name="agent"
                    id={agent + i}
                    className="hidden"
                  />
                  <label htmlFor={agent + i} className="w-full cursor-pointer">
                    {agent}
                  </label>

                  {selected === agent && (
                    <img src="/icons/tick-square.svg" alt="" />
                  )}
                </div>
              ))}
          </section>
        </main>

        <button
          className="flex w-full items-center"
          onClick={handleSelectAgent}
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
