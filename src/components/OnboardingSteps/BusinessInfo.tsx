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

interface ImageDetails {
  cacUri: string;
  licenseUri: string;
  error: {
    cacUri: boolean;
    licenseUri: boolean;
    logoUri: boolean;
  };
}

type UriDetails = {
  name: string;
  uri: string;
};

const businessInfo = () => {
  const { handleStep, handleInputChange, validationErrors, onboardingInputs } =
    useContext(OnboardingContext);

  const { businessName, officeAddress } = onboardingInputs.businessInfo;

  const [cacDetails, setCacDetails] = useState<UriDetails>({
    name: '',
    uri: '',
  });
  const [licenseDetails, setLicenseDetails] = useState<UriDetails>({
    name: '',
    uri: '',
  });
  const [logoDetails, setLogoDetails] = useState<UriDetails>({
    name: '',
    uri: '',
  });
  const [imageDetails, setImageDetails] = useState<ImageDetails>({
    cacUri: '',
    licenseUri: '',
    error: {
      cacUri: false,
      licenseUri: false,
      logoUri: false,
    },
  });
  const [showCalendarIcon, setShowCalendarIcon] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const inputValues = Object.values(onboardingInputs.businessInfo);

    const isDisabled = inputValues.some((value) => value === '');

    setIsDisabled(isDisabled);
  }, [onboardingInputs.businessInfo]);

  const uploadUriHandler = async (
    e: MouseEvent<HTMLInputElement>,
    key: 'cacUri' | 'licenseUri' | 'logoUri'
  ) => {
    const getUri = await getPhotoUri(key);

    if (key === 'cacUri') {
      console.log(imageDetails);
      return setCacDetails((prev) => {
        return {
          ...prev,
          uri: getUri,
        };
      });
    }

    if (key === 'licenseUri') {
      return setLicenseDetails((prev) => {
        return {
          ...prev,
          uri: getUri,
        };
      });
    }
    if (key === 'logoUri') {
      return setLogoDetails((prev) => {
        return {
          ...prev,
          uri: getUri,
        };
      });
    }
  };

  useEffect(() => {
    const { error } = imageDetails;

    let isError = {};

    for (let key in error) {
      if (error[key as keyof typeof error] === true) {
        isError = {
          ...isError,
          [key]: true,
        };
        const data = {
          target: {
            name: key,
            value: 'too large',
          },
        } as ChangeEvent<HTMLInputElement>;

        handleInputChange(data, 'businessInfo');
      }
    }

    if (cacDetails.uri && !isError['cacUri' as keyof typeof isError]) {
      const data = {
        target: {
          name: 'cacUri',
          value: cacDetails.uri,
        },
      } as ChangeEvent<HTMLInputElement>;

      return handleInputChange(data, 'businessInfo');
    }

    if (licenseDetails.uri && !isError['licenseUri' as keyof typeof isError]) {
      const data = {
        target: {
          name: 'licenseUri',
          value: licenseDetails.uri,
        },
      } as ChangeEvent<HTMLInputElement>;

      return handleInputChange(data, 'businessInfo');
    }

    if (logoDetails.uri && !isError['logoUri' as keyof typeof isError]) {
      const data = {
        target: {
          name: 'logoUri',
          value: logoDetails.uri,
        },
      } as ChangeEvent<HTMLInputElement>;

      return handleInputChange(data, 'businessInfo');
    }
  }, [imageDetails, cacDetails, licenseDetails, logoDetails]);

  const uploadDetailsHandler = (
    e: ChangeEvent<HTMLInputElement>,
    type: 'cacUri' | 'licenseUri' | 'logoUri'
  ) => {
    const { files } = e.target;

    if (files) {
      const path = files[0];

      const size = path.size / 1000;

      const KBSize = size.toString().split('.')[0];

      if (KBSize.length > 3) {
        const MBSize = Number(KBSize) / 1000;

        console.log({ MBSize });

        setImageDetails((prev) => ({
          ...prev,
          [type]: `${MBSize.toFixed(2)}MB`,
          error: {
            ...prev.error,
            [type]: MBSize > 2 ? true : false,
          },
        }));
      } else {
        console.log({ KBSize });
        setImageDetails((prev) => ({
          ...prev,
          [type]: `${KBSize}KB`,
          error: {
            ...prev.error,
            [type]: false,
          },
        }));
      }

      if (type === 'cacUri') {
        setCacDetails((prev) => {
          return {
            ...prev,
            name: path.name,
          };
        });
      }
      if (type === 'licenseUri') {
        setLicenseDetails((prev) => {
          return {
            ...prev,
            name: path.name,
          };
        });
      }
      if (type === 'logoUri') {
        setLogoDetails((prev) => {
          return {
            ...prev,
            name: path.name,
          };
        });
      }
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
            className="flex gap-8 items-center cursor-pointer w-max"
          >
            <img
              src={logoDetails.uri ? logoDetails.uri : '/icons/admin/bag.svg'}
              alt=""
              className="object-cover w-[9.6rem] h-[9.6rem] rounded-full"
            />
            <input
              type="file"
              id="logoUri"
              name="logoUri"
              accept="image/*"
              className="hidden"
              onChange={(e) => uploadDetailsHandler(e, 'logoUri')}
              onClick={(e) => uploadUriHandler(e, 'logoUri')}
            />
            <div>
              <p className="text-[1.6rem] text-color-primary uppercase">
                Upload Logo
              </p>
              {validationErrors && validationErrors.cacUri && (
                <p className="text-red-600 text-[1.2rem]">
                  {validationErrors.cacUri}
                </p>
              )}
              {imageDetails.error.logoUri && (
                <p className="text-red-600 text-[1.2rem]">
                  Image size should not exceed 2MB
                </p>
              )}
            </div>
          </label>

          <div className="grid grid-cols-2 gap-4 items-center justify-between">
            <label
              htmlFor="cacUri"
              className={`flex border rounded-lg py-8 px-10 items-center gap-6 cursor-pointer h-[7rem] ${
                (validationErrors && validationErrors.cacUri) ||
                imageDetails.error.cacUri
                  ? 'border-red-600 border bg-red-50'
                  : 'border-color-purple-light'
              }`}
            >
              {(validationErrors && validationErrors.cacUri) ||
              imageDetails.error.cacUri ? (
                <img src="/icons/admin/uploadError.svg" alt="" />
              ) : (
                <img src="/icons/admin/upload.svg" alt="" />
              )}

              {cacDetails.name ? (
                <div className="grid">
                  <p className="text-[1.4rem] font-normal">{cacDetails.name}</p>

                  {imageDetails?.error.cacUri ? (
                    <p className="text-red-600 text-[1.2rem]">
                      File size must not exceed 2MB
                    </p>
                  ) : (
                    <p className="text-color-grey-4 text-[1rem]">
                      {imageDetails.cacUri}
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid">
                  <p className="text-color-grey-3">Upload CAC Certificate</p>

                  {validationErrors && validationErrors.cacUri && (
                    <p className="text-red-600 text-[1.2rem]">
                      {validationErrors.cacUri}
                    </p>
                  )}
                </div>
              )}
            </label>
            <input
              type="file"
              name="cacUri"
              id="cacUri"
              accept="image/*"
              className="hidden"
              onClick={(e) => uploadUriHandler(e, 'cacUri')}
              onChange={(e) => uploadDetailsHandler(e, 'cacUri')}
            />
            <label
              htmlFor="licenseUri"
              className={`flex border rounded-lg py-8 px-10 items-center gap-6 cursor-pointer h-[7rem] ${
                (validationErrors && validationErrors.licenseUri) ||
                imageDetails.error.licenseUri
                  ? 'border-red-600 border bg-red-50'
                  : 'border-color-purple-light'
              }`}
            >
              {(validationErrors && validationErrors.licenseUri) ||
              imageDetails.error.licenseUri ? (
                <img src="/icons/admin/uploadError.svg" alt="" />
              ) : (
                <img src="/icons/admin/upload.svg" alt="" />
              )}
              {licenseDetails.name ? (
                <div className="grid">
                  <p className="text-[1.4rem] font-normal">
                    {licenseDetails.name}
                  </p>
                  {imageDetails?.error.licenseUri ? (
                    <p className="text-red-600 text-[1.2rem]">
                      File size must not exceed 2MB
                    </p>
                  ) : (
                    <p className="text-color-grey-4 text-[1rem]">
                      {imageDetails.licenseUri}
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid">
                  <p>Upload Custom License (yearly)</p>
                  {validationErrors && validationErrors.licenseUri && (
                    <p className="text-red-600 text-[1.2rem]">
                      {validationErrors.licenseUri}
                    </p>
                  )}
                </div>
              )}
            </label>
            <input
              type="file"
              name="licenseUri"
              id="licenseUri"
              accept="image/*"
              className="hidden"
              onClick={(e) => uploadUriHandler(e, 'licenseUri')}
              onChange={(e) => uploadDetailsHandler(e, 'licenseUri')}
            />
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
