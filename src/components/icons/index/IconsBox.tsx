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
        <HomeSvg fill="white" />
        <Link to="/">Orders</Link>
      </li>
      <li className='iconsBox__list'>
        <HomeSvg fill="white" />
        <Link to="/">Home</Link>
      </li>
      <li className='iconsBox__list'>
        <HomeSvg fill="white" />
        <Link to="/">Home</Link>
      </li>
      <li className='iconsBox__list'>
        <HomeSvg fill="white" />
        <Link to="/">Home</Link>
      </li>
      <li className='iconsBox__list'>
        <HomeSvg fill="white" />
        <Link to="/">Home</Link>
      </li>
      <li className='iconsBox__list'>
        <HomeSvg fill="white" />
        <Link to="/">Home</Link>
      </li>
      <li className='iconsBox__list'>
        <HomeSvg fill="white" />
        <Link to="/">Home</Link>
      </li>
      <li className='iconsBox__list'>
        <HomeSvg fill="white" />
        <Link to="/">Home</Link>
      </li>
      <li className='iconsBox__list'>
        <HomeSvg fill="white" />
        <Link to="/">Home</Link>
      </li>
    </ul>
  );
}

export default IconsBox;
