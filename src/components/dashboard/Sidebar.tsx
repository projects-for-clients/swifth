import { BiMenu } from 'react-icons/bi';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import IconsBox from '../icons/IconsBox';
import LogoutSvg from '../icons/sidebar/logoutSvg';
import {selectUI} from '../../store/features/ui';
import { useAppSelector } from '../../store/app/hooks';


function Sidebar() {
  const {is_sidebar_open} = useAppSelector(selectUI)
  const sidebarRef = useRef(null);
  const menuCheckboxRef: MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  const [openSidebar, setOpenSidebar] = useState(true);

  const handleLogout = () => {
    console.log('logout');
  };

  const handleToggleMenu = () => {
    const sidebar: HTMLDivElement = sidebarRef.current!;

    sidebar.classList.toggle('sidebarToggle');

    setOpenSidebar((state) => !state);
  };

  const selectDashboard = document.querySelector('.dashboard__home');

  useEffect(() => {
    if (menuCheckboxRef.current?.checked) {
      selectDashboard?.classList.toggle('dashboard__home--mobile');
    }
  }, [menuCheckboxRef.current?.checked]);

  return (
    <div
      className={`${!is_sidebar_open ? 'translate-x-[-100vw] opacity-0': ''} sm:sidebar `}
      ref={sidebarRef}
      style={{
        transform: 'translateX(0)',
        opacity: '1',
      }}
    >
      <div
        className={`absolute p-16 w-full h-[80rem] flex flex-col justify-between text-white bg-color-primary-dark ${
          openSidebar ? 'items-start' : 'items-center'
        }`}
      >
        <section className="flex w-full gap-16 justify-between items-center relative section-1">
          <div className="flex gap-2 section-1__box">
            <img src="/logo-white.svg" alt="" width={28} height={28} />
            <h3 className="text-white font-medium">Swifth</h3>
          </div>
          <span onChange={handleToggleMenu}>
            <input
              type="checkbox"
              id="menu__checkbox"
              ref={menuCheckboxRef}
              className="hidden"
            />

            <label
              htmlFor="menu__checkbox"
              className=" text-white cursor-pointer"
            >
              <BiMenu className="w-[2.8rem] h-[2.8rem]" />
            </label>
          </span>
        </section>
        <section className="section-2">
          <IconsBox />
        </section>
        <section className="section-3">
          <button
            onClick={handleLogout}
            className="flex gap-4 rounded-[8px] items-center py-4 w-max transition-all duration-[.2s] hover:px-8 hover:bg-color-primary hover:text-black hover:translate-x-4 hover:scale-[1.01] [&>svg]:hover:fill-black [&>svg]:hover:transition-all [&>svg]:hover:duration-[.1s]"
          >
            <LogoutSvg fill="white" />
            <span>Logout</span>
          </button>
        </section>
      </div>
    </div>
  );
}

export default Sidebar;
