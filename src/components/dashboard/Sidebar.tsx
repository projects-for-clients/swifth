import { BiMenu } from 'react-icons/bi';
import { useRef, useState } from 'react';

import IconsBox from '../icons/index/IconsBox';
import LogoutSvg from '../icons/logoutSvg';

function Sidebar() {
  const sidebarRef = useRef(null);
  const section_2_ref = useRef(null);
  const section_1_boxRef = useRef(null);

  const [openSidebar, setOpenSidebar] = useState(true);

  const handleLogout = () => {
    console.log('logout');
  };

  const handleToggleMenu = () => {
    const sidebar: HTMLDivElement = sidebarRef.current!;

    sidebar.classList.toggle('sidebarToggle');

    const section_2: HTMLElement = section_2_ref.current!;

    section_2.classList.toggle('section-2_toggle');

    const section_1_box: HTMLDivElement = section_1_boxRef.current!;

    section_1_box.classList.toggle('section-1_box_toggle');

    setOpenSidebar((state) => !state);
  };

  return (
    <div className="sidebar" ref={sidebarRef}>
      <div
        className={`sidebar__container ${
          openSidebar ? 'items-start' : 'items-center'
        }`}
      >
        <section className="section-1">
          <div className="section-1__box" ref={section_1_boxRef}>
            <img src="/logo-white.svg" alt="" width={28} height={28} />
            <h3>Swifth</h3>
          </div>
          <span onClick={handleToggleMenu}>
            <BiMenu />
          </span>
        </section>
        <section className="section-2" ref={section_2_ref}>
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
