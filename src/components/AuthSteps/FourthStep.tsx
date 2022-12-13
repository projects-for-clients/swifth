import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/features/user/user';

function ThirdAuthStep() {

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   
  };

  return (
    <div className="grid gap-10 mt-16 justify-center pb-5">
      <h2 className="heading2 text-center">Create your password</h2>

      <form className="grid w-full form" onSubmit={handleSubmit}>
        {' '}
        <div className="form__input">
          <label className="input__label">Create Password</label>
          <input
            type="text"
            placeholder="create a password..."
            className="input__item"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className='input__label'>Choose a password you will always remember</p>
        </div>
        <button
          className="bg-[#40AD6B] text-[1.6rem] py-6 disabled:opacity-50 btn1"
          type="submit"
          disabled={password.length < 6}
        >
          {loading ? 'Loading...' : 'Continue'}
        </button>
      </form>
     
    </div>
  );
}

export default ThirdAuthStep;
