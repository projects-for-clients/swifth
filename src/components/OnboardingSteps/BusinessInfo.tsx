import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useContext,
  useState,
} from 'react';
import Header from '../../components/dashboard/Header';
import { OnboardingContext } from '../../Context/AppContext';
import { getPhotoUrl } from '../../utils/getPhotoUrl';

const businessInfo = () => {
  const {
    setStep,
    onboardingInputs: {
      businessInfo: {
        businessName,
        businessAddress,
        cacCertificateUri,
        customLicenseExpirationDate,
        customLicenseUri,
        logoUri,
      },
    },
    setOnboardingInputs,
  } = useContext(OnboardingContext);

  const [cacUploadUrl, setCacUploadUrl] = useState<string>(null as any);
  const [licenseUploadUrl, setLicenseUploadUrl] = useState<string>(null as any);
  const [imageSize, setImageSize] = useState<{
    cac: string;
    license: string;
  }>(null as any);
  const [showCalendarIcon, setShowCalendarIcon] = useState(true);

  const cacUploadHandler = async(
    e: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    const fileObj = e.target as HTMLInputElement;


    const { name } = fileObj.files![0];
    const path = fileObj.files![0];

    const size = path.size / 1000;

    const KBSize = size.toString().split('.')[0];

    if (KBSize.length > 3) {
      const MBSize = Number(KBSize) / 1000;

      setImageSize((prev) => ({
        ...prev,
        cac: `${MBSize.toFixed(2)}MB`,
      }));
    } else {
      setImageSize((prev) => ({
        ...prev,
        cac: `${KBSize}KB`,
      }));
    }
    const getUrl = await getPhotoUrl(value);

    setCacUploadUrl(name);
    setOnboardingInputs((prev) => ({
      ...prev,
      businessInfo: {
        ...prev.businessInfo,
        cacCertificateUri: getUrl,
      },
    }));
  };

  const licenseUploadHandler = async(
    e: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    const fileObj = e.target as HTMLInputElement;

    const { name } = fileObj.files![0];
    const path = fileObj.files![0];

    const size = path.size / 1000;

    const KBSize = size.toString().split('.')[0];

    if (KBSize.length > 3) {
      const MBSize = Number(KBSize) / 1000;

      setImageSize((prev) => ({
        ...prev,
        license: `${MBSize.toFixed(2)}MB`,
      }));
    } else {
      console.log('KB');
      setImageSize((prev) => ({
        ...prev,
        license: `${KBSize}KB`,
      }));
    }

    setLicenseUploadUrl(name);
    const getUrl = await getPhotoUrl(value);

    setOnboardingInputs((prev) => ({
      ...prev,
      businessInfo: {
        ...prev.businessInfo,
        customLicenseUri: getUrl,
      },
    }));
  };

  const logoUploadHandler = async (
    e: MouseEvent<HTMLInputElement>,
    value: string
  ) => {
    const getUrl = await getPhotoUrl(value);

    setOnboardingInputs((prev) => ({
      ...prev,
      businessInfo: {
        ...prev.businessInfo,
        logoUri: getUrl,
      },
    }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStep(1);
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

        <form className="grid gap-10 " onSubmit={handleFormSubmit}>
          <label
            htmlFor="logoUpload"
            className="flex gap-8 items-center cursor-pointer w-max"
          >
            <img
              src={logoUri}
              alt=""
              className="object-cover w-[9.6rem] h-[9.6rem] rounded-full"
            />
            <input
              type="file"
              id="logoUpload"
              accept="image/*"
              className="hidden"
              onClick={(e) => logoUploadHandler(e, 'logoUpload')}
            />
            <p className="text-[1.6rem] text-color-primary uppercase">
              Upload Logo
            </p>
          </label>

          <div className="grid grid-cols-2 gap-4 items-center justify-between">
            <label
              htmlFor="cacUpload"
              className="flex border border-color-purple-light rounded-lg py-8 px-10 items-center gap-6 cursor-pointer h-[7rem]"
            >
              <img src="/icons/admin/upload.svg" alt="" />
              {cacUploadUrl ? (
                <div className="grid">
                  <p className="text-[1.4rem] font-normal">{cacUploadUrl}</p>
                  <p className="text-color-grey-4 text-[1rem]">
                    {imageSize.cac}
                  </p>
                </div>
              ) : (
                <p>Upload CAC Certificate</p>
              )}
            </label>
            <input
              type="file"
              name="cacUpload"
              id="cacUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) => cacUploadHandler(e, 'cacUpload')}
            />
            <label
              htmlFor="licenseUpload"
              className="flex border border-color-purple-light rounded-lg py-8 px-10 items-center gap-6 cursor-pointer h-[7rem]"
            >
              <img src="/icons/admin/upload.svg" alt="" />
              {licenseUploadUrl ? (
                <div className="grid">
                  <p className="text-[1.4rem] font-normal">
                    {licenseUploadUrl}
                  </p>
                  <p className="text-color-grey-4 text-[1rem]">
                    {imageSize.license}
                  </p>
                </div>
              ) : (
                <p>Upload Custom License (yearly)</p>
              )}
            </label>
            <input
              type="file"
              name="licenseUpload"
              id="licenseUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) => licenseUploadHandler(e, 'licenseUpload')}
            />
          </div>

          <div className="grid gap-10 mt-4 max-w-[50rem]">
            <div className="grid gap-4">
              <label className="text-[1.4rem]">Business name</label>
              <input
                type="text"
                placeholder="Enter business name"
                className=" rounded-lg py-4 px-4 outline-none border-none text-[1.6rem] bg-color-grey-1 w-full"
              />
            </div>
            <div className="grid gap-4 w-full">
              <label className="text-[1.4rem]">
                Custom License expiration date
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="select Date"
                  className=" rounded-lg py-4 px-4 outline-none border-none text-[1.6rem] bg-color-grey-1 w-full cursor-pointer"
                  onFocus={(e) => {
                    e.target.type = 'date';
                    setShowCalendarIcon(false);
                  }}
                  // onBlur={(e) => {
                  //   e.target.type = 'text';

                  //   e.target.placeholder = 'select Date';

                  //   e.target.value = '';

                  //   setShowCalendarIcon(true);
                  // }}
                />
                {/* <span className="absolute right-0 bg-color-red w-20 h-20 z-10"></span> */}
                {showCalendarIcon && (
                  <img
                    src="/icons/admin/calendar.svg"
                    alt=""
                    className="absolute right-4 w-[2rem] h-[2rem]"
                  />
                )}
              </div>
            </div>
            <div className="grid gap-4">
              <label className="text-[1.4rem]">Office Address</label>
              <input
                type="text"
                placeholder="Enter Address"
                className=" rounded-lg py-4 px-4 outline-none border-none text-[1.6rem] bg-color-grey-1 w-full"
              />
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
