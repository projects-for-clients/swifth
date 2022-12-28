import React, { useState, useEffect, SetStateAction, useContext } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { AuthContext } from '../../Context/AppContext';
import { useAppDispatch } from '../../store/app/hooks';
import { updateUser } from '../../store/features/user/user';

export const SecondSignUpStep = () => {
  const AuthContextData = useContext(AuthContext);

  const { setStep } = AuthContextData;

  const dispatch = useAppDispatch();
  interface InputTypes {
    firstName: string;
    lastName: string;
    email: string;
  }
  const [disabled, setDisabled] = useState(true);

  const [inputField, setInputField] = useState<InputTypes>({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    const values = Object.values(inputField);

    const checkIfAnyValueIsEmpty = values.some((v) => {
      if (v === '') return true;
    });

    if (checkIfAnyValueIsEmpty) {
      return setDisabled(true);
    }
    setDisabled(false);
  }, [inputField]);

  const validateInput = (): Boolean => {
    return true;
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateInput();

    if (!isValid) {
      return false;
    }

    dispatch(updateUser(inputField));
    setStep(2);
  };

  const handleInputChange = (e: React.FormEvent<HTMLFormElement>) => {
    interface InputProps extends EventTarget {
      name: string;
      value: string;
    }

    const target = e.target as InputProps;

    setInputField({
      ...inputField,
      [target.name]: target.value,
    });
  };

  return (
    <div className="grid gap-10 mt-16 justify-center pb-5">
      <h1 className="heading1 text-center">Join Swifth</h1>
      <p>Enter your required details to get started</p>
      <form
        className="form"
        id="firstAuthStepForm"
        onSubmit={handleAuth}
        onChange={(e) => handleInputChange(e)}
      >
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
        <div className="form__input">
          <label className="input__label">Last Name</label>
          <input
            type="text"
            placeholder="Enter last name"
            className="input__item"
            name="lastName"
            defaultValue={inputField.lastName}
          />
        </div>
        <div className="form__input">
          <label className="input__label">Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            className="input__item"
            name="email"
            defaultValue={inputField.email}
          />
        </div>

        <button
          className="bg-[#40AD6B] text-[1.6rem] py-6 disabled:opacity-50 form__btn"
          disabled={disabled}
        >
          Continue
        </button>
      </form>

      <p className="authText mt-10">
        I have an account? <button> Log In</button>
      </p>
    </div>
  );
};

export const SecondLoginStep = () => {

  const [eyeIcon, setEyeIcon] = useState(false);


  const dispatch = useAppDispatch();
  interface InputTypes {
    email: string;
    password: string;
  }
  const [disabled, setDisabled] = useState(true);

  const [inputField, setInputField] = useState<InputTypes>({
    email: '',
    password: '',
  });

  const handleSubmit = () => {
    console.log('submit')
  }

  useEffect(() => {
    const values = Object.values(inputField);

    const checkIfAnyValueIsEmpty = values.some((v) => {
      if (v === '') return true;
    });

    if (checkIfAnyValueIsEmpty) {
      return setDisabled(true);
    }
    setDisabled(false);
  }, [inputField]);

  const validateInput = (): Boolean => {
    return true;
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateInput();

    if (!isValid) {
      return false;
    }

    dispatch(updateUser(inputField));

    handleSubmit()
  };
  const toggleEyeIcon = () => setEyeIcon(!eyeIcon);

  const handleInputChange = (e: React.FormEvent<HTMLFormElement>) => {
    interface InputProps extends EventTarget {
      name: string;
      value: string;
    }

    const target = e.target as InputProps;

    setInputField({
      ...inputField,
      [target.name]: target.value,
    });
  };

  return (
    <div className="grid gap-10 mt-16 justify-center pb-5">
      <h1 className="heading1 text-center">Welcome Back!</h1>
      <p>Enter your email and password to log in</p>
      <form
        className="form"
        onSubmit={handleAuth}
        onChange={(e) => handleInputChange(e)}
      >
        <div className="form__input">
          <label className="input__label">Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            className="input__item"
            name="email"
            defaultValue={inputField.email}
          />
        </div>

        <div className="form__input relative">
          <label className="input__label">Enter Password</label>
          <div className="relative">
            <input
              type={eyeIcon ? 'text' : 'password'}
              placeholder="create a password..."
              className="input__item w-full"
              name="password"
              defaultValue={inputField.password}
            />
            <span className="form__eyeIcon">
              {eyeIcon ? (
                <AiOutlineEyeInvisible onClick={toggleEyeIcon} />
              ) : (
                <AiOutlineEye onClick={toggleEyeIcon} />
              )}
            </span>
          </div>

          
            <p className="input__label text-end">
              <a href="/">Forgot password?</a>
            </p>
          
        </div>

        <button
          className="bg-[#40AD6B] text-[1.6rem] py-6 disabled:opacity-50 form__btn"
          disabled={disabled}
        >
          Continue
        </button>
      </form>

      <p className="authText mt-10">
        I have an account? <button> Log In</button>
      </p>
    </div>
  );
};
