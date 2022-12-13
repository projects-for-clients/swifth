import React, { useState } from 'react';

import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

function ThirdAuthStep() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const toggleEyeIcon = () => setEyeIcon(!eyeIcon);

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="grid gap-10 mt-16 justify-center pb-5">
      <h2 className="heading2 text-center">Create your password</h2>

      <form className="grid w-full form" onSubmit={handleSubmit}>
        {' '}
        <div className="form__input relative">
          <label className="input__label">Create Password</label>
          <div className="relative">
            <input
              type={eyeIcon ? 'text' : 'password'}
              placeholder="create a password..."
              className="input__item"
              name="password"
              value={password}
              onChange={handlePassword}
            />
            <span className="form__eyeIcon">
              {eyeIcon ? (
                <AiOutlineEyeInvisible onClick={toggleEyeIcon} />
              ) : (
                <AiOutlineEye onClick={toggleEyeIcon} />
              )}
            </span>
          </div>

          {password.length < 1 ? (
            <p className="input__label">
              Choose a password you will always remember
            </p>
          ) : (
            ''
          )}
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
