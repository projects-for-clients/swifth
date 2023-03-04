import { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
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
  const [eyeIcon, setEyeIcon] = useState<{
    [key: string]: boolean;
  } | null>(null);

const toggleEyeIcon = (key: string) => {
  setEyeIcon((prev) => ({
    ...prev,
    [key]: !prev?.[key],
  }));
};

  type Steps = 'initial' | 'addCar' | 'addedCar' | 'payment' | 'security';

  type ToggleKeys = 'withoutPayment' | 'moreThanOne' | 'restrictCus';

  const [toggle, setToggle] = useState<{
    [key: string]: boolean;
  } | null>(null);

  const [step, setStep] = useState<Steps>('initial');

  const handleToggle = (key: ToggleKeys) => {
    setToggle((prev) => ({
      ...prev,
      [key]: !prev?.[key],
    }));
  };

  const updatedPayment = () => {
    //closeDialog();

    toast('Payment Updated', {
      type: 'success',
      className: 'bg-green-100 text-color-primary border-none',
    });
  };

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
          onClick={() => setStep('payment')}
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
          onClick={() => setStep('security')}
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
          //   onClick={() => setStep('dutyCalculation')}
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

      <section className="grid items-baseline gap-10 mt-[5rem]">
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
    <div className="h-full grid">
      <div className="flex items-center gap-16 self-start">
        <BiArrowBack
          className="text-[1.8rem] cursor-pointer"
          onClick={() => setStep('initial')}
        />
        <p className="text-[2rem]"> Add a New Car</p>
      </div>

      <div className="flex flex-col items-center gap-4 mt-[-15rem]">
        <img src="/icons/goodMark.svg" alt="" className="w-[6rem] h-[6rem]" />
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
  const payment = (
    <>
      <div className="flex items-baseline gap-16 self-start">
        <BiArrowBack
          className="text-[1.8rem] cursor-pointer"
          onClick={() => setStep('initial')}
        />
        <div>
          <p className="text-[2rem]"> Customer/Payment Settings</p>
          <p className="text-[1.4rem] text-gray-500 mt-2">
            Manage customer & payment settings
          </p>
        </div>
      </div>

      <div className="grid gap-8 mt-[5rem]">
        <div className="flex items-center gap-8 cursor-pointer justify-between relative">
          <div className="max-w-[35rem]">
            <p>Start clearing without payment</p>
            <p className="text-[1.4rem] text-gray-500">
              Allow clearing to commence if no payment has been made by cutomer
            </p>
          </div>

          <button
            onClick={() => handleToggle('withoutPayment')}
            className="w-[5rem] h-[2.5rem] absolute right-2"
          >
            {toggle && toggle['withoutPayment'] ? (
              <img src="/icons/switchOn.svg" alt="" />
            ) : (
              <img src="/icons/switchOff.svg" alt="" />
            )}
          </button>
        </div>
        <div className="flex items-center gap-8 cursor-pointer justify-between relative">
          <div className="max-w-[35rem]">
            <p>Item per Order</p>
            <p className="text-[1.4rem] text-gray-500">
              Allow more than 1 item in an order{' '}
            </p>
          </div>

          <button
            onClick={() => handleToggle('moreThanOne')}
            className="w-[5rem] h-[2.5rem] absolute right-2"
          >
            {toggle && toggle['moreThanOne'] ? (
              <img src="/icons/switchOn.svg" alt="" />
            ) : (
              <img src="/icons/switchOff.svg" alt="" />
            )}
          </button>
        </div>
        <div className="flex items-center gap-8 cursor-pointer justify-between relative">
          <div className="max-w-[35rem]">
            <p>Restrict Defaulting Customers</p>
            <p className="text-[1.4rem] text-gray-500">
              When customers have not paid their outstanding bills to a certain
              percentage, restrict them from seeing updates on clearing process{' '}
            </p>
          </div>

          <button
            onClick={() => handleToggle('restrictCus')}
            className="w-[5rem] h-[2.5rem] absolute right-2"
          >
            {toggle && toggle['restrictCus'] ? (
              <img src="/icons/switchOn.svg" alt="" />
            ) : (
              <img src="/icons/switchOff.svg" alt="" />
            )}
          </button>
        </div>

        <div
          className={`mt-8 ${
            toggle && toggle['restrictCus']
              ? 'block'
              : 'text-gray-400 cursor-not-allowed'
          }`}
        >
          <p>
            Set the percentage you want customers to have paid to avoid
            restrictions
          </p>
          <div className="mt-8">
            <label className="mb-2">Percentage</label>
            <div
              className={`relative p-6  w-full rounded-2xl flex items-center pr-12 ${
                toggle && toggle['restrictCus'] ? 'bg-gray-200' : 'bg-gray-100 '
              }`}
            >
              <input
                type="text"
                className=" outline-none w-full h-full bg-inherit"
                placeholder="80%"
                disabled={toggle && toggle['restrictCus'] ? false : true}
              />

              <div className="absolute right-8 flex items-center font-medium gap-8">
                <img src="/icons/line.svg" alt="" />
                <button className="outline-none border-none text-color-primary flex items-center gap-4">
                  <img src="/icons/percentage.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className={`text-[1.6rem] bg-color-primary px-10 py-6 justify-self-end  rounded-lg text-color-white uppercase font-semibold self-center disabled:opacity-60 disabled:cursor-not-allowed absolute bottom-0 w-full`}
        onClick={updatedPayment}
      >
        Update Settings
      </button>
    </>
  );
  const security = (
    <>
      <div className="flex items-baseline gap-16 self-start">
        <BiArrowBack
          className="text-[1.8rem] cursor-pointer"
          onClick={() => setStep('initial')}
        />
        <div>
          <p className="text-[2rem]"> Password & Security</p>
          <p className="text-[1.4rem] text-gray-500 mt-2">
            Change password and set up 2FA
          </p>
        </div>
      </div>

      <div className="grid gap-8 mt-[5rem]">
        <div className="relative">
            <p>Change Password</p>
          <input
            type={eyeIcon ? 'text' : 'password'}
            placeholder="create a password..."
            className={`input__item w-full`}
            name="password"
          />
          <span className="form__eyeIcon">
            {eyeIcon ? (
              <AiOutlineEyeInvisible onClick={toggleEyeIcon} />
            ) : (
              <AiOutlineEye onClick={toggleEyeIcon} />
            )}
          </span>
        </div>
      </div>

      <button
        className={`text-[1.6rem] bg-color-primary px-10 py-6 justify-self-end  rounded-lg text-color-white uppercase font-semibold self-center disabled:opacity-60 disabled:cursor-not-allowed absolute bottom-0 w-full`}
        onClick={updatedPayment}
      >
        Update Settings
      </button>
    </>
  );

  const Paths = new Map<Steps, JSX.Element>([
    ['initial', initial],
    ['addCar', addCar],
    ['addedCar', addedCar],
    ['payment', payment],
    ['security', security],
  ]);

  return (
    <div className="relative h-[90vh]">
      <ToastContainer />
      {Paths.get(step)}
    </div>
  );
}

export default Settings;
