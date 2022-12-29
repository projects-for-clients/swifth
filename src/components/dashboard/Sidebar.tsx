import { BiMenu } from 'react-icons/bi';
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <section className="section-1">
          <BiMenu />
          <div>
            <img src="/logo-white.svg" alt="" width={28} height={28} />
          </div>
          <h3>Swifth</h3>
        </section>
        <section>second</section>
        <section>third</section>
      </div>
    </div>
  );
}

export default Sidebar;
