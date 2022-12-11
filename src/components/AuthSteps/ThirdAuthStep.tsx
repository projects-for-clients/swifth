import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/features/user/user';


function ThirdAuthStep() {
    const userSelector = useAppSelector(selectUser)

    const [otp, setOtp] = useState<string>('');
    const [message, setMessage] = useState<{
      message: string;
      type: string;
    } | null>(null);
  const [isOtpLengthInValid, setIsOtpLengthInValid] = useState(true);
    const [loading, setLoading] = useState(false);


 const otpHandler = (input: string) => {
   setOtp(input);
   setMessage(null);
   if (input.length < 6) {
     setIsOtpLengthInValid(true);
   } else {
     setIsOtpLengthInValid(false);
   }
 };

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setMessage(null);

   if (otp.length < 6) {
     return;
   }

 };

  return (
    <div className="grid gap-10 mt-16 justify-center pb-5">
      <h2 className="heading2 text-center">We just sent your an email</h2>

      <form
        className="grid w-full place-content-stretch md:w-3/4 md:mx-auto"
        onSubmit={handleSubmit}
      >
        {' '}
        {message && message.type === 'error' && (
          <p className="text-red-500 text-sm font-semibold text-center py-4">
            {message.message}
          </p>
        )}
        <h2 className="font-black text-center text-black mb-2 text-xl">
          Enter the email we sent to {userSelector.email}
        </h2>
        <OtpInput
          value={otp}
          onChange={otpHandler}
          numInputs={4}
          inputStyle="pinlogin-field"
          containerStyle="pinlogin"
          shouldAutoFocus
          isInputNum
        />
        <button
          className=" rounded-3xl outline-none  bg-[#1776d1] text-white text-lg py-2 mt-10 grid justify-self-center w-2/5 disabled:(bg-gray-500 opacity-40)"
          type="submit"
          disabled={isOtpLengthInValid}
        >
          {loading ? 'Loading...' : (
            'Confirm'
          )}
        </button>
      </form>
      <p className="authText mt-10">
        I have an account? <button> Log In</button>
      </p>
    </div>
  );
}

export default ThirdAuthStep;
