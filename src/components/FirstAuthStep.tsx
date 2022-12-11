const FirstAuthStep = () => {

    return (
      <div className="socialButtons">
        <h1 className="heading1">Join Swifth</h1>
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

          <p className="container__text">
            I have an account?{' '}
            <button className="container__btn"> Log In</button>
          </p>
        
      </div>
    );
}

export default FirstAuthStep