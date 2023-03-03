import { useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

function Config({ closeDialog }: { closeDialog: () => void }) {
  type Steps = 'duty' | 'shipping' | 'charges';
  const [step, setStep] = useState<Steps>('duty');
  const name = 'Ben Davis';

  const first = (
    <>
      <div className="grid gap-8 mt-[5rem]">
        <button className="border border-color-purple-light-2 rounded-3xl p-6 text-left ">
          <p>Duty Calculation</p>
          <p className="text-[1.4rem] text-gray-500">
            Duty charges configuration
          </p>
        </button>
        <button className="border border-color-purple-light-2 rounded-3xl p-6 text-left ">
          <p>Shipping and Terminal</p>
          <p className="text-[1.4rem] text-gray-500">
            Shipping & Terminal charges configuration
          </p>
        </button>
        <button className="border border-color-purple-light-2 rounded-3xl p-6 text-left ">
          <p>Charges</p>
          <p className="text-[1.4rem] text-gray-500">Charges configuration</p>
        </button>
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

  const Paths = new Map<Steps, JSX.Element>([
    ['duty', first],
    ['shipping', <div>second</div>],
    ['charges', third],
  ]);

  return (
    <div className="relative h-[90vh]">
      <p className="text-[2rem] mb-16">Formular Configuration</p>

      {Paths.get(step)}
    </div>
  );
}

export default Config;
