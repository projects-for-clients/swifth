import { BiMenu } from 'react-icons/bi';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import IconsBox from '../icons/IconsBox';
import LogoutSvg from '../icons/sidebar/logoutSvg';

function Sidebar() {
  const sidebarRef = useRef(null);
  const menuCheckboxRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

  const [openSidebar, setOpenSidebar] = useState(true);

  const handleLogout = () => {
    console.log('logout');
  };

  const handleToggleMenu = () => {
    const sidebar: HTMLDivElement = sidebarRef.current!;

    sidebar.classList.toggle('sidebarToggle');

    setOpenSidebar((state) => !state);
  };

  const selectDashboard = document.querySelector('.dashboard__home')
  useEffect(() => {

    if(menuCheckboxRef.current?.checked){
      selectDashboard?.classList.toggle('dashboard__home--mobile')
    }
  }, [menuCheckboxRef.current?.checked])

  return (
    <div className="bg-red- sidebar" ref={sidebarRef}>
      <div
        className={`sidebar__container ${
          openSidebar ? 'items-start' : 'items-center'
        }`}
      >
        <section className="section-1">
          <div className="section-1__box">
            <img src="/logo-white.svg" alt="" width={28} height={28} />
            <h3>Swifth</h3>
          </div>
          <span onChange={handleToggleMenu}>
            <input type="checkbox" id="menu__checkbox" ref={menuCheckboxRef} className='hidden' />

            <label htmlFor="menu__checkbox">
              <BiMenu />
            </label>
          </span>
        </section>
        <section className="section-2">
          <IconsBox />
        </section>
        <section className="section-3">
          <button onClick={handleLogout}>
            <LogoutSvg fill="white" />
            <span>Logout</span>
          </button>
        </section>
      </div>
    </div>
  );
}

export default Sidebar;
