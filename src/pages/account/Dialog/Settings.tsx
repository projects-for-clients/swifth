import { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';

function Settings({
  closeDialog,
  setWidth,
}: {
  closeDialog: () => void;
  setWidth: (item: string) => void;
}) {
  type Steps = 'initial' | 'addCar' | 'addedCar' | 'payment' | 'updatePayment';

  type Filter = 'brand' | 'model' | 'trim';
  const filter: Filter[] = ['brand', 'model', 'trim'];

  type CarProp = {
    name?: string;
    trim?: string;
    content?: string;
  };

  const shippingContent = [
    { name: 'sedan', content: '120k' },
    { name: 'suv/bus/pick-up', content: '150k' },
    { name: 'truck', content: '180k' },
  ] as CarProp[];

  const shippingItemProps = Array.from({ length: 10 }, (_, i) => ({
    name: 2015 + (i + 1),
    content: `50k x ${i + 1}`,
  }));

  const [step, setStep] = useState<Steps>('initial');

  const initial = (
    <>
      <p className="text-[2rem] mb-16">Settings</p>

      <div className="grid gap-8 mt-[5rem]">
        <button
          className="border border-color-purple-light-2 rounded-3xl p-6 text-left flex items-center gap-8 "
          onClick={() => setStep('addCar')}
        >
          <img src="/icons/car.svg" alt="" />
          <div>
            <p className="text-[#251A45]">Add a Car</p>
            <p className="text-[1.4rem] text-gray-500">
              Add new car and details
            </p>
          </div>
        </button>
        <button
          className="border border-color-purple-light-2 rounded-3xl p-6 text-left flex items-center gap-8 "
          onClick={() => setStep('dutyCalculation')}
        >
          <img src="/icons/customerPayment.svg" alt="" />
          <div>
            <p className="text-[#251A45]">Customer/Payment Settings</p>
            <p className="text-[1.4rem] text-gray-500">
              Manage customer & payment settings{' '}
            </p>
          </div>
        </button>
        <button
          className="border border-color-purple-light-2 rounded-3xl p-6 text-left flex items-center gap-8 "
          onClick={() => setStep('dutyCalculation')}
        >
          <img src="/icons/security.svg" alt="" />
          <div>
            <p className="text-[#251A45]">Password & Security</p>
            <p className="text-[1.4rem] text-gray-500">
              Set up password and 2FA
            </p>
          </div>
        </button>
        <button
          className="border border-color-purple-light-2 rounded-3xl p-6 text-left flex items-center gap-8 "
          onClick={() => setStep('dutyCalculation')}
        >
          <img src="/icons/notification-1.svg" alt="" />
          <div>
            <p className="text-[#251A45]">Notification Settings</p>
            <p className="text-[1.4rem] text-gray-500">
              Adjust your notification setting
            </p>
          </div>
        </button>
      </div>
    </>
  );
  const addCar = (
    <>
      <div className="flex items-center gap-16">
        <BiArrowBack
          className="text-[1.8rem] cursor-pointer"
          onClick={() => setStep('initial')}
        />
        <p className="text-[2rem]"> Add a New Car</p>
      </div>

      <section className='grid items-baseline gap-10 mt-[5rem]'>
        <div className="grid gap-4">
          <label htmlFor="" className=" text-[1.4rem] text-gray-500">
            Car Brand
          </label>
          <input
            type="text"
            className="bg-gray-100 px-4 py-8 rounded-2xl border-none outline-none"
            placeholder="Enter brand name"
          />
        </div>
        <div className="grid gap-4">
          <label htmlFor="" className=" text-[1.4rem] text-gray-500">
            Car Model
          </label>
          <input
            type="text"
            className="bg-gray-100 px-4 py-8 rounded-2xl border-none outline-none"
            placeholder="Enter model name"
          />
        </div>
        <div className="grid gap-4">
          <label htmlFor="" className=" text-[1.4rem] text-gray-500">
            Car Trim
          </label>
          <input
            type="text"
            className="bg-gray-100 px-4 py-8 rounded-2xl border-none outline-none"
            placeholder="Enter trim"
          />
        </div>
        <div className="grid gap-4">
          <label htmlFor="" className=" text-[1.4rem] text-gray-500">
            Car Year
          </label>
          <input
            type="text"
            className="bg-gray-100 px-4 py-8 rounded-2xl border-none outline-none"
            placeholder="Enter year"
          />
        </div>
      </section>

      <button
        className={`text-[1.6rem] bg-color-primary px-10 py-6 justify-self-end  rounded-lg text-color-white uppercase font-semibold self-center disabled:opacity-60 disabled:cursor-not-allowed absolute bottom-0 w-full`}
        onClick={() => setStep('addedCar')}
      >
        Add Car
      </button>
    </>
  );
  const addedCar = (
    <div className='h-full grid'>
      <div className="flex items-center gap-16 self-start">
        <BiArrowBack
          className="text-[1.8rem] cursor-pointer"
          onClick={() => setStep('initial')}
        />
        <p className="text-[2rem]"> Add a New Car</p>
      </div>

      <div className='flex flex-col items-center gap-4'>
        <img src="/icons/goodMark.svg" alt="" className='w-[6rem] h-[6rem]' />
        <p>Car Added</p>
      </div>

      <button
        className={`text-[1.6rem] bg-color-primary px-10 py-6 justify-self-end  rounded-lg text-color-white uppercase font-semibold self-center disabled:opacity-60 disabled:cursor-not-allowed absolute bottom-0 w-full`}
        onClick={() => closeDialog()}
      >
        Done
      </button>
    </div>
  );

  const Paths = new Map<Steps, JSX.Element>([['initial', initial], ['addCar', addCar], ['addedCar', addedCar]]);

  return (
    <div className="relative h-[90vh]">
      <ToastContainer />
      {Paths.get(step)}
    </div>
  );
}

export default Settings;
