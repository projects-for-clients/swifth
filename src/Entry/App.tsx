import {
  Navigate,
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import DashboardHome from '../container/dashboard/Home';
import OnBoarding from '../container/Onboarding';
import Orders from '../pages/Orders';
import 'animate.css/animate.css';
import 'react-toastify/dist/ReactToastify.css';
import Payments from '../pages/Payments';
import Finance from '../pages/Finance';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Home />} />,
    <Route path="/dashboard" element={<Dashboard />}>
      <Route index element={<DashboardHome />} />
      <Route path="orders" element={<Orders />} />
      <Route path="payments" element={<Payments />} />
      <Route path="finance" element={<Finance />} />
      <Route path="onboarding" element={<OnBoarding />} />
    </Route>,
    <Route path="*" element={<Navigate to="/" />} />,
  ])
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
