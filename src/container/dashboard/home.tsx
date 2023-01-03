import Header from '../../components/dashboard/Header';

import FinanceSvg from '../../components/icons/sidebar/financeSvg';

function home() {
  return (
    <>
      <Header title="Hello, Nachi" subTitle="Welcome to Swifth" />

      <div className="dashboard__home">
        <section className="home__left">
          <div className="home__left-1">
            <h2 className="heading3">Account Setup</h2>
            <p>
              It’s time to set up your account. We will need a few things to get
              you going
            </p>
            <div>
              <div>box 1</div>
              <div>box 2</div>
            </div>
            <div>
              <div>
                <input type="radio" name="businessInfo" id="businessInfo" />
                <label htmlFor="businessInfo">Your business information</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="portAndTerminal"
                  id="portAndTerminal"
                />
                <label htmlFor="portAndTerminal">Port and terminal Info</label>
              </div>
              <div>
                <input type="radio" name="contactInfo" id="contactInfo" />
                <label htmlFor="contactInfo">Contact information</label>
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
