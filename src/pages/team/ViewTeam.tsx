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
        {initials}
        <div></div>
      </main>
    </>
  );
};

export default ViewTeam;
