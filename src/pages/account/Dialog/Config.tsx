import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { IoMdCheckmark } from 'react-icons/io';
import { BsArrowRight } from 'react-icons/bs';

function Config({ closeDialog }: { closeDialog: () => void }) {
  type Steps =
    | 'duty'
    | 'shipping'
    | 'charges'
    | 'dutyCalculation'
    | 'dutyConstant'
    | 'surfaceDuty';
  const [step, setStep] = useState<Steps>('duty');

  const first = (
    <>
      <p className="text-[2rem] mb-16">Formular Configuration</p>

      <div className="grid gap-8 mt-[5rem]">
        <button
          className="border border-color-purple-light-2 rounded-3xl p-6 text-left "
          onClick={() => setStep('dutyCalculation')}
        >
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
  const dutyCalculation = (
    <>
      <div className="flex items-center gap-16">
        <BiArrowBack
          className="text-[1.8rem] cursor-pointer"
          onClick={() => setStep('duty')}
        />
        <p className="text-[2rem]">Duty Calculation</p>
      </div>

      <div className="grid gap-8 mt-[5rem]">
        <button
          className="border border-color-purple-light-2 rounded-3xl p-6 text-left flex items-center justify-between"
          onClick={() => setStep('dutyConstant')}
        >
          <p>Surface Duty Constant</p>
          <span>
            <BsArrowRight />
          </span>
        </button>
        <button
          className="border border-color-purple-light-2 rounded-3xl p-6 text-left flex items-center justify-between"
          onClick={() => setStep('surfaceDuty')}
        >
          <p>Surface Duty </p>
          <span>
            <BsArrowRight />
          </span>
        </button>
      </div>
    </>
  );
  const SurfaceConstant = (
    <>
      <div className="flex items-center gap-16">
        <BiArrowBack
          className="text-[1.8rem] cursor-pointer"
          onClick={() => setStep('dutyCalculation')}
        />
        <p className="text-[2rem]"> Surface Duty Constant</p>
      </div>

      <div className="grid gap-4 mt-[5rem]">
        <label htmlFor="" className=" text-[1.4rem] text-gray-500">
          Duty Constant
        </label>
        <input
          type="text"
          className="bg-gray-100 px-4 py-8 rounded-2xl border-none outline-none"
        />
      </div>

      <button
        className={`text-[1.6rem] bg-color-primary px-10 py-6 justify-self-end  rounded-lg text-color-white uppercase font-semibold self-center disabled:opacity-60 disabled:cursor-not-allowed absolute bottom-0 w-full`}
      >
        Save Changes
      </button>
    </>
  );
  const SurfaceDuty = (
    <>
      <div className="flex items-center gap-16">
        <BiArrowBack
          className="text-[1.8rem] cursor-pointer"
          onClick={() => setStep('dutyCalculation')}
        />
        <p className="text-[2rem]"> Surface Duty </p>
      </div>

      <div className="grid gap-8 mt-[5rem]">
        <div className="relative flex items-center w-[45rem] mx-auto">
          <input
            type="text"
            className=" border border-gray-300 py-6 pr-3 pl-[4rem] outline-none w-full rounded-3xl"
            placeholder="Search"
          />

          <img
            src="/icons/search-normal.svg"
            alt=""
            className="absolute left-6 text-[1.8rem]"
          />
        </div>

        <div>
            <p className='font-medium'>Most popular</p>
          {Array.from({ length: 6 }, (_, i) => (
            <p key={i} className='border border-gray-100 rounded-3xl p-4'></p>
          ))}
        </div>
      </div>
    </>
  );

  const Paths = new Map<Steps, JSX.Element>([
    ['duty', first],
    ['dutyCalculation', dutyCalculation],
    ['dutyConstant', SurfaceConstant],
    ['surfaceDuty', SurfaceDuty],
    ['shipping', <div>second</div>],
    ['charges', <div>third</div>],
  ]);

  return <div className="relative h-[90vh]">{Paths.get(step)}</div>;
}

export default Config;
