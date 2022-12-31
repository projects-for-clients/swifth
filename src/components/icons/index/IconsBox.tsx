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
    <ul className='iconsBox'>
      <li className='iconsBox__list'>
        <HomeSvg fill="white" />
        <Link to="/">Home</Link>
      </li>
      <li className='iconsBox__list'>
        <OrderSvg fill="white" />
        <Link to="/">Orders</Link>
      </li>
      <li className='iconsBox__list'>
        <PaymentSvg fill="white" />
        <Link to="/">Payments</Link>
      </li>
      <li className='iconsBox__list'>
        <FinanceSvg fill="white" />
        <Link to="/">Finance</Link>
      </li>
      <li className='iconsBox__list'>
        <PayoutBankSvg fill="white" />
        <Link to="/">Payout Bank</Link>
      </li>
      <li className='iconsBox__list'>
        <DeliverySvg fill="white" />
        <Link to="/">Delivery</Link>
      </li>
      <li className='iconsBox__list'>
        <TeamSvg fill="white" />
        <Link to="/">Teams</Link>
      </li>
      <li className='iconsBox__list'>
        <AnalyticSvg fill="white" />
        <Link to="/">Analytics</Link>
      </li>
      <li className='iconsBox__list'>
        <ReportSvg fill="white" />
        <Link to="/">Reports</Link>
      </li>
      <li className='iconsBox__list'>
        <AccountSvg fill="white" />
        <Link to="/">Account</Link>
      </li>
    </ul>
  );
}

export default IconsBox;
