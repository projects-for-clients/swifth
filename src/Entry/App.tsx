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
import Orders from '../container/dashboard/orders';
import 'animate.css/animate.css';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Home />} />,
    <Route path="/dashboard" element={<Dashboard />}>
      <Route
        index
        element={ <DashboardHome />}
      />
      <Route path="orders" element={<Orders />} />
      <Route path="onboarding" element={<OnBoarding />} />
    </Route>,
    <Route path="*" element={<Navigate to="/" />} />,
  ])
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
