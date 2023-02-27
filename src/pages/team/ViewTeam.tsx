import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import Header from '../../components/dashboard/Header';

const ViewTeam = () => {
  const location = useLocation();

  const { id, name, role } = location && location?.state;

  let initials = name.split(' ').map((n: string[]) => n[0]);
  return (
    <>
      <Header title="Team" />

      <main className="text-[1.6rem] grid gap-10">
        <div className="flex items-center gap-16">
          <BiArrowBack />
          <p className="text-[2rem]">{name}</p>
        </div>

        <div className="grid gap-8">
          <div className="flex items-end gap-16">
            <figure className="relative grid place-content-center w-[13rem] h-[13rem]">
              <img
                src=""
                alt=""
                className="absolute w-full h-full rounded-full  z-[1]"
              />
              <p className="absolute w-full h-full z-[2] text-[5rem] bg-red-100 border border-color-red-light-3 grid place-content-center rounded-full">
                <span>{initials}</span>
              </p>
            </figure>

            <button className="btn uppercase border border-color-primary text-color-primary text-center rounded-2xl font-medium">
              Edit Profile
            </button>
          </div>

          <div>
            <p className="lowercase">{name.split(' ').join('')}@gmail.com</p>
            <p>+23498523823</p>
          </div>
        </div>

        <div className="grid gap-8 border-t max-w-[70rem] py-16">
          <div className='grid grid-cols-2'>
            <div>
              <p className="text-[1.4rem] text-gray-500">Role</p>
              <p className="capitalize">{role}</p>
            </div>

            <div className="border rounded-2xl px-8 py-4 flex justify-between items-center">
              <p className="font-medium capitalize">See Permissions</p>
              <BsArrowRight />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ViewTeam;
