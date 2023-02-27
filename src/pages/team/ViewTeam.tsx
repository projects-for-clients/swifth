import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
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

        <div>
            <div>

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

        <button className='btn uppercase border border-color-primary text-color-primary text-center'>
            Edit Profile
        </button>
              </div>
        </div>
      </main>
    </>
  );
};

export default ViewTeam;
