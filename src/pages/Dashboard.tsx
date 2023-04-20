import { Outlet } from 'react-router';
import Sidebar from '../components/dashboard/Sidebar';

function Dashboard() {
  return (
    <div className=" grid grid-cols-none grid-cols-[max-content auto]">
      <Sidebar />
      <div className="dashboard__container">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
