import {
  Navigate,
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import 'animate.css/animate.css';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import DashboardHome from '../container/Home';
import OnBoarding from '../container/Onboarding';
import Orders from '../pages/Orders';
import Payments from '../pages/Payments';
import Finance from '../pages/Finance';
import PayoutBank from '../pages/PayoutBank';
import Delivery from '../pages/Delivery';
import Team from '../pages/team/Team';
import ViewTeam from '../pages/team/ViewTeam';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Home />} />,
    <Route path="/dashboard" element={<Dashboard />}>
      <Route index element={<DashboardHome />} />
      <Route path="onboarding" element={<OnBoarding />} />
      <Route path="orders" element={<Orders />} />
      <Route path="payments" element={<Payments />} />
      <Route path="finance" element={<Finance />} />
      <Route path="delivery" element={<Delivery />} />
      <Route path="payoutBank" element={<PayoutBank />} />
      <Route path="team" element={<Team />} />
      <Route path="team/:Id" element={<ViewTeam />} />
    </Route>,
    <Route path="*" element={<Navigate to="/" />} />,
  ])
);

const App = () => {
  return (
    <div className="text-[1.6rem]">
      <RouterProvider router={router} />;
    </div>
  );
};

export default App;
