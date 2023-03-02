import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  MouseEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import Header from '../../components/dashboard/Header';
import { OnboardingContext } from '../../Context/AppContext';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { updateBusinessInfo } from '../../store/features/user/user';
import { getPhotoUri } from '../../utils/getPhotoUri';

type UriKeys = 'logoUri' | 'cacUri' | 'licenseUri';
interface KeyProps {
  error: boolean;
  message: string | null;
  size: string;
  pathName: string;
}

const keyProps = {
  error: false,
  message: null,
  size: '',
  pathName: '',
} satisfies KeyProps;

const businessInfo = ({
  setup,
  setStep,
}: {
  setup?: boolean;
  setStep?: Dispatch<SetStateAction<number>>;
}) => {
  const dispatch = useAppDispatch();
  const { onboardingInputs } = useAppSelector((state) => state.user);
  const contextData = useContext(OnboardingContext);

  const handleStep = contextData?.handleStep;
  const validationErrors = contextData?.validationErrors;

  const { businessName, officeAddress } = onboardingInputs.businessInfo;

  const [imageDetails, setImageDetails] = useState<Record<UriKeys, KeyProps>>({
    logoUri: keyProps,
    cacUri: keyProps,
    licenseUri: keyProps,
  });

  const [imgUris, setImgUris] = useState<Record<UriKeys, string>>({
    logoUri: '',
    cacUri: '',
    licenseUri: '',
  });

  const [showCalendarIcon, setShowCalendarIcon] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isOnboardingError, setIsOnboardingError] = useState(false);

  useEffect(() => {
    const inputValues = Object.values(onboardingInputs.businessInfo);

    const filterValues = inputValues.some((value) => value === '');

    setIsOnboardingError(filterValues);
  }, [onboardingInputs.businessInfo]);

  const uploadUriHandler = async (key: 'logoUri' | 'cacUri' | 'licenseUri') => {
    const getUri = await getPhotoUri(key);

    setImgUris((prev) => ({ ...prev, [key]: getUri }));

    dispatch(
      updateBusinessInfo({
        ...onboardingInputs.businessInfo,
        [key]: getUri,
      })
    );
  };

  const formUploadHandler = (
    e: ChangeEvent<HTMLInputElement>,
    key: 'logoUri' | 'cacUri' | 'licenseUri'
  ) => {
    const fileObj = e.target as HTMLInputElement;

    const { name } = fileObj.files![0];
    const path = fileObj.files![0];

    const size = path.size / 1000;

    const KBSize = size.toString().split('.')[0];

    if (KBSize.length > 3) {
      const MBSize = Number(KBSize) / 1000;

      setImageDetails((prev) => ({
        ...prev,
        [key]: {
          pathName: name,
          error: MBSize > 2 ? true : false,
          message: MBSize > 2 ? 'File size must not exceed 2MB' : null,
          size: `${MBSize.toFixed(1)}MB`,
        },
      }));
    } else {
      setImageDetails((prev) => ({
        ...prev,
        [key]: {
          error: false,
          message: null,
          pathName: name,
          size: `${KBSize}KB`,
        },
      }));
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleStep('portsAndTerminal');
  };

  useEffect(() => {
    const filterValues = Object.values(imageDetails).some((value) => {
      return value.error === true || value.pathName === '';
    });

    if (filterValues || isOnboardingError) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [setInput]);

  function setInput(e: FormEvent, key: string) {
    const changeEvent = e as ChangeEvent<HTMLInputElement>;

    const { name } = changeEvent.target;

    if (name === 'cacUri' || name === 'licenseUri' || name === 'logoUri') {
      return;
    } else {
      const { name, value } = changeEvent.target;

      dispatch(
        updateBusinessInfo({
          ...onboardingInputs.businessInfo,
          [name]: value,
        })
      );
    }
  }

  return (
    <>
      {!setup && (
        <Header
          title="Business Information"
          subTitle="Enter your business details"
          onboarding
        />
      )}

      <div className="grid gap-16">
        {!setup && (
          <div className="flex gap-2">
            <img src="/icons/admin/barFilled.svg" alt="" />
            <img src="/icons/admin/barFilled.svg" alt="" />
            <img src="/icons/admin/barFilled.svg" alt="" />
          </div>
        )}

        <form
          className="grid gap-10 "
          onSubmit={handleFormSubmit}
          onChange={(e) => setInput(e, 'businessInfo')}
        >
          <label
            htmlFor="logoUri"
            className="flex gap-8 items-center w-max cursor-pointer"
          >
            <img
              src={imgUris.logoUri ? imgUris.logoUri : '/icons/admin/bag.svg'}
              alt=""
              className="object-cover w-[9.6rem] h-[9.6rem] rounded-full"
            />
            <input
              type="file"
              id="logoUri"
              name="logoUri"
              accept="image/*"
              className="hidden"
              onChange={(e) => formUploadHandler(e, 'logoUri')}
              onClick={() => uploadUriHandler('logoUri')}
            />
            <div>
              <p className="text-[1.6rem] text-color-primary uppercase">
                Upload Logo
              </p>
              {imageDetails.logoUri.error && (
                <p className="text-red-600 text-[1.2rem]">
                  {imageDetails.logoUri.message}
                </p>
              )}
            </div>
          </label>

          <div className="grid grid-cols-2 gap-4 items-center justify-between col-span-full">
            <div>
              <label
                htmlFor={`cacUri`}
                className={`flex border  rounded-lg py-8 px-10 items-center gap-6 cursor-pointer text-[1.4rem] w-full h-[8rem] ${
                  imageDetails.cacUri.error
                    ? 'border-red-600 border bg-red-50'
                    : 'border-color-purple-light'
                }`}
              >
                {imageDetails.cacUri.error ? (
                  <img src="/icons/admin/uploadError.svg" alt="" />
                ) : (
                  <img src="/icons/admin/upload.svg" alt="" />
                )}
                {imageDetails.cacUri.pathName ? (
                  <div className="grid">
                    <p className="text-[1.4rem] font-normal">
                      {imageDetails.cacUri.pathName}
                    </p>
                    <p className="text-color-grey-4 text-[1rem]">
                      {imageDetails.cacUri.message
                        ? imageDetails.cacUri.message
                        : imageDetails.cacUri.size}
                    </p>
                  </div>
                ) : (
                  <p className="text-[1.4rem]">Upload CAC Certificate</p>
                )}
              </label>
              <input
                type="file"
                name={`cacUri`}
                id={`cacUri`}
                accept="image/*"
                className="hidden"
                onClick={() => uploadUriHandler(`cacUri`)}
                onChange={(e) => formUploadHandler(e, `cacUri`)}
              />
            </div>
            <div>
              <label
                htmlFor={`licenseUri`}
                className={`flex border  rounded-lg py-8 px-10 items-center gap-6 cursor-pointer text-[1.4rem] w-full h-[8rem] ${
                  imageDetails.licenseUri.error
                    ? 'border-red-600 border bg-red-50'
                    : 'border-color-purple-light'
                }`}
              >
                {imageDetails.licenseUri.error ? (
                  <img src="/icons/admin/uploadError.svg" alt="" />
                ) : (
                  <img src="/icons/admin/upload.svg" alt="" />
                )}
                {imageDetails.licenseUri.pathName ? (
                  <div className="grid">
                    <p className="text-[1.4rem] font-normal">
                      {imageDetails.licenseUri.pathName}
                    </p>
                    <p className="text-color-grey-4 text-[1rem]">
                      {imageDetails.licenseUri.message
                        ? imageDetails.licenseUri.message
                        : imageDetails.licenseUri.size}
                    </p>
                  </div>
                ) : (
                  <p className="text-[1.4rem]">
                    Upload Custom License (yearly)
                  </p>
                )}
              </label>
              <input
                type="file"
                name={`licenseUri`}
                id={`licenseUri`}
                accept="image/*"
                className="hidden"
                onClick={() => uploadUriHandler(`licenseUri`)}
                onChange={(e) => formUploadHandler(e, `licenseUri`)}
              />
            </div>
          </div>

          <div className="grid gap-10 mt-4 max-w-[50rem]">
            <div className="grid gap-4">
              <label className="text-[1.4rem]">Business name</label>
              <input
                type="text"
                placeholder="Enter business name"
                className={`rounded-lg py-4 px-4 outline-none text-[1.6rem] bg-color-grey-1 w-full ${
                  validationErrors && validationErrors.businessName
                    ? 'border-red-600 border animate__animated animate__shakeX'
                    : ''
                }`}
                name="businessName"
                defaultValue={businessName}
              />
              {validationErrors && validationErrors.businessName && (
                <p className="text-red-600 text-[1.2rem]">
                  {validationErrors.businessName}
                </p>
              )}
            </div>
            <div className="grid gap-4 w-full">
              <label className="text-[1.4rem]">
                Custom License expiration date
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="select Date"
                  className={`rounded-lg py-4 px-4 outline-none text-[1.6rem] bg-color-grey-1 w-full ${
                    validationErrors && validationErrors.licenseUri
                      ? 'border-red-600 border animate__animated animate__shakeX'
                      : ''
                  }`}
                  name="licenseExpirationDate"
                  onFocus={(e) => {
                    e.target.type = 'date';
                    e.target.min = new Date().toISOString().split('T')[0];
                    setShowCalendarIcon(false);
                  }}
                />
                {showCalendarIcon && (
                  <img
                    src="/icons/admin/calendar.svg"
                    alt=""
                    className="absolute right-4 w-[2rem] h-[2rem]"
                  />
                )}
              </div>
              {validationErrors && validationErrors.licenseExpirationDate && (
                <p className="text-red-600 text-[1.2rem]">
                  {validationErrors.licenseExpirationDate}
                </p>
              )}
            </div>
            <div className="grid gap-4">
              <label className="text-[1.4rem]">Office Address</label>
              <input
                type="text"
                placeholder="Enter Address"
                className={`rounded-lg py-4 px-4 outline-none text-[1.6rem] bg-color-grey-1 w-full ${
                  validationErrors && validationErrors.officeAddress
                    ? 'border-red-600 border animate__animated animate__shakeX'
                    : ''
                }`}
                name="officeAddress"
                defaultValue={officeAddress}
              />
              {validationErrors && validationErrors.officeAddress && (
                <p className="text-red-600 text-[1.2rem]">
                  {validationErrors.officeAddress}
                </p>
              )}
            </div>
          </div>
          <button
            className="text-[1.6rem] bg-color-primary px-10 py-6 justify-self-end w-[28rem] rounded-lg text-color-white uppercase font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isDisabled}
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default businessInfo;
