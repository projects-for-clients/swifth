import Header from '../../components/dashboard/Header';

function home() {
  return (
    <>
      <Header title="Hello, Nachi" subTitle="Welcome to Swifth" />

      <div className='dashboard__home'>
        <h3>Account Setup</h3>
        <p>
          It’s time to set up your account. We will need a few things to get you
          going
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
            <input type="radio" name="portAndTerminal" id="portAndTerminal" />
            <label htmlFor="portAndTerminal">Port and terminal Info</label>
          </div>
          <div>
            <input type="radio" name="contactInfo" id="contactInfo" />
            <label htmlFor="contactInfo">Contact information</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default home;
