import { BiMenu } from 'react-icons/bi';
import IconsBox from '../icons/IconsBox';

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
        <section className='section-2'>
          <IconsBox/>
        </section>
        <section>third</section>
      </div>
    </div>
  );
}

export default Sidebar;
