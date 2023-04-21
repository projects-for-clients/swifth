import { Dispatch, SetStateAction } from 'react';
import NotificationSvg from '../icons/notificationSvg';
import AccountSvg from '../icons/sidebar/accountSvg';
import { BiMenu } from 'react-icons/bi';
import { toggleSidebar, selectUI } from '../../store/features/ui';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';

type THeader = {
  title: string;
  subTitle?: string;
  onboarding?: boolean;
  openDialog?: () => void;
};

function Header({ title, subTitle, onboarding, openDialog }: THeader) {
  const handleToggle = () => {
    openDialog && openDialog();
  };

  const { is_sidebar_open } = useAppSelector(selectUI);
  const dispatch = useAppDispatch();

  const sidebar_handler = () => {
    console.log('called');
    is_sidebar_open
      ? dispatch(toggleSidebar('close'))
      : dispatch(toggleSidebar('open'));

    console.log('called2');
  };
  return (
    <div className="flex justify-between mb-[3rem] relative">
      <div className="flex items-center gap-4 ">
        <span
          className="bg-color-primary-dark flex p-2 rounded-xl absolute left-0 m-4 -ml-10 cursor-pointer sm:hidden"
          onClick={sidebar_handler}
        >
          <BiMenu className="text-white w-[2rem] h-[2rem]" />
        </span>
        <div className="grid ml-[5rem]">
          <p className="font-medium text-[2.4rem]">{title}</p>
          <p className={`${onboarding ? 'text-[1.4rem]' : 'font-medium'}`}>
            {subTitle}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span onClick={handleToggle} className="cursor-pointer ">
          <NotificationSvg width={25} height={25} />
        </span>
        <span className="hidden sm:flex">
          <AccountSvg fill="black" />
        </span>
      </div>
    </div>
  );
}

export default Header;
