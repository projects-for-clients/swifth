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
    <div className="header">
      <div className="header__left">
        <label htmlFor="menu__checkbox">
          <BiMenu />
        </label>
        <div>
          <p className="font-medium text-[2.4rem]">{title}</p>
          <p className={`${onboarding ? 'text-[1.4rem]' : 'font-medium'}`}>
            {subTitle}
          </p>
        </div>
      </div>
      <div className="header__right">
        <span onClick={handleToggle} className="cursor-pointer">
          <NotificationSvg />
        </span>
        <AccountSvg fill="black" />
      </div>
    </div>
  );
}

export default Header;
