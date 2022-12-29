import { BiMenu } from 'react-icons/bi';
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <section>
          <BiMenu />
        </section>
        <section>second</section>
        <section>third</section>
      </div>
    </div>
  );
}

export default Sidebar;
