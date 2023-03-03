import React, { useState, useEffect, SetStateAction, useContext } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { AuthContext } from '../../Context/AppContext';
import { useAppDispatch } from '../../store/app/hooks';
import { updateUser } from '../../store/features/user/user';
import { close, open } from '../../store/features/modal';
import { useNavigate } from 'react-router';

export const SecondSignUpStep = () => {
  interface InputTypes {
    firstName: string;
    lastName: string;
    email: string;
  }

  const AuthContextData = useContext(AuthContext);

  const { setStep } = AuthContextData;

  const dispatch = useAppDispatch();
  const redirectToLogin = () => dispatch(open('login'));
  const [disabled, setDisabled] = useState(true);
  const [validationError, setValidationError] = useState<InputTypes | null>(
    null
  );

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

  const formValidate = () => {
    const errors = {} as InputTypes;
    const isValidMail = (e: string, cb: (checkValid: boolean) => void) => {
      const emailRegex = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

      const isValid = emailRegex.test(e);

      return cb(isValid);
    };

    for (const key in inputField) {
      if (key === 'email') {
        isValidMail(inputField[key], (cb) => {
          if (!cb) {
            errors[key] = 'Invalid email';

            setValidationError(errors);
          }
        });
      }

      if (key === 'firstName' || key === 'lastName') {
        if (inputField[key].length < 3) {
          errors[
            key as keyof InputTypes
          ] = `${key} must be more than 3 letters`;

          setValidationError(errors);
        }
      }

      if (
        inputField[key as keyof InputTypes] === '' ||
        inputField[key as keyof InputTypes] === null
      ) {
        errors[key as keyof InputTypes] = 'This field is required';

        setValidationError(errors);
      }
    }

    if (Object.keys(errors).length > 0) {
      return false;
    }

    return true;
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('form submitted');
    const isValid = formValidate();

    if (!isValid) {
      console.log('form not valid');
      return false;
    }

    //dispatch(updateUser(inputField));
    setStep(2);
  };

  const handleInputChange = (e: React.FormEvent<HTMLFormElement>) => {
    interface InputProps extends EventTarget {
      name: string;
      value: string;
    }

    setValidationError(null);
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
            className={`input__item ${
              validationError && validationError.firstName
                ? 'border-red-600 border animate__animated animate__shakeX'
                : ''
            }`}
            name="firstName"
            defaultValue={inputField.firstName}
          />
          {validationError && (
            <span className="text-red-600">{validationError.firstName}</span>
          )}
        </div>
        <div className="form__input">
          <label className="input__label">Last Name</label>
          <input
            type="text"
            placeholder="Enter last name"
            className={`input__item ${
              validationError && validationError.lastName
                ? 'border-red-600 border animate__animated animate__shakeX'
                : ''
            }`}
            name="lastName"
            defaultValue={inputField.lastName}
          />
          {validationError && (
            <span className="text-red-600">{validationError.lastName}</span>
          )}
        </div>
        <div className="form__input">
          <label className="input__label">Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            className={`input__item ${
              validationError && validationError.email
                ? 'border-red-600 border animate__animated animate__shakeX'
                : ''
            }`}
            name="email"
            defaultValue={inputField.email}
          />
          {validationError && (
            <span className="text-red-600">{validationError.email}</span>
          )}
        </div>

        <button
          className="bg-[#40AD6B] text-[1.6rem] py-6 disabled:opacity-50 form__btn"
          disabled={disabled}
        >
          Continue
        </button>
      </form>

      <p className="authText mt-10">
        I have an account? <button onClick={redirectToLogin}> Log In</button>
      </p>
    </div>
  );
};

export const SecondLoginStep = () => {
  const [eyeIcon, setEyeIcon] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const redirectToRegister = () => dispatch(open('signup'));

  interface InputTypes {
    email: string;
    password: string;
  }
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [inputField, setInputField] = useState<InputTypes>({
    email: '',
    password: '',
  });
  const [validationError, setValidationError] = useState<InputTypes | null>(
    null
  );

  const handleSubmit = () => {
    console.log('submit');
    
    setLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
      dispatch(close())
    }, 1000);
  };

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

  const formValidate = () => {
    const errors = {} as InputTypes;
    const isValidMail = (e: string, cb: (checkValid: boolean) => void) => {
      const emailRegex = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

      const isValid = emailRegex.test(e);

      return cb(isValid);
    };

    for (const key in inputField) {
      if (key === 'email') {
        isValidMail(inputField[key], (cb) => {
          if (!cb) {
            errors[key] = 'Invalid email';

            setValidationError(errors);
          }
        });
      }

      if (key === 'password') {
        if (inputField[key].length < 6) {
          errors[key as keyof InputTypes] = `${key} cannot be less than 6`;

          setValidationError(errors);
        }
      }

      if (
        inputField[key as keyof InputTypes] === '' ||
        inputField[key as keyof InputTypes] === null
      ) {
        errors[key as keyof InputTypes] = 'This field is required';

        setValidationError(errors);
      }
    }

    if (Object.keys(errors).length > 0) {
      return false;
    }

    return true;
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = formValidate();

    if (!isValid) {
      return false;
    }

    //dispatch(updateUser(inputField));

    handleSubmit();
  };
  const toggleEyeIcon = () => setEyeIcon(!eyeIcon);

  const handleInputChange = (e: React.FormEvent<HTMLFormElement>) => {
    interface InputProps extends EventTarget {
      name: string;
      value: string;
    }

    setValidationError(null);

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
            className={`input__item ${
              validationError && validationError.email
                ? 'border-red-600 border animate__animated animate__shakeX'
                : ''
            }`}
            name="email"
            defaultValue={inputField.email}
          />
          {validationError && (
            <span className="text-red-600">{validationError.email}</span>
          )}
        </div>

        <div className="form__input relative">
          <label className="input__label">Enter Password</label>
          <div className="relative">
            <input
              type={eyeIcon ? 'text' : 'password'}
              placeholder="create a password..."
              className={`input__item w-full ${
                validationError && validationError.email
                  ? 'border-red-600 border animate__animated animate__shakeX'
                  : ''
              }`}
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
          {validationError && (
            <span className="text-red-600">{validationError.password}</span>
          )}
          <p className="input__label text-end">
            <a href="/">Forgot password?</a>
          </p>
        </div>

        <button
          className="bg-[#40AD6B] text-[1.6rem] py-6 disabled:opacity-50 form__btn"
          disabled={disabled}
        >
          {loading ? 'Loading...' : 'Continue'}
        </button>
      </form>
      <p className="authText mt-10">
        Don't have an account?{' '}
        <button onClick={redirectToRegister}> Create an account</button>
      </p>
    </div>
  );
};
