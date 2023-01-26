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

interface Imagesize {
  cac: string;
  license: string;
  error: {
    cac: boolean;
    license: boolean;
    logo: boolean;
  };
}

const businessInfo = () => {
  const { handleStep, handleInputChange, validationErrors, onboardingInputs } =
    useContext(OnboardingContext);

  const {
    businessName,
    officeAddress,
    cacUri,
    licenseUri,
    licenseExpirationDate,
    logoUri,
  } = onboardingInputs.businessInfo;

  const [cacDetails, setCacDetails] = useState<string>('');
  const [licenseDetails, setLicenseDetails] = useState<string>('');
  const [imageSize, setImageSize] = useState<Imagesize>({
    cac: '',
    license: '',
    error: {
      cac: false,
      license: false,
      logo: false,
    },
  });
  const [showCalendarIcon, setShowCalendarIcon] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const uploadUriHandler = async (
    e: MouseEvent<HTMLInputElement>,
    key: 'cacUri' | 'licenseUri' | 'logoUri'
  ) => {
    const getUri = await getPhotoUri(key);

    const data = {
      target: {
        name: key,
        value: getUri,
      },
    } as ChangeEvent<HTMLInputElement>;

    handleInputChange(data, 'businessInfo');
  };

  const uploadDetailsHandler = (
    e: ChangeEvent<HTMLInputElement>,
    type: 'cac' | 'license' | 'logo'
  ) => {
    const { files } = e.target;

    if (files) {
      const path = files[0];

      const size = path.size / 1000;

      const KBSize = size.toString().split('.')[0];

      if (KBSize.length > 3) {
        const MBSize = Number(KBSize) / 1000;

        setImageSize((prev) => ({
          ...prev,
          [type]: `${MBSize.toFixed(2)}MB`,
          error: {
            ...prev.error,
            [type]: true,
          },
        }));
      } else {
        setImageSize((prev) => ({
          ...prev,
          [type]: `${KBSize}KB`,
          error: {
            ...prev.error,
            [type]: false,
          },
        }));
      }

      if (type === 'cac') {
        setCacDetails(path.name);
      }
      if (type === 'license') {
        setLicenseDetails(path.name);
      }
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleStep(1);
  };

  const setInput = (e: FormEvent, key: string) => {
    const changeEvent = e as ChangeEvent<HTMLInputElement>;
    handleInputChange(changeEvent, key);
  };

  useEffect(() => {
    console.log(onboardingInputs.businessInfo);

    console.log(Object.keys(onboardingInputs))

  }, [onboardingInputs.businessInfo]);

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

        <form className="grid gap-10 " onSubmit={handleFormSubmit}>
          <label
            htmlFor="logoUri"
            className="flex gap-8 items-center cursor-pointer w-max"
          >
            <img
              src={logoUri ? logoUri : '/icons/admin/bag.svg'}
              alt=""
              className="object-cover w-[9.6rem] h-[9.6rem] rounded-full"
            />
            <input
              type="file"
              id="logoUri"
              accept="image/*"
              className="hidden"
              onChange={(e) => uploadDetailsHandler(e, 'logo')}
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
              {imageSize.error.logo && (
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
                imageSize.error.cac
                  ? 'border-red-600 border bg-red-50'
                  : 'border-color-purple-light'
              }`}
            >
              {(validationErrors && validationErrors.cacUri) ||
              imageSize.error.cac ? (
                <img src="/icons/admin/uploadError.svg" alt="" />
              ) : (
                <img src="/icons/admin/upload.svg" alt="" />
              )}

              {cacDetails ? (
                <div className="grid">
                  <p className="text-[1.4rem] font-normal">{cacDetails}</p>

                  {imageSize?.error.cac ? (
                    <p className="text-red-600 text-[1.2rem]">
                      File size must not exceed 2MB
                    </p>
                  ) : (
                    <p className="text-color-grey-4 text-[1rem]">
                      {imageSize.cac}
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
              onChange={(e) => uploadDetailsHandler(e, 'cac')}
            />
            <label
              htmlFor="licenseUri"
              className={`flex border rounded-lg py-8 px-10 items-center gap-6 cursor-pointer h-[7rem] ${
                (validationErrors && validationErrors.licenseUri) ||
                imageSize.error.license
                  ? 'border-red-600 border bg-red-50'
                  : 'border-color-purple-light'
              }`}
            >
              {(validationErrors && validationErrors.licenseUri) ||
              imageSize.error.license ? (
                <img src="/icons/admin/uploadError.svg" alt="" />
              ) : (
                <img src="/icons/admin/upload.svg" alt="" />
              )}
              {licenseDetails ? (
                <div className="grid">
                  <p className="text-[1.4rem] font-normal">{licenseDetails}</p>
                  {imageSize?.error.license ? (
                    <p className="text-red-600 text-[1.2rem]">
                      File size must not exceed 2MB
                    </p>
                  ) : (
                    <p className="text-color-grey-4 text-[1rem]">
                      {imageSize.license}
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
              onChange={(e) => uploadDetailsHandler(e, 'license')}
            />
          </div>

          <div
            className="grid gap-10 mt-4 max-w-[50rem]"
            onChange={(e) => setInput(e, 'businessInfo')}
          >
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
          <button className="text-[1.6rem] bg-color-primary px-10 py-6 justify-self-end w-[28rem] rounded-lg text-color-white uppercase font-semibold">
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default businessInfo;
