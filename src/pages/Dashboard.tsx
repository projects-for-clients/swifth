import { Outlet } from 'react-router';
import Sidebar from '../components/dashboard/Sidebar';

function Dashboard() {
  return (
    <div className=" grid grid-cols-max-auto h-screen">
      <Sidebar />
      <div className="py-[2rem] px-[4rem] h-screen overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
