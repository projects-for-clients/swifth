import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import Header from '../../components/dashboard/Header';
import { OnboardingContext } from '../../Context/AppContext';
import { getPhotoUri } from '../../utils/getPhotoUri';

// type UriKeys = 'logoUri' | 'cacUri' | 'licenseUri';
// interface ImageDetails {
//   [key as string]: {

//     error: boolean;
//     message: string | null;
//     size: string;
//     pathName: string;
//   }
// }

const keyProps = { error: false, message: null, size: '', pathName: '' };

const businessInfo = () => {
  const { handleStep, handleInputChange, validationErrors, onboardingInputs } =
    useContext(OnboardingContext);

  const { businessName, officeAddress } = onboardingInputs.businessInfo;

  const [imageDetails, setImageDetails] = useState({
    logoUri: keyProps,
    cacUri: keyProps,
    licenseUri: keyProps,
  });

  const [imgUris, setImgUris] = useState({
    logoUri: '',
    cacUri: '',
    licenseUri: '',
  });

  const [showCalendarIcon, setShowCalendarIcon] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const inputValues = Object.values(onboardingInputs.businessInfo);

    const isDisabled = inputValues.some((value) => value === '');

    setIsDisabled(isDisabled);
  }, [onboardingInputs.businessInfo]);

  const uploadUriHandler = async (key: 'logoUri' | 'cacUri' | 'licenseUri') => {
    const getUri = await getPhotoUri(key);

    setImgUris((prev) => ({ ...prev, [key]: getUri }));
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
        error: MBSize > 2 ? true : false,
        message: MBSize > 2 ? 'File size must not exceed 2MB' : null,
        size: `${MBSize.toFixed(1)}MB`,
        key: [...imageDetails.key, key],
      }));
    } else {
      setImageDetails((prev) => ({
        ...prev,
        size: `${KBSize}KB`,
        key: [...imageDetails.key.filter((item) => item !== key)],
      }));
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleStep('portsAndTerminal');
  };

  const setInput = (e: FormEvent, key: string) => {
    const changeEvent = e as ChangeEvent<HTMLInputElement>;

    const { name } = changeEvent.target;
    if (name === 'cacUri' || name === 'licenseUri' || name === 'logoUri') {
      return;
    }

    handleInputChange(changeEvent, 'businessInfo');
  };

  // const formErrorField = (val: string): boolean | string => {
  //   if (validationErrors && validationErrors[val]) {
  //     const isError = validationErrors[val];
  //     return isError;
  //   }

  //   return false;
  // };

  return (
    <>
      <Header
        title="Business Information"
        subTitle="Enter your business details"
        onboarding
      />

      <div className="grid gap-16">
        <div className="flex gap-2">
          <img src="/icons/admin/barFilled.svg" alt="" />
          <img src="/icons/admin/barEmpty.svg" alt="" />
          <img src="/icons/admin/barEmpty.svg" alt="" />
        </div>

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
              {imageDetails.error && imageDetails.key.includes('logoUri') && (
                <p className="text-red-600 text-[1.2rem]">
                  {imageDetails.message}
                </p>
              )}
              {/* {imageDetails.error.logoUri && (
                <p className="text-red-600 text-[1.2rem]">
                  Image size should not exceed 2MB
                </p>
              )} */}
            </div>
          </label>

          <div className="grid grid-cols-2 gap-4 items-center justify-between col-span-full">
            <div>
              <label
                htmlFor={`cacUri`}
                className={`flex border  rounded-lg py-8 px-10 items-center gap-6 cursor-pointer text-[1.4rem] w-full h-[8rem] ${
                  imageDetails.error && imageDetails.key.includes('cacUri')
                    ? 'border-red-600 border bg-red-50'
                    : 'border-color-purple-light'
                }`}
              >
                {imageDetails.error && imageDetails.key.includes('cacUri') ? (
                  <img src="/icons/admin/uploadError.svg" alt="" />
                ) : (
                  <img src="/icons/admin/upload.svg" alt="" />
                )}
                {cacDetails.name ? (
                  <div className="grid">
                    <p className="text-[1.4rem] font-normal">
                      {cacDetails.name}
                    </p>
                    <p className="text-color-grey-4 text-[1rem]">
                      {cacDetails.message
                        ? cacDetails.message
                        : cacDetails.size}
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
            {/* <div>
              <label
                htmlFor={`licenseUri`}
                className={`flex border  rounded-lg py-8 px-10 items-center gap-6 cursor-pointer text-[1.4rem] w-full h-[8rem] ${
                  licenseUri.error || formErrorField('licenseUri')
                    ? 'border-red-600 border bg-red-50'
                    : 'border-color-purple-light'
                }`}
              >
                {licenseUri.error ? (
                  <img src="/icons/admin/uploadError.svg" alt="" />
                ) : (
                  <img src="/icons/admin/upload.svg" alt="" />
                )}
                {licenseUri.name ? (
                  <div className="grid">
                    <p className="text-[1.4rem] font-normal">
                      {licenseUri.name}
                    </p>
                    <p className="text-color-grey-4 text-[1rem]">
                      {licenseUri.message
                        ? licenseUri.message
                        : licenseUri.size}
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
            </div> */}
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
