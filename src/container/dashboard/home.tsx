import { FiChevronDown } from 'react-icons/fi';

import Header from '../../components/dashboard/Header';
import FinanceSvg from '../../components/icons/sidebar/financeSvg';
import EllipseSvg from '../../components/icons/ellipseSvg';
import CancelSvg from '../../components/icons/cancelSvg';
import CheckmarkSvg from '../../components/icons/checkmarkSvg';
import AnalyticsSvg from '../../components/icons/analyticsSvg';
import BoxTimeSvg from '../../components/icons/boxTimeSvg';
import MoneysSvg from '../../components/icons/moneysSvg';

function home() {
  return (
    <>
      <Header title="Hello, Nachi" subTitle="Welcome to Swifth" />

      <div className="dashboard__home">
        <section className="home__left">
          <div className="home__left-item">
            <h2 className="heading3">Account Setup</h2>
            <p className="text">
              It's time to set up your account. We will need a few things to get
              you going
            </p>
            <div className="left-item__box">
              <div className="left-item__progress">
                <p>0%</p> <p>Completed</p>
              </div>
              <button className="left-item__btn">Get Started</button>
            </div>
            <div className="left-item__steps">
              <div className="left-item__step">
                <EllipseSvg />
                <div className="left-item__step--label">
                  <p className="text">Your business information</p>
                  <FiChevronDown />
                </div>
              </div>
              <div className="left-item__step">
                <CheckmarkSvg />
                <div className="left-item__step--label">
                  {' '}
                  <p className="text">Port and terminal Info</p>
                  <FiChevronDown />
                </div>
              </div>
              <div className="left-item__step">
                <CancelSvg />
                <div className="left-item__step--label">
                  {' '}
                  <p className="text">Contact information</p>
                  <FiChevronDown />
                </div>
              </div>
            </div>
          </div>
          <div className="home__left-item">
            <div>
              <h2 className="heading3">Business analysis</h2>

              <div className="left-item__content">
                <AnalyticsSvg />
                <p className="text">
                  Your business analytics would be shown here
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="home__right">
          <div className="home__right-item--1">
            <FinanceSvg fill={'#957979'} />
            <div className="right-item__content">
              <h2 className="heading3">Total Earnings</h2>
              <p className="heading2">
                NGN <span>0.0</span>
              </p>
            </div>
          </div>
          <div className="home__right-item--2">
            <div className="flex gap-12">
              <BoxTimeSvg />
              <div className="right-item__content">
                <h2 className="heading3">Pending Clearance</h2>
                <p className="heading2">
                  0 <span>Items</span>
                </p>
              </div>
            </div>
            <hr className="text-[#7D67BD]" />
            <div className="flex gap-12">
              <MoneysSvg />
              <div className="right-item__content">
                <h2 className="heading3">Total Earnings</h2>
                <p className="heading2">
                  NGN <span>0.0</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default home;
