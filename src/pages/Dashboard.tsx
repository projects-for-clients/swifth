import { Outlet } from 'react-router';
import { useRef, useEffect, useState, MutableRefObject } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import { useDebouncedEvent } from '../components/utils/useDebouncedEvent';

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__container">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard;
