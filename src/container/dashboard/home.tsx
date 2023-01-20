import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import Header from '../../components/dashboard/Header';
import FinanceSvg from '../../components/icons/sidebar/financeSvg';
import EllipseSvg from '../../components/icons/ellipseSvg';
import CancelSvg from '../../components/icons/cancelSvg';
import CheckmarkSvg from '../../components/icons/checkmarkSvg';
import AnalyticsSvg from '../../components/icons/analyticsSvg';
import BoxTimeSvg from '../../components/icons/boxTimeSvg';
import MoneysSvg from '../../components/icons/moneysSvg';
import TeamsSvg from '../../components/icons/teamsSvg';
import Orders from '../../components/icons/sidebar/orders';
import PayoutBankSvg from '../../components/icons/sidebar/payoutBankSvg';
import { useState } from 'react';

function home() {
  const [isDropDown, setIsDropDown] = useState(false);

  const handleDropDown = () => setIsDropDown(!isDropDown);

  return (
    <>
      <Header title="Hello, Nachi" subTitle="Welcome to Swifth" />

      <div className="dashboard__home">
        <section className="grid auto-cols-auto">
          <div className="rounded-lg p-4 border border-color-purple-light grid">
            <h2 className="heading3">Account Setup</h2>
            <p className="text">
              It's time to set up your account. We will need a few things to get
              you going
            </p>
            <div className="grid grid-cols-60-auto gap-4">
              <div className="bg-color-purple-light-1 px-8 rounded-lg flex items-center gap-4 text-color-tertary h-[4.5rem]">
                <p>0%</p> <p>Completed</p>
              </div>
              <button className="text-[1.4rem] font-semibold uppercase text-color-white bg-color-primary rounded-lg h-[4.5rem] ">
                Get Started
              </button>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <EllipseSvg />
                <div className="flex items-center w-full justify-between cursor-pointer ">
                  <p className="text">Your business information</p>
                  <FiChevronDown className="w-[1.6rem] h-[1.6rem]" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* <CheckmarkSvg /> */}
                <EllipseSvg />

                <div className="flex items-center w-full justify-between cursor-pointer ">
                  {' '}
                  <p className="text">Port and terminal Info</p>
                  <FiChevronDown className="w-[1.6rem] h-[1.6rem]" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* <CancelSvg /> */}
                <EllipseSvg />

                <div
                  className="flex items-center w-full justify-between cursor-pointer "
                  onClick={handleDropDown}
                >
                  {' '}
                  <div>
                    <p className="text">Contact information</p>
                    {isDropDown && <p className='text-[1.4rem] font-light'>Details of your business required</p>}
                  </div>
                  {isDropDown ? (
                    <FiChevronUp className="w-[1.6rem] h-[1.6rem]" />
                  ) : (
                    <FiChevronDown className="w-[1.6rem] h-[1.6rem]" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="grid gap-4 self-baseline">
          <div className="p-8 border border-color-purple-light rounded-lg flex gap-12 home-box1">
            <FinanceSvg fill={'#957979'} />

            <div className="grid justify-items-center content-center gap-4 auto-rows-auto">
              <h2 className="heading3">Total Earnings</h2>
              <p className="heading2">
                NGN <span>0.0</span>
              </p>
            </div>
          </div>
          <div className="home-box2 p-8 grid gap-4 rounded-lg border border-color-purple-light">
            <div className="flex gap-12">
              <BoxTimeSvg />
              <div className="grid justify-items-baseline content-center gap-4 auto-rows-auto">
                <h2 className="heading3 text-color-purple">
                  Pending Clearance
                </h2>
                <p className="heading2">
                  0 <span>Items</span>
                </p>
              </div>
            </div>
            <hr className="border-[#7D67BD]" />
            <div className="flex gap-12">
              <MoneysSvg />
              <div className="grid justify-items-baseline content-center gap-4 auto-rows-auto">
                <h2 className="heading3">Total Earnings</h2>
                <p className="heading2">
                  NGN <span>0.0</span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="grid auto-cols-auto gap-4">
          <div className="rounded-lg p-4 border border-color-purple-light grid gap-8">
            <div>
              <h2 className="heading3">Business Analytics</h2>

              <div className="grid justify-items-center content-center gap-8">
                <AnalyticsSvg />
                <p className="text">
                  Your business analytics would be shown here
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 self-baseline">
          <div className="rounded-lg p-4 border border-color-purple-light grid gap-8">
            <div>
              <h2 className="heading3"> Teams</h2>

              <div className="grid justify-items-center content-center auto-cols-auto gap-8">
                <TeamsSvg />
                <p className="text">Your teams would be shown here</p>
              </div>
            </div>
          </div>
        </section>
        <section className="grid gap-4 self-baseline">
          <div className="rounded-lg p-4 border border-color-purple-light grid gap-8">
            <div>
              <h2 className="heading3"> Orders</h2>

              <div className="grid justify-items-center content-center auto-cols-auto gap-8">
                <Orders fill="" />
                <p className="text">Your orders would be shown here</p>
              </div>
            </div>
          </div>
        </section>
        <section className="grid gap-4 self-baseline">
          <div className="rounded-lg p-4 border border-color-purple-light grid gap-8">
            <div>
              <h2 className="heading3"> Payout Bank</h2>

              <div className="grid justify-items-center content-center auto-cols-auto gap-8">
                <Orders fill="" />
                <p className="text">Your bank details would be shown here</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default home;
