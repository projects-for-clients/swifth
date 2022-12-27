import React, { useContext, useState } from 'react';
import OtpInput from 'react-otp-input';
import { AuthContext } from '../../Context/AppContext';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/features/user/user';


function ThirdStep() {
  const AuthContextData = useContext(AuthContext);

  const { setStep } = AuthContextData;
  
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
   if (input.length < 4) {
     setIsOtpLengthInValid(true);
   } else {
     setIsOtpLengthInValid(false);
   }
 };

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setMessage(null);

   if (otp.length < 4) {
    console.log('error')
     return;
   }

   console.log("no error")
   setStep(3)

 };

  return (
    <div className="grid gap-10 mt-16 justify-center pb-5">
      <h2 className="heading2 text-center">We just sent your an email</h2>

      <form className="grid w-full form" onSubmit={handleSubmit}>
        {' '}
        {message && message.type === 'error' && (
          <p className="text-red-500 text-sm font-semibold text-center py-4">
            {message.message}
          </p>
        )}
        <p className="text-center">
          Enter the email we sent to {userSelector.email}
        </p>
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

export default ThirdStep;
