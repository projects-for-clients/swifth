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
import { updatePersonalInfo } from '../../store/features/user/user';
import { getPhotoUri } from '../../utils/getPhotoUri';

interface ImageDetails {
  error: boolean;
  message: string | null;
  size: string;
  name: string;
  value: 'idCardUri' | 'POAUri';
}

const PersonalInfo = ({
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

  const [showCalendarIcon, setShowCalendarIcon] = useState(true);

  const [POADetails, setPOADetails] = useState<ImageDetails>({
    error: false,
    message: null,
    size: '',
    name: '',
    value: 'POAUri',
  });

  const [idCardDetails, setIdCardDetails] = useState<ImageDetails>({
    error: false,
    message: null,
    size: '',
    name: '',
    value: 'idCardUri',
  });

  const [formUri, setFormUri] = useState({
    idCardUri: '',
    POAUri: '',
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [isOnboardingError, setIsOnboardingError] = useState(false);

  useEffect(() => {
    const inputValues = Object.values(onboardingInputs.personalInfo);

    const isDisabled = inputValues.some((value) => value === '');

    setIsOnboardingError(isDisabled);
  }, [onboardingInputs.personalInfo]);

  const uploadUriHandler = async (
    e: MouseEvent<HTMLInputElement>,
    key: 'idCardUri' | 'POAUri'
  ) => {
    const getUri = await getPhotoUri(key);

    setFormUri((prev) => ({
      ...prev,
      [key]: getUri,
    }));
  };

  const formUploadHandler = (
    e: ChangeEvent<HTMLInputElement>,
    value: 'idCardUri' | 'POAUri'
  ) => {
    const fileObj = e.target as HTMLInputElement;

    const { name } = fileObj.files![0];
    const path = fileObj.files![0];

    const size = path.size / 1000;

    const KBSize = size.toString().split('.')[0];

    if (KBSize.length > 3) {
      const MBSize = Number(KBSize) / 1000;

      value === 'idCardUri'
        ? setIdCardDetails((prev) => ({
            ...prev,
            error: MBSize > 2 ? true : false,
            message: MBSize > 2 ? 'File size must not exceed 2MB' : null,
            size: `${MBSize.toFixed(1)}MB`,
            name,
          }))
        : setPOADetails((prev) => ({
            ...prev,
            error: MBSize > 2 ? true : false,
            message: MBSize > 2 ? 'File size must not exceed 2MB' : null,
            size: `${MBSize.toFixed(1)}MB`,
            name,
          }));
    } else {
      value === 'idCardUri'
        ? setIdCardDetails((prev) => ({
            ...prev,
            size: `${KBSize}KB`,
            message: null,
            error: false,
            name,
          }))
        : setPOADetails((prev) => ({
            ...prev,
            size: `${KBSize}KB`,
            message: null,
            error: false,
            name,
          }));
    }
  };

  useEffect(() => {
    if (idCardDetails.name && formUri.idCardUri) {
      dispatch(
        updatePersonalInfo({
          ...onboardingInputs.personalInfo,
          idCardUri: idCardDetails.error
            ? 'File size must not exceed 2MB'
            : formUri.idCardUri,
        })
      );
    }

    if (POADetails.name && formUri.POAUri) {
      const data = {
        target: {
          name: 'POAUri',
          value: POADetails.error
            ? 'File size must not exceed 2MB'
            : formUri.POAUri,
        },
      } as ChangeEvent<HTMLInputElement>;

      dispatch(
        updatePersonalInfo({
          ...onboardingInputs.personalInfo,
          POAUri: idCardDetails.error
            ? 'File size must not exceed 2MB'
            : formUri.idCardUri,
        })
      );
    }
  }, [POADetails, idCardDetails, formUri]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (setup && setStep) {
      return setStep(3)
    }
    handleStep('next');
  };

  useEffect(() => {
    if (POADetails.error || idCardDetails.error || isOnboardingError) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [setInput]);

  function setInput(e: FormEvent, key: string) {
    const changeEvent = e as ChangeEvent<HTMLInputElement>;
    if (
      changeEvent.target.name === 'idCardUri' ||
      changeEvent.target.name === 'POAUri'
    )
      return;

    const { name, value } = changeEvent.target;

    dispatch(
      updatePersonalInfo({
        ...onboardingInputs.personalInfo,
        [name]: value,
      })
    );
  }

  const formErrorField = (val: string): boolean | string => {
    if (validationErrors && validationErrors[val]) {
      const isError = validationErrors[val];
      return isError;
    }

    return false;
  };

  return (
    <>
      {!setup && (
        <Header
          title="Personal Information"
          subTitle="Enter your personal information"
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
          onChange={(e) => setInput(e, 'personalInfo')}
        >
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
                required
              />
            </div>
            <div className="grid gap-4 w-full">
              <label className="text-[1.4rem]">Phone Number</label>
              <input
                type="tel"
                //pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="Phone Number"
                name="phoneNumber"
                className=" rounded-lg py-4 px-4 outline-none border-none text-[1.6rem] bg-color-grey-1 w-full"
                required
              />
            </div>
            <div className="grid gap-4">
              <label className="text-[1.4rem]">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className=" rounded-lg py-4 px-4 outline-none border-none text-[1.6rem] bg-color-grey-1 w-full"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-center justify-between col-span-full">
              <div>
                <label
                  htmlFor={`idCardUri`}
                  className={`flex border  rounded-lg py-8 px-10 items-center gap-6 cursor-pointer text-[1.4rem] w-full h-[8rem] ${
                    idCardDetails.error || formErrorField('idCardUri')
                      ? 'border-red-600 border bg-red-50'
                      : 'border-color-purple-light'
                  }`}
                >
                  {idCardDetails.error ? (
                    <img src="/icons/admin/uploadError.svg" alt="" />
                  ) : (
                    <img src="/icons/admin/upload.svg" alt="" />
                  )}
                  {idCardDetails.name ? (
                    <div className="grid">
                      <p
                        className={`text-[1.4rem] font-normal ${
                          setup
                            ? 'whitespace-nowrap max-w-[10rem] overflow-hidden text-ellipsis'
                            : ''
                        }`}
                      >
                        {idCardDetails.name}
                      </p>
                      <p className="text-color-grey-4 text-[1rem]">
                        {idCardDetails.message
                          ? idCardDetails.message
                          : idCardDetails.size}
                      </p>
                    </div>
                  ) : (
                    <p className="text-[1.4rem]">
                      Upload Contact Person ID Card
                    </p>
                  )}
                </label>
                <input
                  type="file"
                  name={`idCardUri`}
                  id={`idCardUri`}
                  accept="image/*"
                  className="hidden"
                  onClick={(e) => uploadUriHandler(e, `idCardUri`)}
                  onChange={(e) => formUploadHandler(e, `idCardUri`)}
                />
              </div>
              <div>
                <label
                  htmlFor={`POAUri`}
                  className={`flex border  rounded-lg py-8 px-10 items-center gap-6 cursor-pointer text-[1.4rem] w-full h-[8rem] ${
                    POADetails.error ||
                    (validationErrors && formErrorField('POAUri'))
                      ? 'border-red-600 border bg-red-50'
                      : 'border-color-purple-light'
                  }`}
                >
                  {POADetails.error ? (
                    <img src="/icons/admin/uploadError.svg" alt="" />
                  ) : (
                    <img src="/icons/admin/upload.svg" alt="" />
                  )}
                  {POADetails.name ? (
                    <div className="grid">
                      <p
                        className={`text-[1.4rem] font-normal ${
                          setup
                            ? 'whitespace-nowrap max-w-[10rem] overflow-hidden text-ellipsis'
                            : ''
                        }`}
                      >
                        {' '}
                        {POADetails.name}
                      </p>
                      <p className="text-color-grey-4 text-[1rem]">
                        {POADetails.message
                          ? POADetails.message
                          : POADetails.size}
                      </p>
                    </div>
                  ) : (
                    <p className="text-[1.4rem]">Upload Proof of Address</p>
                  )}
                </label>
                <input
                  type="file"
                  name={`POAUri`}
                  id={`POAUri`}
                  accept="image/*"
                  className="hidden"
                  onClick={(e) => uploadUriHandler(e, `POAUri`)}
                  onChange={(e) => formUploadHandler(e, `POAUri`)}
                />
              </div>
            </div>
            <div className="grid gap-4">
              <label className="text-[1.4rem]">ID Type</label>
              <input
                type="text"
                name="idCardType"
                placeholder="Enter ID Type"
                className=" rounded-lg py-4 px-4 outline-none border-none text-[1.6rem] bg-color-grey-1 w-full"
                required
              />
            </div>

            <div className="grid gap-4">
              <label className="text-[1.4rem]">ID Number</label>
              <input
                type="number"
                name="idCardNumber"
                placeholder="Enter ID number"
                className=" rounded-lg py-4 px-4 outline-none border-none text-[1.6rem] bg-color-grey-1 w-full"
              />
            </div>
            <div className="grid gap-4 w-full">
              <label className="text-[1.4rem]">Expiry Date</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  name="idCardExpirationDate"
                  placeholder="Input Date"
                  className=" rounded-lg py-4 px-4 outline-none border-none text-[1.6rem] bg-color-grey-1 w-full cursor-pointer"
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
            </div>
          </div>

          <button
            className={`text-[1.6rem] bg-color-primary px-10 py-6 justify-self-end  rounded-lg text-color-white uppercase font-semibold self-center disabled:opacity-60 disabled:cursor-not-allowed ${
              setup ? 'w-full mt-10 mb-10' : 'w-[28rem]'
            }`}
            disabled={isDisabled}
          >
            {setup ? 'Save Changes' : 'Continue'}
          </button>
        </form>
      </div>
    </>
  );
};

export default PersonalInfo;
