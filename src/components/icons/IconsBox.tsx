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
    <ul className="grid gap-4 w-full">
      {LINKS.map(({ to, Icon, name }, idx) => {

        const classes = `flex gap-4 rounded-[8px] items-center py-4 w-max transition-all duration-[.2s] hover:px-8 hover:bg-color-primary hover:text-black hover:translate-x-4 hover:scale-[1.01] hover:[&>svg]:fill-black`;

        return (
          <li key={idx}>
            <NavLink
              to={to}
              className={(props) =>
                (idx === 0 &&
                  props.isActive &&
                  location.pathname === '/dashboard') ||
                (props.isActive && idx > 0)
                  ? classes +
                    'transition-all duration-[.2s] py-4 px-8 bg-color-green-light text-black [&>svg]:fill-black '
                  : classes
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
