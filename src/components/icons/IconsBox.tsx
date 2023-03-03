import { Link, NavLink, useLocation } from 'react-router-dom';

import HomeSvg from './sidebar/homeSvg';
import TeamSvg from './sidebar/teamSvg';
import OrderSvg from './sidebar/orderSvg';
import ReportSvg from './sidebar/reportSvg';
import FinanceSvg from './sidebar/financeSvg';
import AccountSvg from './sidebar/accountSvg';
import PaymentSvg from './sidebar/paymentSvg';
import AnalyticSvg from './sidebar/analyticSvg';
import DeliverySvg from './sidebar/deliverySvg';
import PayoutBankSvg from './sidebar/payoutBankSvg';

function IconsBox() {
  const location = useLocation();

  const { pathname } = location;

  console.log(pathname)
  return (
    <ul className="iconsBox">
      <li>
        <NavLink
          to="/dashboard"
          className={(props) => (props.isActive && location.pathname === '/dashboard' ? 'active' : '')}
        >
          <HomeSvg fill="white" />
          <span>Home</span>
        </NavLink>
      </li>
      <li className="iconsBox">
        <Link to="/dashboard/orders">
          {' '}
          <OrderSvg fill="white" />
          <span>Orders</span>
        </Link>
      </li>
      <li>
        <NavLink
          to="/dashboard/payments"
          className={(props) => (props.isActive ? 'active' : '')}
        >
          <PaymentSvg fill="white" />
          <span>Payments</span>
        </NavLink>
      </li>
      <li>
        <Link to="/dashboard/finance">
          {' '}
          <FinanceSvg fill="white" />
          <span>Finance</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard/payoutBank">
          <PayoutBankSvg fill="white" />
          <span>Payout Bank</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard/delivery">
          {' '}
          <DeliverySvg fill="white" />
          <span>Delivery</span>{' '}
        </Link>
      </li>
      <li>
        <Link to="/dashboard/team">
          {' '}
          <TeamSvg fill="white" />
          <span>Teams</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard/analytics">
          <AnalyticSvg fill="white" />
          <span>Analytics</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard/reports">
          {' '}
          <ReportSvg fill="white" />
          <span>Reports</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard/account">
          <AccountSvg fill="white" />
          <span>Account</span>
        </Link>
      </li>
    </ul>
  );
}

export default IconsBox;
