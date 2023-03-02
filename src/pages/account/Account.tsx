import { useState, useRef } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
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

  const name = 'Ben Davis'
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
                Permissions (<span className="text-color-purple-1">'sdfsf'</span>
                )
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
                
                    <div
                      className="flex items-center gap-8 cursor-pointer justify-between bg-color-purple-light-1 rounded-2xl p-6"
                    >
                      <div>
                        <p>sdfsf</p>
                        <p className="text-[1.4rem] text-gray-500">
                          {`RC - sdfs`}
                        </p>
                      </div>

                      <p>Dec 9, 2023</p>
                    </div>
                 
              </div>
            </div>
          )}
        </div>
      </dialog>
      <Header title="Account" />

      <main className="text-[1.6rem] grid gap-10">
       

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
           
            
          <div>
            <p className='flex items-center gap-4 font-Satoshi-Medium'>
                <span >{name}</span> <img src="/icons/line.svg" alt=""  /> <span>BenDavis Clearing Services Ltd</span>
            </p>
            <p className="lowercase">{name.split(' ').join('')}@gmail.com</p>
          </div>
        </div>
         
          </div>


       

        
      </main>
    </>
  );
};

export default Account;
