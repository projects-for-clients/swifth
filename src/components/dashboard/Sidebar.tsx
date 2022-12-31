import { BiMenu } from 'react-icons/bi';
import { useRef } from 'react';

import IconsBox from '../icons/index/IconsBox';
import LogoutSvg from '../icons/logoutSvg';

function Sidebar() {
  const sidebarRef = useRef(null)

  const handleLogout = () => {
    console.log('logout');
  };

  const handleToggleMenu = () => {
    
    
  }

  return (
    <div className="sidebar" ref={sidebarRef}>
      <div className="sidebar__container">
        <section className="section-1">
          <div className="section-1__box">
            <img src="/logo-white.svg" alt="" width={28} height={28} />
            <h3>Swifth</h3>
          </div>
          <span onClick={handleToggleMenu}>
            <BiMenu />
          </span>
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
