import React, { Fragment, useContext } from 'react';
import { AuthContext } from '../../container/Auth';



const FirstStep = () => {
  const AuthContextData = useContext(AuthContext)
  
  const {setStep} = AuthContextData

  return (
    <div className="firstStep">
      <h1 className="heading1">Join Swifth</h1>
      <Fragment>
        <section className="container__box">
          <button className="box__btn" onClick={() => setStep(1)}>
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

        <p className='authText'>
          I have an account? <button> Log In</button>
        </p>
      </Fragment>
      <p className='authFooter'>
        By signing you confirm to have read Swifth's{' '}
        <a href="/"> Privacy policy</a> and agree to the{' '}
        <a href="/">Terms of service</a>
      </p>
    </div>
  );
};

export default FirstStep;
