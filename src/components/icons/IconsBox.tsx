import { NavLink, useLocation } from 'react-router-dom';

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


  return (
    <ul className="iconsBox">
      <li>
        <NavLink
          to="/dashboard"
          className={(props) =>
            props.isActive && location.pathname === '/dashboard' ? 'active' : ''
          }
        >
          <HomeSvg fill="white" />
          <span>Home</span>
        </NavLink>
      </li>
      <li className="iconsBox">
        <NavLink
          to="/dashboard/orders"
          className={(props) => (props.isActive ? 'active' : '')}
        >
          {' '}
          <OrderSvg fill="white" />
          <span>Orders</span>
        </NavLink>
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
        <NavLink
          to="/dashboard/finance"
          className={(props) => (props.isActive ? 'active' : '')}
        >
          {' '}
          <FinanceSvg fill="white" />
          <span>Finance</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/payoutBank"
          className={(props) => (props.isActive ? 'active' : '')}
        >
          <PayoutBankSvg fill="white" />
          <span>Payout Bank</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/delivery"
          className={(props) => (props.isActive ? 'active' : '')}
        >
          {' '}
          <DeliverySvg fill="white" />
          <span>Delivery</span>{' '}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/team"
          className={(props) => (props.isActive ? 'active' : '')}
        >
          {' '}
          <TeamSvg fill="white" />
          <span>Teams</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/analytics"
          className={(props) => (props.isActive ? 'active' : '')}
        >
          <AnalyticSvg fill="white" />
          <span>Analytics</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/reports"
          className={(props) => (props.isActive ? 'active' : '')}
        >
          {' '}
          <ReportSvg fill="white" />
          <span>Reports</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/account"
          className={(props) => (props.isActive ? 'active' : '')}
        >
          <AccountSvg fill="white" />
          <span>Account</span>
        </NavLink>
      </li>
    </ul>
  );
}

export default IconsBox;
