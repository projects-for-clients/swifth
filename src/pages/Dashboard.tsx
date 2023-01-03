import Header from '../components/dashboard/Header';
import Sidebar from '../components/dashboard/Sidebar';

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__container">
        <Header title="Hello, Nachi" subTitle="Welcome to Swifth" />

        <div>
          <h3>Account Setup</h3>
          <p>
            It’s time to set up your account. We will need a few things to get
            you going
          </p>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
