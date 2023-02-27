import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/dashboard/Header';

interface Access {
id: number;
name: string;
description: string;
}

const AddRole = () => {
  const navigate = useNavigate();
  const [toggleAccess, setToggleAccess] = useState<{
    [key: string]: boolean;
  } | null>(null);

  const AccessArr: Access[] = Array.from({ length: 5 }).map((_, i) => {
    return {
      id: i,
      name: `Access ${i + 1}`,
      description: 'Full access except user management',
    };
  });

  const handleToggle = (key: string) => {
    setToggleAccess((prev) => ({
      ...prev,
      [key]: !prev?.[key],
    }));
  };

  return (
    <>
      <Header title="Team" />

      <main className="text-[1.6rem] grid gap-10 max-w-[70rem]">
        <div className="flex items-center gap-16">
          <BiArrowBack
            className="text-[1.8rem] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <p className="text-[2rem]">Add New Role</p>
        </div>

        <div className="mt-10 grid gap-8">
          <div>
            <label className="text-[1.4rem] mb-4">Role name</label>
            <input
              type="text"
              className=" border border-gray-300 p-6 outline-none w-full rounded-2xl"
              placeholder="Enter role name"
            />
          </div>
          <div>
            <label className="text-[1.4rem] mb-4">Permission</label>
            <div className="relative border border-gray-300 p-6  w-full rounded-2xl flex items-center pr-12">
              <input
                type="text"
                className=" outline-none w-full"
                placeholder="Search and add permission"
              />

              <div className="absolute right-8 flex items-center font-medium gap-8">
                <img src="/icons/line.svg" alt="" />
                <button className="outline-none border-none text-color-primary flex items-center gap-4">
                  <IoMdAdd />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 py-16">
          {AccessArr.map((item, i) => {
            const { name, description } = item;
            return (
              <div
                key={item.id}
                className="flex items-center gap-8 cursor-pointer justify-between"
              >
                <div>
                  <p>{name}</p>
                  <p>{i === 0 ? 'Can only create orders' : description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button className="btn border border-color-primary rounded-2xl uppercase text-color-primary w-[30rem] absolute right-0 bottom-0 mx-8 my-8 font-medium">
          Send Invite
        </button>
      </main>
    </>
  );
};

export default AddRole;
