import { BiMenu } from 'react-icons/bi';


function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <section className="section-1">
          <BiMenu />
          <div className="section-1__box">
            <img src="/logo-white.svg" alt="" width={28} height={28} />
            <h3>Swifth</h3>
          </div>
        </section>
        <section>
          <img src="/dashboard/home.svg" alt="" width={24} height={24} />
        </section>
        <section>third</section>
      </div>
    </div>
  );
}

export default Sidebar;
