import NotificationSvg from "../icons/notificationSvg";
import AccountSvg from "../icons/sidebar/accountSvg";



type THeader = {
    title: string
    subTitle: string
}

function Header({title, subTitle}: THeader) {
  return (
    <div className="flex justify-between items-center">
      <div className="grid">
            <h1>{title}</h1>
            <p>{subTitle}</p>
      </div>
      <div className="flex">
      <NotificationSvg/>
      <AccountSvg fill="black"/>
      </div>
    </div>
  );
}

export default Header;
