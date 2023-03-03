import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { IoMdCheckmark } from 'react-icons/io';
import { BsArrowRight } from 'react-icons/bs';

function Config({
  closeDialog,
  setWidth,
}: {
  closeDialog: () => void;
  setWidth: (item: string) => void;
}) {
  type Steps =
    | 'duty'
    | 'shipping'
    | 'charges'
    | 'dutyCalculation'
    | 'dutyConstant'
    | 'surfaceDuty';

  type Filter = 'brand' | 'model' | 'trim';
  const filter: Filter[] = ['brand', 'model', 'trim'];

  const [step, setStep] = useState<Steps>('duty');
  const [selectedFilter, setSelectedFilter] = useState<Filter>('brand');

  const toSurfaceDuty = () => {
    setStep('surfaceDuty');
    setWidth('w-[60%]');
  };

  const backToDutyCalculation = () => {
    setStep('dutyCalculation');
    setWidth('w-[50rem]');
  };

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
          onClick={toSurfaceDuty}
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
        onClick={() => closeDialog()}
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
          onClick={backToDutyCalculation}
        />
        <p className="text-[2rem]"> Surface Duty </p>
      </div>

      <div className="grid gap-16 mt-[5rem]">
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
          <p className="font-medium mb-5">Most popular</p>
          <div
            className="grid gap-8"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(30rem, 1fr))',
            }}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <p key={i} className="border bg-gray-100 rounded-3xl p-6">
                Lexus LX 570, 2019
              </p>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {filter.map((item) => (
            <div key={item}>
              <input
                type="radio"
                name="filter"
                id={item}
                className="hidden"
                onChange={() => setSelectedFilter(item)}
              />
              <label
                htmlFor={item}
                className={`${
                  item === selectedFilter
                    ? 'bg-color-primary text-white border-none'
                    : 'border'
                } rounded-3xl `}
              >
                {item}
              </label>
            </div>
          ))}
        </div>
        <div>

            <p className="font-medium mb-5">All Brands</p>
        <div
          className="grid"
          style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(30rem, 1fr))',
            }}
            >
          {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="border bg-gray-100 rounded-3xl p-4">
              Honda
            </p>
          ))}
          </div>
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
