import { Link } from 'react-router-dom';

import HomeSvg from '../homeSvg';
import TeamSvg from '../teamSvg';
import OrderSvg from '../orderSvg';
import ReportSvg from '../reportSvg';
import FinanceSvg from '../financeSvg';
import AccountSvg from '../accountSvg';
import PaymentSvg from '../paymentSvg';
import AnalyticSvg from '../analyticSvg';
import DeliverySvg from '../deliverySvg';
import PayoutBankSvg from '../payoutBankSvg';

function IconsBox() {
  return (
    <ul className="iconsBox">
      <li className="iconsBox__list">
        <Link to="/">
          <HomeSvg fill="white" />
          <span>Home</span>
        </Link>
      </li>
      <li className="iconsBox__list">
        <Link to="/">
          {' '}
          <OrderSvg fill="white" />
          <span>Orders</span>
        </Link>
      </li>
      <li className="iconsBox__list">
        <Link to="/">
          <PaymentSvg fill="white" />
          <span>Payments</span>
        </Link>
      </li>
      <li className="iconsBox__list">
        <Link to="/">
          {' '}
          <FinanceSvg fill="white" />
          <span>Finance</span>
        </Link>
      </li>
      <li className="iconsBox__list">
        <Link to="/">
          <PayoutBankSvg fill="white" />
          <span>Payout Bank</span>
        </Link>
      </li>
      <li className="iconsBox__list">
        <Link to="/">
          {' '}
          <DeliverySvg fill="white" />
          <span>Delivery</span>{' '}
        </Link>
      </li>
      <li className="iconsBox__list">
        <Link to="/">
          {' '}
          <TeamSvg fill="white" />
          <span>Teams</span>
        </Link>
      </li>
      <li className="iconsBox__list">
        <Link to="/">
          <AnalyticSvg fill="white" />
          <span>Analytics</span>
        </Link>
      </li>
      <li className="iconsBox__list">
        <Link to="/">
          {' '}
          <ReportSvg fill="white" />
          <span>Reports</span>
        </Link>
      </li>
      <li className="iconsBox__list">
        <Link to="/">
          <AccountSvg fill="white" />
          <span>Account</span>
        </Link>
      </li>
    </ul>
  );
}

export default IconsBox;
