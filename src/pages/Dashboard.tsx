import React from 'react';
import Header from '../components/dashboard/Header';
import Sidebar from '../components/dashboard/Sidebar';

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__container">
        <Header title="Hello, Nachi" subTitle="Welcome to Swifth" />
            
      </div>
    </div>
  );
}

export default Dashboard;
