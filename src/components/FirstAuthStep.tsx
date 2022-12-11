const FirstAuthStep = () => {

    return (
      <div className="grid gap-3 mt-16 justify-center h-full">
        <h1 className="heading1">Join Swifth</h1>
        <p>Enter your required details to get started</p>
          <form className="form">
          
          <div className="form__input">

          <label className="input__label">First Name</label>
          <input type="text" placeholder="Enter first name" className="input__item"/>
          </div>
          <div className="form__input">

          <label className="input__label">Last Name</label>
          <input type="text" placeholder="Enter last name" className="input__item"/>
          </div>
          <div className="form__input">

          <label className="input__label">Email</label>
          <input type="text" placeholder="Enter email address" className="input__item"/>
          </div>
          </form>

          <p className="container__text">
            I have an account?{' '}
            <button className="container__btn"> Log In</button>
          </p>
        
      </div>
    );
}

export default FirstAuthStep