import { BiMenu } from 'react-icons/bi';
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <section className='section-1'>
            <img src="/logo-white.svg" alt="" width={14} height={14} />
          <h3 className="header__left--logoText">Swifth</h3>
          <BiMenu />
        </section>
        <section>second</section>
        <section>third</section>
      </div>
    </div>
  );
}

export default Sidebar;
