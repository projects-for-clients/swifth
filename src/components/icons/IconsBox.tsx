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
  interface Link {
    name: string;
    to: string;
    Icon: ({ fill }: { fill: string }) => JSX.Element;
  }
  const LINKS = [
    {
      name: 'home',
      to: '/dashboard',
      Icon: HomeSvg,
    },
    {
      name: 'orders',
      to: '/dashboard/orders',
      Icon: OrderSvg,
    },
    {
      name: 'payments',
      to: '/dashboard/payments',
      Icon: PaymentSvg,
    },
    {
      name: 'finance',
      to: '/dashboard/finance',
      Icon: FinanceSvg,
    },
    {
      name: 'payout bank',
      to: '/dashboard/payoutBank',
      Icon: PayoutBankSvg,
    },
    {
      name: 'delivery',
      to: '/dashboard/delivery',
      Icon: DeliverySvg,
    },
    {
      name: 'teams',
      to: '/dashboard/team',
      Icon: TeamSvg,
    },
    {
      name: 'analytics',
      to: '/dashboard/analytics',
      Icon: AnalyticSvg,
    },
    {
      name: 'reports',
      to: '/dashboard/reports',
      Icon: ReportSvg,
    },
    {
      name: 'account',
      to: '/dashboard/account',
      Icon: AccountSvg,
    },
  ] satisfies Link[];

  return (
    <ul className="iconsBox">
      {LINKS.map(({ to, Icon, name }, idx) => {
        return (
          <li key={idx}>
            <NavLink
              to={to}
              className={(props) =>
                idx === 0 &&
                props.isActive &&
                location.pathname === '/dashboard'
                  ? 'active'
                  : props.isActive
                  ? 'active'
                  : ''
              }
            >
              <Icon fill={'white'} />
              <span className="capitalize">{name}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}

export default IconsBox;
