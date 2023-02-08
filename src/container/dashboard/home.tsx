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
import { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/features/user/user';

function home() {
  interface DropDown {
    isContactDown?: boolean;
    isBusinessDown?: boolean;
    isPortAndTerminalDown?: boolean;
  }

  const [isDropDown, setIsDropDown] = useReducer(
    (prev: DropDown, next: DropDown): DropDown => {
      return {
        ...prev,
        ...next,
      };
    },
    {
      isContactDown: false,
      isBusinessDown: false,
      isPortAndTerminalDown: false,
    }
  );

  const handleContactDown = () => {
    setIsDropDown({ isContactDown: !isDropDown.isContactDown });
  };

  const handleBusinessDrop = () => {
    setIsDropDown({ isBusinessDown: !isDropDown.isBusinessDown });
  };

  const handlePAndTDrop = () => {
    setIsDropDown({ isPortAndTerminalDown: !isDropDown.isPortAndTerminalDown });
  };

  const user = useAppSelector(selectUser);
  const {
    onboarding: { validating, validatingArr },
  } = user;

  const isBusinessInfoValid = validatingArr.find(
    (item) => item.path === 'businessInfo'
  );
  const isPortsAndTerminalValid = validatingArr.find(
    (item) => item.path === 'portsAndTerminal'
  );
  const isPersonalInfoValid = validatingArr.find(
    (item) => item.path === 'personalInfo'
  );

  const progressLevel = (): number => {
    const everyValidatedInfo = validatingArr.filter((item) => !item.error);
    console.log(everyValidatedInfo);
    return everyValidatedInfo.length * 33.4;
  };

  const firstStep = (
    <>
      <p className="text">
        It's time to set up your account. We will need a few things to get you
        going
      </p>

      <div className="grid grid-cols-60-auto gap-4 items-center -pt-8">
        <div className="progressBar">
          <progress
            className="progressBar__item"
            max={100}
            value={progressLevel()}
          ></progress>
          <p className="absolute left-4 text-color-tertiary ">
            <span>0%</span> <span>Completed</span>
          </p>
        </div>

        <Link
          className="text-[1.4rem] font-semibold uppercase text-color-white bg-color-primary rounded-lg h-[4.5rem] px-8 flex items-center justify-center"
          to="/dashboard/onboarding"
        >
          Get Started
        </Link>
      </div>
      <div className="grid gap-4">
        <div className="flex items-center gap-4">
          {isBusinessInfoValid ? (
            isBusinessInfoValid.error ? (
              <CancelSvg />
            ) : (
              <CheckmarkSvg />
            )
          ) : (
            <EllipseSvg />
          )}
          <div
            className="flex items-center w-full justify-between cursor-pointer "
            onClick={handleBusinessDrop}
          >
            <div>
              <p className="text font-medium">Your business information</p>
              {isDropDown.isBusinessDown && (
                <p className="text-[1.4rem] font-light">
                  {isBusinessInfoValid && isBusinessInfoValid.message ? (
                    isBusinessInfoValid.message
                  ) : (
                    <span>Details of your business required</span>
                  )}
                </p>
              )}
            </div>
            {isDropDown.isBusinessDown ? (
              <FiChevronUp className="w-[1.6rem] h-[1.6rem]" />
            ) : (
              <FiChevronDown className="w-[1.6rem] h-[1.6rem]" />
            )}{' '}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isPortsAndTerminalValid ? (
            isPortsAndTerminalValid.error ? (
              <CancelSvg />
            ) : (
              <CheckmarkSvg />
            )
          ) : (
            <EllipseSvg />
          )}

          <div
            className="flex items-center w-full justify-between cursor-pointer "
            onClick={handlePAndTDrop}
          >
            <div>
              <p className="text font-medium">Port and terminal Info</p>

              {isDropDown.isPortAndTerminalDown && (
                <p className="text-[1.4rem] font-light">
                  Your port and terminal details required
                </p>
              )}
            </div>
            {isDropDown.isPortAndTerminalDown ? (
              <FiChevronUp className="w-[1.6rem] h-[1.6rem]" />
            ) : (
              <FiChevronDown className="w-[1.6rem] h-[1.6rem]" />
            )}{' '}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isPersonalInfoValid ? (
            isPersonalInfoValid.error ? (
              <CancelSvg />
            ) : (
              <CheckmarkSvg />
            )
          ) : (
            <EllipseSvg />
          )}

          <div
            className="flex items-center w-full justify-between cursor-pointer "
            onClick={handleContactDown}
          >
            {' '}
            <div>
              <p className="text font-medium">Contact information</p>
              {isDropDown.isContactDown && (
                <p className="text-[1.4rem] font-light">
                  Your personal Information required
                </p>
              )}
            </div>
            {isDropDown.isContactDown ? (
              <FiChevronUp className="w-[1.6rem] h-[1.6rem]" />
            ) : (
              <FiChevronDown className="w-[1.6rem] h-[1.6rem]" />
            )}
          </div>
        </div>
      </div>
    </>
  );

  const secondStep = (
    <div className="flex items-center gap-8 pt-12">
      <img src="/icons/loader.svg" alt="" className="w-[5rem] h-[5rem]" />

      <div>
        <p className="text-[2rem] font-medium">Documents Submitted</p>
        <p>
          Your details has been received and will undergo verification and
          approval. You will be notified once it is approved
        </p>
      </div>
    </div>
  );
  const thirdStep = (
    <div className="flex items-center gap-8 pt-12 relative">
      <img
        src="/icons/close.svg"
        alt=""
        className="absolute right-4 top-0 cursor-pointer"
      />
      <img src="/icons/success.svg" alt="" className="w-[5rem] h-[5rem]" />

      <div>
        <p className="text-[2rem] font-medium">Verified!</p>
        <p>Your details have been verified and approved</p>
      </div>
    </div>
  );

  const currentValidation: Record<typeof validating, JSX.Element> = {
    idle: firstStep,
    pending: secondStep,
    succeeded: thirdStep,
  };

  const checklist = (
    <>
      <p className="text">A few things to get you going</p>

      <div className="grid gap-4">
        <div className="flex items-center gap-4">
          <EllipseSvg />
          <div
            className="flex items-center w-full justify-between cursor-pointer "
            onClick={handleBusinessDrop}
          >
            <div>
              <p className="text font-medium">Create roles</p>
              {isDropDown.isBusinessDown && (
                <p className="text-[1.4rem] font-light">roles</p>
              )}
            </div>
            {isDropDown.isBusinessDown ? (
              <FiChevronUp className="w-[1.6rem] h-[1.6rem]" />
            ) : (
              <FiChevronDown className="w-[1.6rem] h-[1.6rem]" />
            )}{' '}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* <CheckmarkSvg /> */}
          <EllipseSvg />

          <div
            className="flex items-center w-full justify-between cursor-pointer "
            onClick={handlePAndTDrop}
          >
            <div>
              <p className="text font-medium">Invite and assign field agents</p>

              {isDropDown.isPortAndTerminalDown && (
                <p className="text-[1.4rem] font-light">assign field agents</p>
              )}
            </div>
            {isDropDown.isPortAndTerminalDown ? (
              <FiChevronUp className="w-[1.6rem] h-[1.6rem]" />
            ) : (
              <FiChevronDown className="w-[1.6rem] h-[1.6rem]" />
            )}{' '}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* <CancelSvg /> */}
          <EllipseSvg />

          <div
            className="flex items-center w-full justify-between cursor-pointer "
            onClick={handleContactDown}
          >
            {' '}
            <div>
              <p className="text font-medium">Set Formulas</p>
              {isDropDown.isContactDown && (
                <p className="text-[1.4rem] font-light">formulas</p>
              )}
            </div>
            {isDropDown.isContactDown ? (
              <FiChevronUp className="w-[1.6rem] h-[1.6rem]" />
            ) : (
              <FiChevronDown className="w-[1.6rem] h-[1.6rem]" />
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Header title="Hello, Nachi" subTitle="Welcome to Swifth" />

      <div className="dashboard__home">
        <div className="grid gap-4">
          <section className="grid gap-4">
            <div
              className={`rounded-lg p-8 border border-color-purple-light ${
                validating === 'idle' && 'grid gap-8'
              }`}
            >
              <h2 className="heading3">Account Setup</h2>
              {currentValidation[validating]}
            </div>
          </section>
          {validating === 'succeeded' && (
            <section className="grid gap-4 ">
              <div className="rounded-lg p-8 border border-color-purple-light grid gap-8">
                <h2 className="heading3">Checklist</h2>

                {checklist}
              </div>
            </section>
          )}
          <section className="grid  gap-4">
            <div className="rounded-lg p-8 border border-color-purple-light grid gap-8">
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
            <div className="rounded-lg p-8 border border-color-purple-light grid gap-8">
              <div>
                <h2 className="heading3"> Orders</h2>

                <div className="grid justify-items-center content-center  gap-8">
                  <Orders fill="" />
                  <p className="text">Your orders would be shown here</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="grid gap-4 content-baseline">
          <section className="grid gap-4 self-baseline auto-rows-auto">
            <div className="p-8 border border-color-red-light rounded-lg flex gap-12 home-box1">
              <FinanceSvg fill={'#957979'} />

              <div className="grid justify-items-center content-center gap-4 ">
                <h2 className="heading3">Total Earnings</h2>
                <p className="heading2">
                  NGN <span>0.0</span>
                </p>
              </div>
            </div>
            <div className="home-box2 p-8 grid gap-4 rounded-lg border border-color-purple-light">
              <div className="flex gap-12">
                <BoxTimeSvg />
                <div className="grid justify-items-baseline content-center gap-4 ">
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
                <div className="grid justify-items-baseline content-center gap-4 ">
                  <h2 className="heading3">Total Earnings</h2>
                  <p className="heading2">
                    NGN <span>0.0</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 self-baseline">
            <div className="rounded-lg p-8 border border-color-purple-light grid gap-8">
              <div>
                <h2 className="heading3"> Teams</h2>

                <div className="grid justify-items-center content-center  gap-8">
                  <TeamsSvg />
                  <p className="text">Your teams would be shown here</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 self-baseline">
            <div className="rounded-lg p-8 border border-color-purple-light grid gap-8">
              <div>
                <h2 className="heading3"> Payout Bank</h2>

                <div className="grid justify-items-center content-center  gap-8">
                  <Orders fill="" />
                  <p className="text">Your bank details would be shown here</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default home;
