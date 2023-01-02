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
            <h1>{title}</h1>
            <p>{subTitle}</p>
      </div>
      <div className="header__right">
      <NotificationSvg/>
      <AccountSvg fill="black"/>
      </div>
    </div>
  );
}

export default Header;
