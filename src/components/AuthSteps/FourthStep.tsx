import React, { useState } from 'react';

import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useNavigate } from 'react-router';

function ThirdAuthStep() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );
  const [eyeIcon, setEyeIcon] = useState(false);

  const validatePassword = () => {
    let isError = false;

    if (password.length < 6) {
      setValidationMessage('Password must be more than 6');
      isError = true;
    }

    if (password === '') {
      setValidationMessage('Password cannot be empty');
      isError = true;
    }

    console.log({ isError });
    return isError;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validatePassword();

    if (!!isValid) {
      return;
    }

    setLoading(true)
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const toggleEyeIcon = () => setEyeIcon(!eyeIcon);

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationMessage(null);
    setPassword(e.target.value);
  };

  return (
    <div className="grid gap-10 mt-16 justify-center pb-5 self-center">
      <h2 className="heading2 text-center">Create your password</h2>

      <form className="grid form w-[34rem]" onSubmit={handleSubmit}>
        {' '}
        <div className="form__input relative">
          <label className="input__label">Create Password</label>
          <div className="relative">
            <input
              type={eyeIcon ? 'text' : 'password'}
              placeholder="create a password..."
              className={`input__item w-full ${
                validationMessage && validationMessage
                  ? 'border-red-600 border animate__animated animate__shakeX'
                  : ''
              }`}
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
          {validationMessage && (
            <span className="text-red-600">{validationMessage}</span>
          )}
          {password.length < 1 ? (
            <p className="input__label transition-all delay-75 ease-out">
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
