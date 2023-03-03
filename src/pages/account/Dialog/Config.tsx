import { useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

function Config({ closeDialog }: { closeDialog: () => void }) {
  const [step, setStep] = useState(1);
  const name = 'Ben Davis';

  const first = (
    <>
      <div className="grid justify-items-center">
       

      </div>

      <div className="grid gap-4 font-medium border-t border-t-color-purple-light pt-10 mt-10">
        <p>14 Abraham Ladipe Lekki Phase 1</p>

        <div className="flex justify-between items-center">
          <p>CAC Certificate</p>
          <p className="bg-green-100 border border-color-primary rounded-2xl flex items-center gap-4 text-color-primary-dark py-2 px-4">
            <span>
              <IoMdCheckmark />
            </span>
            <span className="text-[1.2rem] font-normal">Verified</span>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p>Custom license</p>
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
    [2, <div>second</div>],
  ]);

  return (
    <div className="relative h-[90vh]">
      <p className="text-[2rem] mb-16">Formular Configuration</p>

      {Paths.get(step)}
    </div>
  );
}

export default Config;
