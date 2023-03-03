import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { BsArrowRight } from 'react-icons/bs';

import Header from '../components/dashboard/Header';
import FinanceSvg from '../components/icons/sidebar/financeSvg';
import EllipseSvg from '../components/icons/ellipseSvg';
import CancelSvg from '../components/icons/cancelSvg';
import CheckmarkSvg from '../components/icons/checkmarkSvg';
import AnalyticsSvg from '../components/icons/analyticsSvg';
import BoxTimeSvg from '../components/icons/boxTimeSvg';
import MoneysSvg from '../components/icons/moneysSvg';
import TeamsSvg from '../components/icons/teamsSvg';
import Orders from '../components/icons/sidebar/orders';
import { useReducer, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/app/hooks';
import { selectUser } from '../store/features/user/user';
import AnalyticsChart from '../components/charts/AnalyticsChart';
import {
  AllNofications,
  QuoteRequests,
  QuoteRequestsDetails,
} from './Nofications';

export type SwitchPath = 'all' | 'quoteRequests';
export type ShowDetails = {
  show: boolean;
  id?: number | null;
};

function DashboardHome() {
  interface DropDown {
    isContactDown?: boolean;
    isBusinessDown?: boolean;
    isPortAndTerminalDown?: boolean;
  }

  const [closeAccountSetup, setCloseAccountSetup] = useState('grid');
  const [currentPath, setCurrentPath] = useState<SwitchPath>('all');
  const [showDetails, setShowDetails] = useState<ShowDetails>({
    show: false,
    id: null,
  });
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
    validated,
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
          className="text-[1.4rem] font-semibold uppercase text-color-white bg-color-primary rounded-3xl h-[4.5rem] px-8 flex items-center justify-center"
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
                  {isBusinessInfoValid ? (
                    isBusinessInfoValid.error ? (
                      <span className="text-red-500">
                        {isBusinessInfoValid.message}
                      </span>
                    ) : (
                      <span className="text-green-500">
                        {isBusinessInfoValid.message}
                      </span>
                    )
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
                  {isPortsAndTerminalValid ? (
                    isPortsAndTerminalValid.error ? (
                      <span className="text-red-500">
                        {isPortsAndTerminalValid.message}
                      </span>
                    ) : (
                      <span className="text-green-500">
                        {isPortsAndTerminalValid.message}
                      </span>
                    )
                  ) : (
                    <span>Your port and terminal details required</span>
                  )}
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
                  {isPersonalInfoValid ? (
                    isPersonalInfoValid.error ? (
                      <span className="text-red-500">
                        {isPersonalInfoValid.message}
                      </span>
                    ) : (
                      <span className="text-green-500">
                        {isPersonalInfoValid.message}
                      </span>
                    )
                  ) : (
                    <span> Your personal Information required</span>
                  )}
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
        className="absolute right-4 top-[-3rem] cursor-pointer"
        onClick={() => setCloseAccountSetup('hidden')}
      />
      <img src="/icons/success.svg" alt="" className="w-[5rem] h-[5rem]" />

      <div>
        <p className="text-[2rem] font-medium">Verified!</p>
        <p>Your details have been verified and approved</p>
      </div>
    </div>
  );

  const transactions = (
    <section className="grid gap-4 self-baseline max-h-[28rem] overflow-y-scroll rounded-3xl p-8 border border-color-purple-light">
      <div className="flex justify-between">
        <h2 className="text-[1.6rem] font-medium"> Latest Transactions</h2>
        <Link to='/dashboard/payments'>See All</Link>
      </div>

      <div className="grid gap-8 mt-8">
        <div className="flex justify-between items-center border-b border-b-color-red-light-2">
          <p className="text-[1.4rem]">Adewale Joseph</p>
          <p>
            {' '}
            <span className="text-gray-500">NGN</span>{' '}
            <span className="text-color-purple-1">780,932</span>{' '}
          </p>
        </div>
        <div className="flex justify-between items-center border-b border-b-color-red-light-2">
          <p className="text-[1.4rem]">Stephen Murtala</p>
          <p>
            {' '}
            <span className="text-gray-500">NGN</span>{' '}
            <span className="text-color-purple-1">150,008</span>{' '}
          </p>
        </div>
        <div className="flex justify-between items-center border-b border-b-color-red-light-2">
          <p className="text-[1.4rem]">Osojo John</p>
          <p>
            {' '}
            <span className="text-gray-500">NGN</span>{' '}
            <span className="text-color-purple-1">250,802</span>{' '}
          </p>
        </div>
        <div className="flex justify-between items-center border-b border-b-color-red-light-2">
          <p className="text-[1.4rem]">Jerry Samson</p>
          <p>
            {' '}
            <span className="text-gray-500">NGN</span>{' '}
            <span className="text-color-purple-1">40,000</span>{' '}
          </p>
        </div>
        <div className="flex justify-between items-center border-b border-b-color-red-light-2">
          <p className="text-[1.4rem]">Eze Benjamin</p>
          <p>
            {' '}
            <span className="text-gray-500">NGN</span>{' '}
            <span className="text-color-purple-1">780,932</span>{' '}
          </p>
        </div>
        <div className="flex justify-between items-center border-b border-b-color-red-light-2">
          <p className="text-[1.4rem]">Adewale Joseph</p>
          <p>
            {' '}
            <span className="text-gray-500">NGN</span>{' '}
            <span className="text-color-purple-1">780,932</span>{' '}
          </p>
        </div>
        <div className="flex justify-between items-center border-b border-b-color-red-light-2">
          <p className="text-[1.4rem]">Adewale Joseph</p>
          <p>
            {' '}
            <span className="text-gray-500">NGN</span>{' '}
            <span className="text-color-purple-1">780,932</span>{' '}
          </p>
        </div>
        <div className="flex justify-between items-center border-b border-b-color-red-light-2">
          <p className="text-[1.4rem]">Adewale Joseph</p>
          <p>
            {' '}
            <span className="text-gray-500">NGN</span>{' '}
            <span className="text-color-purple-1">780,932</span>{' '}
          </p>
        </div>
        <div className="flex justify-between items-center border-b border-b-color-red-light-2">
          <p className="text-[1.4rem]">Adewale Joseph</p>
          <p>
            {' '}
            <span className="text-gray-500">NGN</span>{' '}
            <span className="text-color-purple-1">780,932</span>{' '}
          </p>
        </div>
      </div>
    </section>
  );

  const notifications = (
    <section className="grid grid-cols-2 gap-8 order-1">
      <div className=" bg-color-green-light-1 border border-color-primary p-8 rounded-3xl flex items-center gap-8 content-center">
        <div>
          <p className="text-[2rem]">Jonathan Elegushi</p>
          <p className="text-[1.4rem]"> & 2 more items in waiting</p>
        </div>

        <BsArrowRight className="text-[3rem]" />
      </div>
      <div
        className="bg-color-red-light-2 border border-color-red-light-3
       p-14 rounded-3xl relative"
      >
        <div className="absolute right-4 top-4 flex gap-4 items-center">
          <img src="/icons/send.svg" alt="" className="cursor-pointer" />
          <img src="/icons/copy.svg" alt="" className="cursor-pointer" />
        </div>
        <div>
          <p className="text-[2.4rem] text-color-purple">AB-3423</p>
          <p className="text-[1.4rem] max-w-[20rem]">
            Here's your Code. Share this with your customers.
          </p>
        </div>
      </div>
    </section>
  );

  const quoteRequest = (
    <section className="gap-8 order-1 grid p-8 border border-gray-300 rounded-3xl">
      <div className="flex justify-between border-b border-b-[#FDE9E9] pb-4">
        <h2 className="text-[1.6rem] font-medium text-gray-500">
          {' '}
          Quote Requests
        </h2>
        <p>All Requests</p>
      </div>

      <div className="grid gap-4 mt-10 max-h-[20rem] overflow-y-scroll">
        <div className="flex justify-between items-center border-b border-b-[#FDE9E9] pb-4">
          <div>
            <p className="text-[1.6rem] text-gray-600">Osojo John</p>
            <p className="text-[1.4rem] text-gray-400"> Jan 9, 2023 Just now</p>
          </div>

          <BsArrowRight className="text-[1.8rem]" />
        </div>
        <div className="flex justify-between items-center border-b border-b-[#FDE9E9] pb-4">
          <div>
            <p className="text-[1.6rem] text-gray-600">Kayode Isaac</p>
            <p className="text-[1.4rem] text-gray-400">
              {' '}
              Jan 9, 2023 5mins ago
            </p>
          </div>

          <BsArrowRight className="text-[1.8rem]" />
        </div>
        <div className="flex justify-between items-center border-b border-b-[#FDE9E9] pb-4">
          <div>
            <p className="text-[1.6rem] text-gray-600">Kayode Isaac</p>
            <p className="text-[1.4rem] text-gray-400">
              {' '}
              Jan 9, 2023 5mins ago
            </p>
          </div>

          <BsArrowRight className="text-[1.8rem]" />
        </div>
        <div className="flex justify-between items-center border-b border-b-[#FDE9E9] pb-4">
          <div>
            <p className="text-[1.6rem] text-gray-600">Kayode Isaac</p>
            <p className="text-[1.4rem] text-gray-400">
              {' '}
              Jan 9, 2023 5mins ago
            </p>
          </div>

          <BsArrowRight className="text-[1.8rem]" />
        </div>
        <div className="flex justify-between items-center border-b border-b-[#FDE9E9] pb-4">
          <div>
            <p className="text-[1.6rem] text-gray-600">Kayode Isaac</p>
            <p className="text-[1.4rem] text-gray-400">
              {' '}
              Jan 9, 2023 5mins ago
            </p>
          </div>

          <BsArrowRight className="text-[1.8rem]" />
        </div>
      </div>
    </section>
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

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleOpen = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const switchPath: Record<SwitchPath, JSX.Element> = {
    all: <AllNofications />,
    quoteRequests: <QuoteRequests setShowDetails={setShowDetails} />,
  };

  return (
    <>
      <Header
        title="Hello, Nachi"
        subTitle="Welcome to Swifth"
        openDialog={handleOpen}
      />
      <dialog className="dialog relative text-[1.6rem]" ref={dialogRef}>
        <div className="bg-white fixed right-0 h-[100vh] w-[50rem] py-4">
          <figure className="flex justify-end px-8">
            <img
              src="/icons/close.svg"
              alt=""
              className="w-[3rem] cursor-pointer"
              onClick={() => handleClose()}
            />
          </figure>
          {showDetails.show ? (
            <section className="px-10 h-full">
              <QuoteRequestsDetails
                showDetails={showDetails}
                setShowDetails={setShowDetails}
                setCurrentPath={setCurrentPath}
              />
            </section>
          ) : (
            <>
              <h3 className="text-[2rem] font-medium px-8  ">Notifications</h3>
              <div
                className="radioBox"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                }}
              >
                <input
                  type="radio"
                  name="notification"
                  id="all"
                  className="hidden"
                  onChange={() => setCurrentPath('all')}
                  checked={currentPath === 'all'}
                />
                <label htmlFor="all">All</label>

                <input
                  type="radio"
                  name="notification"
                  id="quoteRequests"
                  className="hidden"
                  checked={currentPath === 'quoteRequests'}
                  onChange={() => setCurrentPath('quoteRequests')}
                />
                <label htmlFor="quoteRequests" className="capitalize">
                  Quote Requests
                </label>
              </div>
              <section className="px-10 mt-10">
                {switchPath[currentPath]}
              </section>{' '}
            </>
          )}
        </div>
      </dialog>
      <div
        className="grid gap-4 max-w-[120rem] mx-auto text-[1.6rem]"
        style={{
          gridTemplateColumns: validated ? '1fr 1.2fr' : '1.2fr 1fr',
        }}
      >
        <div className={`grid gap-4 ${validated ? 'order-2' : ''}`}>
          <section
            className={`grid gap-4 ${
              validated ? 'order-2' : ''
            } ${closeAccountSetup}`}
          >
            <div
              className={`rounded-3xl p-8 border border-color-purple-light ${
                validating === 'idle' && 'grid gap-8'
              }`}
            >
              <h2 className="heading3">Account Setup</h2>
              {currentValidation[validating]}
            </div>
          </section>
          {/* {validating === 'succeeded' && (
            <section className="grid gap-4 order-3">
              <div className="rounded-3xl p-8 border border-color-purple-light grid gap-8">
                <h2 className="heading3">Checklist</h2>

                {checklist}
              </div>
            </section>
          )} */}
          <section
            className={`grid gap-4 text-[1.4rem] ${validated ? 'order-1' : ''}`}
          >
            <div className="rounded-3xl p-8 border border-color-purple-light grid gap-8">
              <div>
                {validated ? (
                  <>
                    <div className="flex justify-between  mb-10">
                      <h2 className="heading3">Business Analytics</h2>
                      <Link className="text-[1.6rem] cursor-pointer" to='/dashboard/analytics'>
                        See Full Stats
                      </Link>
                    </div>
                    <AnalyticsChart />
                  </>
                ) : (
                  <>
                    <h2 className="heading3">Business Analytics</h2>

                    <div className="grid justify-items-center content-center gap-8">
                      <AnalyticsSvg />
                      <p className="text">
                        Your business analytics would be shown here
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
          {validated && (
            <>
              {notifications}
              {quoteRequest}
            </>
          )}

          <section
            className={`grid gap-4 self-baseline order-4 ${
              validated && 'bg-gray-100'
            }`}
          >
            <div className="rounded-3xl p-8 border border-color-purple-light grid gap-8">
              {validated ? (
                <>
                  <div className="flex justify-between">
                    <h2 className="text-[1.6rem] font-medium text-gray-500">
                      {' '}
                      Orders
                    </h2>

                    <Link to='/dashboard/orders'>See All</Link>
                  </div>
                  <div className="max-w-[60rem] overflow-x-scroll flex gap-8">
                    <div className="p-8 w-[22rem] bg-white rounded-3xl">
                      <div>
                        <p className="text-[1.6rem]">Jonathan Sunyi</p>
                        <p className="text-[1.4rem] whitespace-nowrap text-ellipsis overflow-hidden text-gray-500">
                          Toyota Camry XLE, 2018 v6 with alloy wheels and
                        </p>
                      </div>

                      <p className="text-[1.2rem] flex justify-end pt-8">
                        <span className="bg-color-orange py-1 px-2 rounded-lg">
                          Docs in review
                        </span>
                      </p>
                    </div>
                    <div className="p-8 w-[22rem] bg-white rounded-3xl">
                      <div>
                        <p className="text-[1.6rem]">Jonathan Sunyi</p>
                        <p className="text-[1.4rem] whitespace-nowrap text-ellipsis overflow-hidden text-gray-500">
                          Toyota Camry XLE, 2018 v6 with alloy wheels and
                        </p>
                      </div>

                      <p className="text-[1.2rem] flex justify-end pt-8">
                        <span className="bg-color-purple-light-2 py-1 px-2 rounded-lg">
                          Duty Processing
                        </span>
                      </p>
                    </div>
                    <div className="p-8 w-[22rem] bg-white rounded-3xl">
                      <div>
                        <p className="text-[1.6rem]">Jonathan Sunyi</p>
                        <p className="text-[1.4rem] whitespace-nowrap text-ellipsis overflow-hidden text-gray-500">
                          Toyota Camry XLE, 2018 v6 with alloy wheels and
                        </p>
                      </div>

                      <p className="text-[1.2rem] flex justify-end pt-8">
                        <span className="bg-color-purple-light-2 py-1 px-2 rounded-lg">
                          Duty Processing
                        </span>
                      </p>
                    </div>
                    <div className="p-8 w-[22rem] bg-white rounded-3xl">
                      <div>
                        <p className="text-[1.6rem]">Jonathan Sunyi</p>
                        <p className="text-[1.4rem] whitespace-nowrap text-ellipsis overflow-hidden text-gray-500">
                          Toyota Camry XLE, 2018 v6 with alloy wheels and
                        </p>
                      </div>

                      <p className="text-[1.2rem] flex justify-end pt-8">
                        <span className="bg-color-orange py-1 px-2 rounded-lg">
                          Docs in review
                        </span>
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="heading3">Orders</h2>

                  <div className="grid justify-items-center content-center  gap-8">
                    <Orders fill="" />
                    <p className="text">Your orders would be shown here</p>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
        <div className="grid gap-4 content-baseline">
          <section className="grid gap-4 self-baseline">
            <div className="p-8 border border-color-red-light rounded-3xl flex gap-12 home-box1">
              <FinanceSvg fill={'#957979'} />

              <div className="grid justify-items-start content-center gap-4">
                <h2 className="heading3">Total Earnings</h2>
                <p className="heading2">
                  NGN <span>{validated ? 32.35 : 0.0}</span>
                </p>
              </div>
            </div>
            <div className="home-box2 p-8 grid gap-4 rounded-3xl border border-color-purple-light">
              <div className="flex gap-12">
                <BoxTimeSvg />
                <div className="grid justify-items-baseline content-center gap-4 ">
                  <h2 className="heading3 text-color-purple">
                    Pending Clearance
                  </h2>
                  <p className="heading2">
                    {validated ? 5 : 0} <span>Items</span>
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
          {transactions}
          <section className=" self-baseline rounded-3xl p-8 border border-color-purple-light grid gap-8">
            {validated ? (
              <>
                <div className="flex justify-between">
                  <h2 className="text-[1.6rem] font-medium text-gray-500">
                    {' '}
                    Teams
                  </h2>

                <Link to="/dashboard/team">

                  <img src="/icons/arrow-right.svg" alt="" />
                </Link>
                </div>

                <div className="grid gap-8 mt-8 max-h-[20rem] overflow-y-scroll">
                  <div className="flex justify-between items-center border-b border-b-color-red-light-2 text-[1.4rem] pb-8  ">
                    <p>Michael Knight</p>
                    <p className="text-gray-500 font-medium">Admin</p>
                  </div>
                  <div className="flex justify-between items-center border-b border-b-color-red-light-2 text-[1.4rem] pb-8">
                    <p>Rick Wright</p>
                    <p className="font-medium text-red-700">Revoke Invite</p>
                  </div>
                  <div className="flex justify-between items-center border-b border-b-color-red-light-2 text-[1.4rem] pb-8">
                    <p>B.A Baracus</p>
                    <p className="text-gray-500 font-medium">Field Agent</p>
                  </div>
                  <div className="flex justify-between items-center border-b border-b-color-red-light-2 text-[1.4rem] pb-8">
                    <p>B.A Baracus</p>
                    <p className="text-gray-500 font-medium">Field Agent</p>
                  </div>
                  <div className="flex justify-between items-center border-b border-b-color-red-light-2 text-[1.4rem] pb-8">
                    <p>B.A Baracus</p>
                    <p className="text-gray-500 font-medium">Field Agent</p>
                  </div>
                  <div className="flex justify-between items-center border-b border-b-color-red-light-2 text-[1.4rem] pb-8">
                    <p>B.A Baracus</p>
                    <p className="text-gray-500 font-medium">Field Agent</p>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <h2 className="heading3"> Teams</h2>

                <div className="grid justify-items-center content-center  gap-8">
                  <TeamsSvg />
                  <p className="text">Your teams would be shown here</p>
                </div>
              </div>
            )}
          </section>

          <section className="grid gap-4 self-baseline">
            <div className="rounded-3xl p-8 border border-color-purple-light grid gap-8">
              {validated ? (
                <>
                  <div className="flex justify-between  mb-10">
                    <h2 className="heading3"> Payout Bank</h2>{' '}
                    <Link to="/dashboard/payments">
                    <img src="/icons/arrow-right.svg" alt="" />
                    </Link>
                  </div>
                  <div className="flex items-center gap-8">
                    <img src="/icons/payoutBank.svg" alt="" />
                    <div className=" text-gray-500">
                      <p className="text-[1.6rem] font-medium">GTCO</p>
                      <p className="text-[1.4rem]">Ore Adesanye</p>
                      <p className="text-[1.4rem]">0132234423</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="heading3"> Payout Bank</h2>

                  <div className="grid justify-items-center content-center  gap-8">
                    <Orders fill="" />
                    <p className="text">
                      Your bank details would be shown here
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default DashboardHome;
