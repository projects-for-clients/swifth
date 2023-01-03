import NotificationSvg from "../icons/notificationSvg";
import AccountSvg from "../icons/sidebar/accountSvg";



type THeader = {
    title: string
    subTitle: string
}

function Header({title, subTitle}: THeader) {
  return (
    <div className="header">
      <div className="header__left">
            <h1 className="font-medium">{title}</h1>
            <h2 className="font-medium">{subTitle}</h2>
      </div>
      <div className="header__right">
      <NotificationSvg/>
      <AccountSvg fill="black"/>
      </div>
    </div>
  );
}

export default Header;
