import { Outlet } from 'react-router';
import Sidebar from '../components/dashboard/Sidebar';

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__container">
        <Outlet />
      </div>
    </div>
  );

}

export default Dashboard;
