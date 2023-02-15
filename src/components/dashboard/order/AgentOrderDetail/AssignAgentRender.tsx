import { useState, FormEvent, useEffect, FC, Dispatch, SetStateAction } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { DialogType } from "../../../../container/dashboard/orders";


interface AssignAgentRender {
  handleCloseDialog: (type: DialogType) => void;
  setIsAssignAgent: Dispatch<SetStateAction<boolean>>;
}

const AssignAgentRender:FC<AssignAgentRender> = ({
    handleCloseDialog,
    setIsAssignAgent,
}) => {
  const [toDisplay, setToDisplay] = useState('hidden');
  const [toastDisplay, setToastDisplay] = useState('hidden');

  const goBack = () => {
    setIsAssignAgent(false);
   
  };

  const closeModal = () => {
    setToDisplay('hidden');
  };

  const handleQuoteSubmit = (e: FormEvent) => {
    e.preventDefault();
    setToastDisplay('flex');
  };

  useEffect(() => {
    if (toastDisplay === 'flex') {
      setTimeout(() => {
        setToastDisplay('hidden');
      }, 3000);
    }
  }, [toastDisplay]);

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

      <div className="px-5 h-full items-baseline w-[40rem]">
        <div className="flex">
          <BsArrowLeft
            className="text-[2.4rem] cursor-pointer"
            onClick={goBack}
          />
          <p className="text-[1.6rem] text-gray-600 w-full text-center">
            Choose Field Agent
          </p>
        </div>
        <main className="grid gap-4 mt-20"></main>

        <button
          className="flex w-full h-full items-center "
          onClick={() => setToDisplay('grid')}
        >
          <span className="bg-color-primary rounded-lg text-white w-full py-4">
            Send Quote
          </span>
        </button>
      </div>
    </>
  );
};

export default AssignAgentRender