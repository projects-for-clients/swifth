import React, { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/dashboard/Header';
import { Roles } from './Team';

const ViewTeam = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState<Roles>('admin');
  const [isEditProfile, setIsEditProfile] = useState(false);

  const { name, role } = location?.state;



  let initials = name.split(' ').map((n: string[]) => n[0]);
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
             // onClick={() => handleCloseDialog()}
            />
          </figure>

          <h3 className="text-[2.4rem] mb-10">Delivery history</h3>
          
</div>
      </dialog>
      <Header title="Team" />

      <main className="text-[1.6rem] grid gap-10">
        <div className="flex items-center gap-16">
          <BiArrowBack
            className="text-[1.8rem] cursor-pointer"
            onClick={
              isEditProfile ? () => setIsEditProfile(false) : () => navigate(-1)
            }
          />
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
            {!isEditProfile && (
              <button
                className="btn uppercase border border-color-primary text-color-primary text-center rounded-2xl font-medium"
                onClick={() => setIsEditProfile(true)}
              >
                Edit Profile
              </button>
            )}
          </div>

          <div>
            <p className="lowercase">{name.split(' ').join('')}@gmail.com</p>
            <p>+23498523823</p>
          </div>
        </div>

        {isEditProfile ? (
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
        ) : (
          <div className="grid gap-8 border-t max-w-[70rem] py-16">
            <div className="grid grid-cols-2">
              <div>
                <p className="text-[1.4rem] text-gray-500">Role</p>
                <p className="capitalize">{role}</p>
              </div>

              <div className="border rounded-2xl px-8 py-4 flex justify-between items-center">
                <p className="font-medium capitalize">See Permissions</p>
                <BsArrowRight />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <p className="text-[1.4rem] text-gray-500">Date Added</p>
                <p className="capitalize">Dec 3, 2023</p>
              </div>

              <div className="border rounded-2xl px-8 py-4 flex justify-between items-center">
                <p className="font-medium capitalize">History/Activity</p>
                <BsArrowRight />
              </div>
            </div>
            <div>
              <p className="text-[1.4rem] text-gray-500">Last Interaction</p>
              <p className="capitalize">Dec 3, 2023</p>
            </div>
          </div>
        )}

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

export default ViewTeam;
