import React, { Fragment, useRef } from 'react';

interface ISocialButtons {
  children: React.ReactNode;
}

const SocialButtons: React.FC<{}> = () => {
  return (
    <div className="socialButtons">
      <h1 className="socialButtons__header">Join Swifth</h1>
      <Fragment>
        <section className="container__box">
          <button className="box__btn">
            <img src="/icons/email.svg" alt="emailIcon" />
            Continue with Email
          </button>
          <button className="box__btn">
            <img src="/icons/google.svg" alt="googleIcon" />
            Continue with Google
          </button>
          <button className="box__btn">
            <img src="/icons/facebook.svg" alt="facebookIcon" />
            Continue with Facebook
          </button>
        </section>

        <p className='container__text'>
          I have an account? <button className='container__btn'> Log In</button>
        </p>
      </Fragment>
      <p>
        By signing you confirm to have read Swifth's{' '}
        <a href="/"> Privacy policy</a> and agree to the{' '}
        <a href="/">Terms of service</a>
      </p>
    </div>
  );
};

export default SocialButtons;
