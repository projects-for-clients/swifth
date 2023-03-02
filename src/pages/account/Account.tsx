import { createContext, useState } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';

import Header from '../../components/dashboard/Header';
import Dialog from './Dialog/Dialog';

export type DialogType = 'personal' | 'business' | 'ports' | 'config';

export const DialogContext = createContext<null>(null as any)
const Account = () => {

  const [dialogType, setDialogType] = useState<DialogType>('personal');

  const name = 'Ben Davis';
  let initials = name.split(' ').map((n: string) => n[0]);

  return (
    <>
      <Dialog />
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
            <button
              className="border border-color-purple-light-2 rounded-3xl p-6 flex items-center justify-between"
              onClick={() => setDialogType('personal')}
            >
              <p>Personal Information</p>
              <span>
                <HiOutlineChevronRight />
              </span>
            </button>
            <div className="border border-color-purple-light-2 rounded-3xl p-6 flex items-center justify-between">
              <button
                className="grid justify-items-start gap-4"
                onClick={() => setDialogType('business')}
              >
                <p>Business Information</p>
                <span className="border border-color-primary-light bg-green-100 text-color-primary-dark text-[1.2rem] rounded-3xl py-2 px-4">
                  Up to date
                </span>
              </button>
              <span>
                <HiOutlineChevronRight />
              </span>
            </div>
            <div className="border border-color-purple-light-2 rounded-3xl p-6 flex items-center justify-between">
              <button
                className="grid justify-items-start gap-4"
                onClick={() => setDialogType('ports')}
              >
                <p>Ports and Terminals Information</p>
                <span className="border border-color-primary-light bg-green-100 text-color-primary-dark text-[1.2rem] rounded-3xl py-2 px-4">
                  Up to date
                </span>
              </button>
              <span>
                <HiOutlineChevronRight />
              </span>
            </div>
            <button
              className="border border-color-purple-light-2 rounded-3xl p-6 flex items-center justify-between"
              onClick={() => setDialogType('config')}
            >
              <p>Formular Configuration</p>
              <span>
                <HiOutlineChevronRight />
              </span>
            </button>
            <button className="border border-red-600 rounded-3xl p-6 flex items-center justify-between text-red-600 mt-20">
              <p>Logout</p>
              <span>
                <img src="/icons/logout.svg" alt="" />
              </span>
            </button>
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
          <div
            className="grid gap-8 mt-10"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
            }}
          >
            <button className="border rounded-3xl flex gap-6 px-6 py-4 items-center">
              <img src="/icons/settings.svg" alt="" />
              <span>Settings</span>
            </button>
            <button className="border rounded-3xl flex gap-6 px-6 py-4 items-center">
              <img src="/icons/support.svg" alt="" />
              <span>Support</span>
            </button>
            <button className="border rounded-3xl flex gap-6 px-6 py-4 items-center">
              <img src="/icons/t&C.svg" alt="" />
              <span>Terms & Conditions</span>
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Account;
