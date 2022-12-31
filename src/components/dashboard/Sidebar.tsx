import { BiMenu } from 'react-icons/bi';

import IconsBox from '../icons/index/IconsBox';
import LogoutSvg from '../icons/logoutSvg';

function Sidebar() {
  const handleLogout = () => {
    console.log('logout');
  };

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <section className="section-1">
          <div className="section-1__menu">
            <input
              type="checkbox"
              id="menu__checkbox"
              className="menu__checkbox"
            />
            <label htmlFor="menu__checkbox" className='menu__label'>
              hello
              <BiMenu />
            </label>
          </div>
          <div className="section-1__box">
            <img src="/logo-white.svg" alt="" width={28} height={28} />
            <h3>Swifth</h3>
          </div>
        </section>
        <section className="section-2">
          <IconsBox />
        </section>
        <section className="section-3">
          <button onClick={handleLogout}>
            <LogoutSvg fill="white" />
            Logout
          </button>
        </section>
      </div>
    </div>
  );
}

export default Sidebar;
