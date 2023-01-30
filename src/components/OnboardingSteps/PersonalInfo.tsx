import { ChangeEvent, FormEvent, MouseEvent, useContext, useEffect, useState } from 'react';
import Header from '../../components/dashboard/Header';
import { OnboardingContext } from '../../Context/AppContext';
import { getPhotoUri } from '../../utils/getPhotoUri';


interface Imagesize {
  idCard: string;
  POA: string;
  error: {
    idCard: boolean;
    POA: boolean;
  };
}

const PersonalInfo = () => {
  const { handleStep, handleInputChange, validationErrors, onboardingInputs } =
    useContext(OnboardingContext);
    
 
  const [showCalendarIcon, setShowCalendarIcon] = useState(true);

   const [idCardDetails, setIdCardDetails] = useState<string>('');
  const [POADetails, setPOADetails] = useState<string>('');
  const [imageSize, setImageSize] = useState<Imagesize>({
    idCard: '',
    POA: '',
    error: {
      idCard: false,
      POA: false,
    },
  });
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const inputValues = Object.values(onboardingInputs.personalInfo);

    const isDisabled = inputValues.some((value) => value === '');

    setIsDisabled(isDisabled);
  }, [onboardingInputs.personalInfo]);


  const uploadUriHandler = async (
    e: MouseEvent<HTMLInputElement>,
    key: 'idCardUri' | 'POAUri'
  ) => {
    const getUri = await getPhotoUri(key);

    const data = {
      target: {
        name: key,
        value: getUri,
      },
    } as ChangeEvent<HTMLInputElement>;

    handleInputChange(data, 'personalInfo');
  };

  const uploadDetailsHandler = (
    e: ChangeEvent<HTMLInputElement>,
    type: 'idCard' | 'POA'
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
            [type]: MBSize > 2 ? true : false,
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

      if (type === 'idCard') {
        setIdCardDetails(path.name);
      }
      if (type === 'POA') {
        setPOADetails(path.name);
      }
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const setInput = (e: FormEvent, key: string) => {
    const changeEvent = e as ChangeEvent<HTMLInputElement>;
    handleInputChange(changeEvent, key);
  };

  return (
    <>
      <Header
        title="Personal Information"
        subTitle="Enter your personal information"
        onboarding
      />

      <div className="grid gap-16">
        <div className="flex gap-2">
          <img src="/icons/admin/barFilled.svg" alt="" />
          <img src="/icons/admin/barFilled.svg" alt="" />
          <img src="/icons/admin/barFilled.svg" alt="" />
        </div>

        <form className="grid gap-10 " onSubmit={handleFormSubmit} onChange={(e) => setInput(e, 'personalInfo')}>
          <div
            className="grid gap-10 mt-4"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(40rem, 1fr))',
            }}
          >
            <div className="grid gap-4">
              <label className="text-[1.4rem]">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter full name"
                className=" rounded-lg py-4 px-4 outline-none border-none text-[1.6rem] bg-color-grey-1 w-full"
              />
            </div>
            <div className="grid gap-4 w-full">
              <label className="text-[1.4rem]">Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                className=" rounded-lg py-4 px-4 outline-none border-none text-[1.6rem] bg-color-grey-1 w-full"
              />
            </div>
            <div className="grid gap-4">
              <label className="text-[1.4rem]">Email Address</label>
              <input
                type="text"
                placeholder="Enter Email"
                className=" rounded-lg py-4 px-4 outline-none border-none text-[1.6rem] bg-color-grey-1 w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center justify-between col-span-full">
              <label
                htmlFor="idCardUri"
                className={`flex border rounded-lg py-8 px-10 items-center gap-6 cursor-pointer h-[7rem] ${
                  (validationErrors && validationErrors.idCardUri) ||
                  imageSize.error.idCard
                    ? 'border-red-600 border bg-red-50'
                    : 'border-color-purple-light'
                }`}
              >
                {(validationErrors && validationErrors.idCardUri) ||
                imageSize.error.idCard ? (
                  <img src="/icons/admin/uploadError.svg" alt="" />
                ) : (
                  <img src="/icons/admin/upload.svg" alt="" />
                )}

                {idCardDetails ? (
                  <div className="grid">
                    <p className="text-[1.4rem] font-normal">{idCardDetails}</p>

                    {imageSize?.error.idCard ? (
                      <p className="text-red-600 text-[1.2rem]">
                        File size must not exceed 2MB
                      </p>
                    ) : (
                      <p className="text-color-grey-4 text-[1rem]">
                        {imageSize.idCard}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="grid">
                    <p className="text-color-grey-3">
                      Upload Contact Person ID Card
                    </p>

                    {validationErrors && validationErrors.idCardUri && (
                      <p className="text-red-600 text-[1.2rem]">
                        {validationErrors.idCardUri}
                      </p>
                    )}
                  </div>
                )}
              </label>
              <input
                type="file"
                name="idCardUri"
                id="idCardUri"
                accept="image/*"
                className="hidden"
                onClick={(e) => uploadUriHandler(e, 'idCardUri')}
                onChange={(e) => uploadDetailsHandler(e, 'idCard')}
              />
              <label
                htmlFor="POAUri"
                className={`flex border rounded-lg py-8 px-10 items-center gap-6 cursor-pointer h-[7rem] ${
                  (validationErrors && validationErrors.POAUri) ||
                  imageSize.error.POA
                    ? 'border-red-600 border bg-red-50'
                    : 'border-color-purple-light'
                }`}
              >
                {(validationErrors && validationErrors.pOAUri) ||
                imageSize.error.POA ? (
                  <img src="/icons/admin/uploadError.svg" alt="" />
                ) : (
                  <img src="/icons/admin/upload.svg" alt="" />
                )}
                {POADetails ? (
                  <div className="grid">
                    <p className="text-[1.4rem] font-normal">{POADetails}</p>
                    {imageSize?.error.POA ? (
                      <p className="text-red-600 text-[1.2rem]">
                        File size must not exceed 2MB
                      </p>
                    ) : (
                      <p className="text-color-grey-4 text-[1rem]">
                        {imageSize.POA}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="grid">
                    <p>Upload Custom POA (yearly)</p>
                    {validationErrors && validationErrors.pOAUri && (
                      <p className="text-red-600 text-[1.2rem]">
                        {validationErrors.pOAUri}
                      </p>
                    )}
                  </div>
                )}
              </label>
              <input
                type="file"
                name="POAUri"
                id="POAUri"
                accept="image/*"
                className="hidden"
                onClick={(e) => uploadUriHandler(e, 'POAUri')}
                onChange={(e) => uploadDetailsHandler(e, 'POA')}
              />
            </div>
            <div className="grid gap-4">
              <label className="text-[1.4rem]">ID Type</label>
              <input
                type="text"
                placeholder="Enter ID Type"
                className=" rounded-lg py-4 px-4 outline-none border-none text-[1.6rem] bg-color-grey-1 w-full"
              />
            </div>
            <div className="grid gap-4">
              <label className="text-[1.4rem]">ID Number</label>
              <input
                type="number"
                placeholder="Enter ID number"
                className=" rounded-lg py-4 px-4 outline-none border-none text-[1.6rem] bg-color-grey-1 w-full"
              />
            </div>
            <div className="grid gap-4 w-full">
              <label className="text-[1.4rem]">Expiry Date</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Input Date"
                  className=" rounded-lg py-4 px-4 outline-none border-none text-[1.6rem] bg-color-grey-1 w-full cursor-pointer"
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
            </div>
          </div>
          <button
            className="text-[1.6rem] bg-color-primary px-10 py-6 justify-self-end w-[28rem] rounded-lg text-color-white uppercase font-semibold self-center disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isDisabled}
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default PersonalInfo;
