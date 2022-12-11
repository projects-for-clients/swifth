import React, { useRef } from 'react';

interface ISocialButtons {
  children: React.ReactNode;
}

const SocialButtons: React.FC<{}> = () => {
  return (
    <div className="socialButtons">
      <h1>Join Swifth</h1>
      <div className="socialButtons__container">
        <section className="socialButtons__box">
          <button>Continue with Email</button>
          <button>Continue with Google</button>
          <button>Continue with Facebook</button>
        </section>

        <p>
          I have an account, <button> Log In</button>
        </p>
      </div>
      <p>
        By signing you confirm to have read Swifth's{' '}
        <a href="/"> Privacy policy</a> and agree to the{' '}
        <a href="/">Terms of service</a>
      </p>
    </div>
  );
};

export default SocialButtons;
