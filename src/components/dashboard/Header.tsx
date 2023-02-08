import NotificationSvg from "../icons/notificationSvg";
import AccountSvg from "../icons/sidebar/accountSvg";

type THeader = {
    title: string
    subTitle: string
    onboarding?: boolean
    toggleDialog?: () => void
}

function Header({title, subTitle, onboarding}: THeader) {
  return (
    <div className="header">
      <div className="header__left">
            <h1 className="font-medium">{title}</h1>
            <p className={`${onboarding ? 'text-[1.4rem]' : 'font-medium'}`}>{subTitle}</p>
      </div>
      <div className="header__right">
      <NotificationSvg/>
      <AccountSvg fill="black"/>
      </div>
    </div>
  );
}

export default Header;
