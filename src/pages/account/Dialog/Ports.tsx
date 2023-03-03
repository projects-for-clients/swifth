import { useEffect, useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import PortAndTerminals from '../../../components/OnboardingSteps/Port_and_Terminals';

function Ports({ closeDialog, enLarge }: { closeDialog: () => void, enLarge:() => void }) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if(step === 2) return enLarge()
  }, [step])

  const first = (
    <>
      <div className="grid justify-items-center">
        <div className="text-center mt-10">
          <button
            className="btn uppercase border border-color-primary text-color-primary text-center rounded-2xl font-medium"
            onClick={() => setStep(2)}
          >
            Edit Details
          </button>
          <p className="flex items-center gap-4 mt-10">
            <img src="/icons/info-circle-1.svg" alt="" />
            <span className="text-[#66BD89] text-[1.4rem]">
              Ports & Terminals information is up to date
            </span>
          </p>
        </div>
      </div>

      <div className="grid gap-4 font-medium border-t border-t-color-purple-light pt-10 mt-10">
        <p>Lagos Port</p>
        <p>3 Terminals</p>

        <div className="flex justify-between items-center">
          <p>Form C-30 for Terminal 1</p>
          <p className="bg-green-100 border border-color-primary rounded-2xl flex items-center gap-4 text-color-primary-dark py-2 px-4">
            <span>
              <IoMdCheckmark />
            </span>
            <span className="text-[1.2rem] font-normal">Verified</span>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p>Form C-30 for Terminal 2</p>
          <p className="bg-green-100 border border-color-primary rounded-2xl flex items-center gap-4 text-color-primary-dark py-2 px-4">
            <span>
              <IoMdCheckmark />
            </span>
            <span className="text-[1.2rem] font-normal">Verified</span>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p>Form C-30 for Terminal 3</p>
          <p className="bg-green-100 border border-color-primary rounded-2xl flex items-center gap-4 text-color-primary-dark py-2 px-4">
            <span>
              <IoMdCheckmark />
            </span>
            <span className="text-[1.2rem] font-normal">Verified</span>
          </p>
        </div>
      </div>
    </>
  );

  const third = (
    <>
      <div className="grid justify-items-center gap-8 mt-[10rem] ">
        <img src="/icons/goodMark.svg" alt="" />
        <p className="text-[2.4rem]">Changes submitted!</p>
        <div className="text-center text-[1.4rem] text-gray-500">
          <p>
            The changes you have made would be applied when they have been
            reviewed and approved.
          </p>
          <p className="mt-5">
            You will be notified when they have been approved.
          </p>
        </div>
      </div>
      <button
        className={`text-[1.6rem] bg-color-primary px-10 py-6 justify-self-end  rounded-lg text-color-white uppercase font-semibold w-full absolute bottom-0 `}
        onClick={() => closeDialog()}
      >
        Done
      </button>{' '}
    </>
  );

  const Paths = new Map<number, JSX.Element>([
    [1, first],
    [2, <PortAndTerminals setup={true} setStep={setStep} />],
    [3, third],
  ]);

  return (
    <div className="relative h-[90vh]">
      <p className="text-[2rem] mb-16">Ports & Terminals Information</p>

      {Paths.get(step)}
    </div>
  );
}

export default Ports;
