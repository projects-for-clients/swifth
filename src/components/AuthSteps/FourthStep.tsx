import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/features/user/user';

function ThirdAuthStep() {

  const [password, setPassword] = useState('')

 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   
  };

  return (
    <div className="grid gap-10 mt-16 justify-center pb-5">
      <h2 className="heading2 text-center">We just sent your an email</h2>

      <form className="grid w-full form" onSubmit={handleSubmit}>
        {' '}
        <div className="form__input">
          <label className="input__label">First Name</label>
          <input
            type="text"
            placeholder="Enter first name"
            className="input__item"
            name="firstName"
            defaultValue={inputField.firstName}
          />
        </div>
        <button
          className="bg-[#40AD6B] text-[1.6rem] py-6 disabled:opacity-50 btn1"
          type="submit"
          disabled={isOtpLengthInValid}
        >
          {loading ? 'Loading...' : 'Continue'}
        </button>
      </form>
      <p className="authText mt-10">
        Didn't get a code? <button> Resend code</button>
      </p>
    </div>
  );
}

export default ThirdAuthStep;
