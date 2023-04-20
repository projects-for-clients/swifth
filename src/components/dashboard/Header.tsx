import { Dispatch, SetStateAction } from 'react';
import NotificationSvg from '../icons/notificationSvg';
import AccountSvg from '../icons/sidebar/accountSvg';
import { BiMenu } from 'react-icons/bi';

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
  return (
    <div className="flex justify-between mb-[3rem]">
      <div className="grid gap-0">
        <span className='bg-color-primary-dark flex sm:hidden'>
          <BiMenu className='text-white' />
        </span>
        <div>
          <p className="font-medium text-[2.4rem]">{title}</p>
          <p className={`${onboarding ? 'text-[1.4rem]' : 'font-medium'}`}>
            {subTitle}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span onClick={handleToggle} className="cursor-pointer ">
          <NotificationSvg width={25} height={25}/>
        </span>
        <AccountSvg fill="black" />
      </div>
    </div>
  );
}

export default Header;
