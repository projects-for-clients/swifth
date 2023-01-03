import { FiChevronDown } from 'react-icons/fi';

import Header from '../../components/dashboard/Header';
import FinanceSvg from '../../components/icons/sidebar/financeSvg';
import EllipseSvg from '../../components/icons/ellipseSvg';
import CancelSvg from '../../components/icons/cancelSvg';
import CheckmarkSvg from '../../components/icons/checkmarkSvg';

function home() {
  return (
    <>
      <Header title="Hello, Nachi" subTitle="Welcome to Swifth" />

      <div className="dashboard__home">
        <section className="home__left">
          <div className="home__left-1">
            <h2 className="heading3">Account Setup</h2>
            <p className="text">
              It's time to set up your account. We will need a few things to get
              you going
            </p>
            <div className="left-1__box">
              <div className="left-1__progress">
                <p>0%</p> <p>Completed</p>
              </div>
              <button className="left-1__btn">Get Started</button>
            </div>
            <div className="left-1__steps">
              <div className="left-1__step">
                <EllipseSvg/>
                <label htmlFor="businessInfo">
                  <p className="text">Your business information</p>
                  <FiChevronDown />
                </label>
              </div>
              <div className="left-1__step">
                <input
                  type="radio"
                  name="portAndTerminal"
                  id="portAndTerminal"
                />
                <label htmlFor="portAndTerminal">
                  <p className="text">Port and terminal Info</p>
                  <FiChevronDown />
                </label>
              </div>
              <div className="left-1__step">
                <input type="radio" name="contactInfo" id="contactInfo" />
                <label htmlFor="contactInfo">
                  <p className="text">Contact information</p>
                  <FiChevronDown />
                </label>
              </div>
            </div>
          </div>
        </section>
        <section className="home__right">
          <div className="home__right-1">
            <FinanceSvg fill={'#957979'} />
            <div className="right-1__content">
              <h2 className="heading3">Total Earnings</h2>
              <p className="heading2">NGN 0.0</p>
            </div>
          </div>
          <div>left two</div>
        </section>
      </div>
    </>
  );
}

export default home;
