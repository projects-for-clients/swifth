import { useState, useRef } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/dashboard/Header';

type DialogType = 'permissions' | 'history';
type HistoryKey =
  | 'created order'
  | 'valuation'
  | 'payment releasing'
  | 'duty processed';

interface History {
  id: number;
  key: HistoryKey;
  agent: string;
}

const Account = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dialogType, setDialogType] = useState<DialogType>('permissions');
  const [isEditProfile, setIsEditProfile] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = (dialogType: DialogType) => {
    if (dialogType === 'permissions') {
      setDialogType('permissions');
      dialogRef.current?.showModal();
    }
    if (dialogType === 'history') {
      setDialogType('history');
      dialogRef.current?.showModal();
    }
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const name = 'Ben Davis';
  let initials = name.split(' ').map((n: string) => n[0]);

  const AccessArr = Array.from({ length: 5 }).map((_, i) => {
    return {
      id: i,
      name: `Access ${i + 1}`,
      description: 'Full access except user management',
    };
  });

  const historyKey: HistoryKey[] = [
    'created order',
    'valuation',
    'payment releasing',
    'duty processed',
  ];

  return (
    <>
      <dialog className="dialog relative text-[1.6rem]" ref={dialogRef}>
        <div className="bg-white fixed right-0 h-[100vh] w-[50rem] py-4 px-12 overflow-y-scroll">
          <input type="text" className="absolute top-0 w-0" />
          <figure className="flex justify-end">
            <img
              src="/icons/close.svg"
              alt=""
              className="w-[3rem] cursor-pointer"
              onClick={() => closeDialog()}
            />
          </figure>

          <h3 className="text-[2.4rem] mb-10">{name}</h3>

          {dialogType === 'permissions' ? (
            <div>
              <p>
                Permissions (
                <span className="text-color-purple-1">'sdfsf'</span>)
              </p>

              <div className="grid gap-8 py-16">
                {AccessArr.map((item, i) => {
                  const { name, description, id } = item;
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-8 cursor-pointer justify-between"
                    >
                      <div>
                        <p>{name}</p>
                        <p className="text-[1.4rem] text-gray-500">
                          {i === 0 ? 'Can only create orders' : description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <p className="font-medium text-gray-500">History/Activity</p>

              <div className="grid gap-8 py-16">
                <div className="flex items-center gap-8 cursor-pointer justify-between bg-color-purple-light-1 rounded-3xl p-6">
                  <div>
                    <p>sdfsf</p>
                    <p className="text-[1.4rem] text-gray-500">{`RC - sdfs`}</p>
                  </div>

                  <p>Dec 9, 2023</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </dialog>
      <Header title="Account" />

      <main className="text-[1.6rem] grid gap-10 grid-cols-2">
        <section>
          <div className="flex items-end gap-16">
            <figure className="relative grid place-content-center w-[13rem] h-[13rem]">
              <img
                src=""
                alt=""
                className="absolute w-full h-full rounded-full  z-[1]"
              />
              <p className="absolute w-full h-full z-[2] text-[5rem] bg-purple-100 border border-color-purple-light grid place-content-center rounded-full">
                <span>{initials}</span>
              </p>
            </figure>

            <div>
              <p className="flex items-center gap-4 font-medium">
                <span>{name}</span> <img src="/icons/line.svg" alt="" />{' '}
                <span className="text-color-purple">
                  BenDavis Clearing Services Ltd
                </span>
              </p>
              <p className="lowercase">{name.split(' ').join('')}@gmail.com</p>
            </div>
          </div>
          <div className="mt-10 grid gap-8">
            <div className="border border-color-purple-light-2 rounded-3xl p-6 flex items-center justify-between">
              <p>Personal Information</p>
              <span>
                <HiOutlineChevronRight />
              </span>
            </div>
            <div className="border border-color-purple-light-2 rounded-3xl p-6 flex items-center justify-between">
              <div className="grid justify-items-start gap-4">
                <p>Business Information</p>
                <span className="border border-color-primary-light bg-green-100 text-color-primary-dark text-[1.2rem] rounded-3xl py-2 px-4">
                  Up to date
                </span>
              </div>
              <span>
                <HiOutlineChevronRight />
              </span>
            </div>
            <div className="border border-color-purple-light-2 rounded-3xl p-6 flex items-center justify-between">
              <div className="grid justify-items-start gap-4">
                <p>Ports and Terminals Information</p>
                <span className="border border-color-primary-light bg-green-100 text-color-primary-dark text-[1.2rem] rounded-3xl py-2 px-4">
                  Up to date
                </span>
              </div>
              <span>
                <HiOutlineChevronRight />
              </span>
            </div>
            <div className="border border-color-purple-light-2 rounded-3xl p-6 flex items-center justify-between">
              <p>Formular Configuration</p>
              <span>
                <HiOutlineChevronRight />
              </span>
            </div>
            <div className="border border-red-600 rounded-3xl p-6 flex items-center justify-between text-red-600 mt-20">
              <p>Logout</p>
              <span>
                <img src="/icons/logout.svg" alt="" />
              </span>
            </div>
          </div>
        </section>

        <section>
          <div
            className="bg-color-red-light-2 border border-color-red-light-3
       p-14 rounded-3xl relative"
          >
            <div className="absolute right-4 top-4 flex gap-4 items-center">
              <img src="/icons/send.svg" alt="" className="cursor-pointer" />
              <img src="/icons/copy.svg" alt="" className="cursor-pointer" />
            </div>
            <div>
              <p className="text-[2.4rem] text-color-purple">AB-3423</p>
              <p className="text-[1.4rem] max-w-[25rem] text-gray-500">
                Here's your Code. Share this with your customers.
              </p>
            </div>
          </div>
          <div className='grid gap-8 mt-10' style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))'
          }}>

            <p className='border rounded-3xl flex gap-6 px-6 py-4 items-center'>
                <img src="/icons/settings.svg" alt="" />
                <span>Settings</span>
            </p>
            <p className='border rounded-3xl flex gap-6 px-6 py-4 items-center'>
                <img src="/icons/support.svg" alt="" />
                <span>Support</span>
            </p>
            <p className='border rounded-3xl flex gap-6 px-6 py-4 items-center'>
                <img src="/icons/t&C.svg" alt="" />
                <span>Terms & Conditions</span>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Account;
