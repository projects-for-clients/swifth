import { createContext, FormEvent, Fragment, useRef, useState } from 'react';
import Header from '../components/dashboard/Header';
import SelectInput from '../components/utils/SelectInput';

export const CreateFinanceContext = createContext(null as any);

function PayoutBank() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  type Path = 'first' | 'second' | 'third';

  const [currentPath, setCurrentPath] = useState<Path>('first');
  const [addedBank, setAddedBank] = useState(false);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const submitBankDetails = (e: FormEvent) => {
    e.preventDefault();
    setCurrentPath('third');

    const id = setTimeout(() => {
      setCurrentPath('first');
    }, 3000);

    return () => clearTimeout(id);
  };

  const FirstPath = (
    <Fragment>
      <div className="flex items-center gap-8 border border-[#BEB3DE] p-8 rounded-3xl w-[40rem]">
        <img src="/icons/payoutBank.svg" alt="" className="w-[8rem]" />
        <button
          className=" text-gray-500 flex items-center gap-4"
          onClick={() => setCurrentPath('second')}
        >
          <img src="/icons/add-circle.svg" alt="" className="w-[3rem]" />
          <p className="text-[1.4rem]">Add Payout Bank</p>
        </button>
      </div>
    </Fragment>
  );
  const ThirdPath = (
    <div className="flex items-center gap-8 border border-[#BEB3DE] p-8 rounded-3xl w-max ">
      <img src="/icons/loader.svg" alt="" className="w-[5rem] h-[5rem]" />

      <div>
        <p className="text-[2rem] font-medium">Bank details submitted</p>
        <p>
          Your details has been submitted and will be saved after verification
        </p>
      </div>
    </div>
  );

  const BankDetailsForm = (
    <form onSubmit={submitBankDetails} className="my-20">
      <div
        className="grid gap-8"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(40rem, 1fr))',
        }}
      >
        <SelectInput
          label="Choose Bank"
          items={['Access Bank', 'Zenith Bank', 'GTBank', 'First Bank', 'UBA']}
          placeholder={'Select Bank'}
          fullWidth
        />

        <div className="grid gap-4">
          <label className="text-[1.4rem]">Account Number</label>
          <input
            type="number"
            name="accountNumber"
            placeholder="Enter full name"
            className=" rounded-lg py-4 px-4 outline-none border-none text-[1.6rem] bg-color-grey-1 w-full"
            required
          />
        </div>

        <div className="grid gap-4">
          <label className="text-[1.4rem]">Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter full name"
            className=" rounded-lg py-4 px-4 outline-none border-none text-[1.6rem] bg-color-grey-1 w-full"
            required
          />
        </div>
      </div>
      <button className="uppercase py-4 px-6 bg-color-primary text-white w-[30rem] rounded-2xl absolute bottom-[5rem] right-[2rem]">
        Submit
      </button>
    </form>
  );

  const SwitchPath: Record<Path, JSX.Element> = {
    first: FirstPath,
    second: BankDetailsForm,
    third: ThirdPath,
  };

  return (
    <CreateFinanceContext.Provider value={null}>
      <Header
        title="Payout Bank"
        onboarding
        subTitle={currentPath === 'second' ? 'Enter your bank details' : ''}
      />
      <dialog className="dialog relative text-[1.6rem]" ref={dialogRef}>
        <section className="grid place-content-center w-screen h-[100vh]">
          <div className="bg-white rounded-2xl grid justify-items-start gap-8 w-[60rem] p-10">
            <div>
              <p className="text-[2.4rem] font-medium text-left flex w-full">
                Delete bank
              </p>
              <p className="font-medium text-left">
                Do you want to delete bank details?
              </p>
            </div>

            <div className=" flex gap-8 w-[40rem] justify-self-end items-center">
              <button
                className="w-full btn border border-gray-200 bg-gray-100 text-color-dark rounded-2xl"
                onClick={() => handleCloseDialog()}
              >
                Cancel
              </button>
              <button
                className="w-full btn border border-red-600 text-red-600 rounded-2xl"
                onClick={() => handleCloseDialog()}
              >
                Delete
              </button>
            </div>
          </div>
        </section>
      </dialog>
      <main>
        {addedBank ? (
          <div className="flex border border-[#BEB3DE] p-8 rounded-3xl w-full justify-between">
            <div className="flex items-center gap-8">
              <img src="/icons/payoutBank.svg" alt="" className="w-[8rem]" />
              <div className=" text-gray-500 grid items-center gap-4">
                <p className="uppercase text-[#144024] bg-[#D6ECDE] rounded-3xl py-2 px-4 justify-self-start">
                  verified
                </p>
                <div>
                  <p className="text-[2.4rem]">0128232349</p>
                  <p className="">Guaranty Trust Bank</p>
                  <p>James Bori</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 items-center self-end">
              <button className="btn rounded-2xl text-white bg-color-primary capitalize">
                Edit Bank details
              </button>
              <button
                className="btn rounded-2xl text-red-600 border border-red-600 capitalize"
                onClick={() => openDialog()}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <>{SwitchPath[currentPath]}</>
        )}
      </main>
    </CreateFinanceContext.Provider>
  );
}

export default PayoutBank;
