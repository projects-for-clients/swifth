import React, { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/dashboard/Header';
import { Roles } from './Team';

const AddMember = () => {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState<Roles>('admin');


  return (
    <>
      <Header title="Team" />

      <main className="text-[1.6rem] grid gap-10">
        <div className="flex items-center gap-16">
          <BiArrowBack
            className="text-[1.8rem] cursor-pointer"
            onClick={
             () => navigate(-1)
            }
          />
          <p className="text-[2rem]">Add a team Member</p>
        </div>

       

       
          <div className="grid gap-8 max-w-[70rem] py-16">
            <p className="font-medium text-[2rem]">User type/Role</p>

            <div className="grid gap-8">
              <label
                htmlFor="admin"
                className="flex items-center gap-8 cursor-pointer"
              >
                <input
                  type="radio"
                  name="role"
                  id="admin"
                  className="hidden"
                  onChange={() => setCurrentRole('admin')}
                />

                {currentRole === 'admin' ? (
                  <img src="/icons/filled-Role.svg" alt="" />
                ) : (
                  <img src="/icons/empty-Role.svg" alt="" />
                )}

                <div>
                  <p className="text-[2rem] font-medium">Admin</p>
                  <p>Account User with full access</p>
                </div>
              </label>

              <label
                htmlFor="field agent"
                className="flex items-center gap-8 cursor-pointer"
              >
                <input
                  type="radio"
                  name="role"
                  id="field agent"
                  className="hidden"
                  onChange={() => setCurrentRole('field agent')}
                />

                {currentRole === 'field agent' ? (
                  <img src="/icons/filled-Role.svg" alt="" />
                ) : (
                  <img src="/icons/empty-Role.svg" alt="" />
                )}
                <div>
                  <p className="text-[2rem] font-medium">Field Agent</p>
                  <p>
                    Has full access except, user management and list exports
                  </p>
                </div>
              </label>

              <label
                htmlFor="CustomerRep"
                className="flex items-center gap-8 cursor-pointer"
              >
                <input
                  type="radio"
                  name="role"
                  id="CustomerRep"
                  className="hidden"
                  onChange={() => setCurrentRole('customer care rep')}
                />

                {currentRole === 'customer care rep' ? (
                  <img src="/icons/filled-Role.svg" alt="" />
                ) : (
                  <img src="/icons/empty-Role.svg" alt="" />
                )}
                <div>
                  <p className="text-[2rem] font-medium">
                    Customer Care Representative
                  </p>
                  <p>
                    Has full access except, user management and list exports
                  </p>
                </div>
              </label>
            </div>
          </div>
       

        {isEditProfile ? (
          <button className="btn border border-color-primary rounded-2xl uppercase text-color-primary w-[30rem] absolute right-0 bottom-0 mx-8 my-8 font-medium">
            Save Changes
          </button>
        ) : (
          <button className="btn border border-red-600 rounded-2xl uppercase text-red-600 w-[30rem] absolute right-0 bottom-0 mx-8 my-8 font-medium">
            Deactivate Member
          </button>
        )}
      </main>
    </>
  );
};

export default AddMember;
