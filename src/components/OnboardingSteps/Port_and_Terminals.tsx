import React, { Dispatch, SetStateAction, useContext } from 'react';
import {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import { GrDown, GrUp } from 'react-icons/gr';
import Header from '../../components/dashboard/Header';
import { OnboardingContext } from '../../Context/AppContext';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { updatePortsAndTerminalInfo } from '../../store/features/user/user';
import { getPhotoUri } from '../../utils/getPhotoUri';

type ErrorMessage = {
  message?: string | null;
  error: boolean;
};
interface ITerminal {
  isTerminal: boolean;
  setIsTerminal: (value: boolean) => void;
  id: number;
  terminalCount: number[];
  isError: ErrorMessage;
  setup?: boolean;
  setIsError: Dispatch<SetStateAction<ErrorMessage>>;
}

type Terminal = 'Terminal 1' | 'Terminal 2' | 'Terminal 3';

const Terminal: FC<ITerminal> = ({
  isTerminal,
  setIsTerminal,
  id,
  terminalCount,
  setIsError,
  isError,
  setup
}) => {
  const dispatch = useAppDispatch()
  const userState = useAppSelector((state) => state.user);
  const [imageDetails, setImageDetails] = useState<{
    error: boolean;
    message: string | null;
    size: string;
    name: string;
  }>({
    error: false,
    message: null,
    name: '',
    size: '',
  });
  const [showCalendarIcon, setShowCalendarIcon] = useState(true);

  const terminal: Terminal[] = ['Terminal 1', 'Terminal 2', 'Terminal 3'];
  const [dateChange, setDateChange] = useState('');
  const [formCUri, setFormCUri] = useState('');
  const [selectedItem, setSelectedItem] = useState<Terminal | null>(null);
  const [toggleSelectMenu, setToggleSelectMenu] = useState(false);

  const selectMenuToggler = () => {
    setIsError({
      error: false,
      message: null,
    });
    setToggleSelectMenu(!toggleSelectMenu);
  };

  const {  validationErrors } =
    useContext(OnboardingContext);

  const uploadUriHandler = async (
    e: MouseEvent<HTMLInputElement>,
    key: string
  ) => {
    const getUri = await getPhotoUri(key);
    setFormCUri(getUri);
  };

  const formCUploadHandler = (
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

      setImageDetails((prev) => ({
        ...prev,
        error: MBSize > 2 ? true : false,
        message: MBSize > 2 ? 'File size must not exceed 2MB' : null,
        size: `${MBSize.toFixed(1)}MB`,
        name,
      }));
    } else {
      setImageDetails((prev) => ({
        ...prev,
        size: `${KBSize}KB`,
        message: null,
        error: false,
        name,
      }));
    }
  };
  const handleSelectChange = (_: MouseEvent, item: Terminal) => {
    setIsTerminal(true);
    setSelectedItem(item);
    setToggleSelectMenu(false);
  };

  const keyId = `terminal${id}`;
  const terminalError = (val: string): boolean | string => {
    if(validationErrors && validationErrors[keyId]){

      const isError = validationErrors[keyId][val];
      return isError;
    }

    return false;


  };

  useEffect(() => {
    if (selectedItem) {
     

      dispatch(
        updatePortsAndTerminalInfo({
          ...userState.onboardingInputs.portsAndTerminal,
          [`terminal${id}`]: {
            terminal: selectedItem,
            formCUri: imageDetails.error ? 'too large' : formCUri,
            formCExpirationDate: dateChange,
          }
        })
      );
    }
  }, [selectedItem, formCUri, dateChange]);

  useEffect(() => {
    if (terminalCount.length > 1 && !selectedItem) {
      return setIsError({
        error: true,
      });
    } else {
      setIsError({
        error: false,
      });
    }
  }, [terminalCount, selectedItem]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value).toLocaleDateString();
    setDateChange(date);
  };

  return (
    <section
      className="grid gap-8 items-center "
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
      }}
    >
      <div className={`grid gap-4 ${isTerminal ? 'w-full' : 'w-[33rem]'}`}>
        <label className="text-[1.4rem] text-color-dark-1">
          Choose Terminal
        </label>
        <div className="relative flex items-center w-[33rem] justify-items-start cursor-pointer">
          <div className="w-full items-center">
            <p
              className={`border p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointe text-left ${
                !selectedItem && isError.message ? 'border-red-400' : ''
              }`}
              onClick={selectMenuToggler}
            >
              {selectedItem ? (
                selectedItem
              ) : (
                <span className="text-gray-400">Select Terminal</span>
              )}{' '}
            </p>
            {!selectedItem && isError.message ? (
              <span>
                <span className="text-red-500 absolute -bottom-8 ">
                  Field cannot be empty
                </span>
              </span>
            ) : null}
          </div>

          {toggleSelectMenu && (
            <div className="absolute top-[5rem]  left-0 border w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize">
              {terminal.map((item, index) => (
                <p
                  className="text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer text-left"
                  key={index}
                  onClick={(e) => handleSelectChange(e, item)}
                >
                  {item}
                </p>
              ))}
            </div>
          )}
          {toggleSelectMenu ? (
            <GrUp className="absolute right-4 text-[1.3rem]" />
          ) : (
            <GrDown className="absolute right-4 text-[1.3rem]" />
          )}
        </div>
      </div>
      {isTerminal && (
        <>
          <div className="flex items-center w-full self-end">
            <label
              htmlFor={`formC${id}`}
              className={`flex border  rounded-lg py-8 px-10 items-center gap-6 cursor-pointer text-[1.4rem] w-full h-[8rem] ${
                imageDetails.error ||
                (validationErrors && terminalError('formCUri'))
                  ? 'border-red-600 border bg-red-50'
                  : 'border-color-purple-light'
              }`}
            >
              {imageDetails.error ? (
                <img src="/icons/admin/uploadError.svg" alt="" />
              ) : (
                <img src="/icons/admin/upload.svg" alt="" />
              )}
              {imageDetails.name ? (
                <div className="grid">
                  <p
                    className={`text-[1.4rem] font-normal ${
                      setup
                        ? 'whitespace-nowrap max-w-[10rem] overflow-hidden text-ellipsis'
                        : ''
                    }`}
                  >
                    {' '}
                    {imageDetails.name}
                  </p>
                  <p className="text-color-grey-4 text-[1rem]">
                    {imageDetails.message
                      ? imageDetails.message
                      : imageDetails.size}
                  </p>
                </div>
              ) : (
                <p className="text-[1.4rem]">
                  Upload Form C-30 per terminal (Yearly)
                </p>
              )}
            </label>
            <input
              type="file"
              name={`formC${id}`}
              id={`formC${id}`}
              accept="image/*"
              className="hidden"
              onClick={(e) => uploadUriHandler(e, `formC${id}`)}
              onChange={(e) => formCUploadHandler(e, `formC${id}`)}
            />
          </div>

          <div className="grid gap-4  w-full">
            <label className="text-[1.4rem]">
              Input expiration date for each form C-30{' '}
            </label>
            <div className="relative flex items-center ">
              <input
                type="text"
                placeholder="select Date"
                className={` rounded-lg py-4 px-4 outline-none text-[1.6rem] bg-color-grey-1 w-full cursor-pointer   border ${
                  terminalError('formCExpirationDate')
                    ? 'border-red-600 border bg-red-50'
                    : 'border-color-purple-light bg-color-grey-1'
                }`}
                onChange={handleDateChange}
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
        </>
      )}
    </section>
  );
};

type Port = 'Lagos' | 'Onitsha';

const PortAndTerminals = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const port: Port[] = ['Lagos', 'Onitsha'];
  const [selectedItem, setSelectedItem] = useState<Port | null>(null);
  const [toggleSelectMenu, setToggleSelectMenu] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [isError, setIsError] = useState<ErrorMessage>({
    message: '',
    error: false,
  });

  const selectMenuToggler = () => setToggleSelectMenu(!toggleSelectMenu);

  const [isTerminal, setIsTerminal] = useState(false);
  const [terminalCount, setIsTerminalCount] = useState([1]);

  const { handleStep,  } = useContext(OnboardingContext);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isError.error) {
      console.log('error');
      setIsError((prev) => {
        return {
          ...prev,
          message: 'Field cannot be empty',
        };
      });
      return;
    } else {
      handleStep('personalInfo');
    }
  };

  const addTerminal = (_: MouseEvent<HTMLButtonElement>) => {
    setIsTerminalCount((prev) => [...prev, prev.length + 1]);
  };

  const selectItemHandler = (_: MouseEvent, item: Port) => {
    setSelectedItem(item);
    setToggleSelectMenu(false);
    setShowNext(true);
  };

  useEffect(() => {
    if (selectedItem) {
      const data = {
        target: {
          name: 'port',
          value: selectedItem,
        },
      } as ChangeEvent<HTMLInputElement>;


      dispatch(
        updatePortsAndTerminalInfo({
          ...userState.onboardingInputs.portsAndTerminal,
          port: selectedItem,
        })
      );

      
    }
  }, [selectedItem]);

  return (
    <>
      <Header
        title="Ports and Terminals"
        subTitle="Enter your ports and terminals details"
        onboarding
      />

      <div
        className="grid gap-16 h-[85vh] overflow-y-scroll"
        style={{
          gridTemplateRows: 'max-content 1fr',
        }}
      >
        <div className="flex gap-2">
          <img src="/icons/admin/barFilled.svg" alt="" />
          <img src="/icons/admin/barFilled.svg" alt="" />
          <img src="/icons/admin/barEmpty.svg" alt="" />
        </div>

        <form className="grid gap-10" onSubmit={handleFormSubmit}>
          <div>
            <div className="grid gap-10 mt-4 ">
              <div className="grid gap-4 w-[33rem] items-center">
                <label className="text-[1.4rem] text-color-dark-1">
                  Choose Port
                </label>
                <div className="relative flex items-center w-[33rem] justify-items-start cursor-pointer">
                  <p
                    className="border  p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointe text-left"
                    onClick={selectMenuToggler}
                  >
                    {selectedItem ? (
                      selectedItem
                    ) : (
                      <span className="text-gray-400">Select Port</span>
                    )}
                  </p>

                  {toggleSelectMenu && (
                    <div className="absolute top-[5rem]  left-0 border w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize">
                      {port.map((item, index) => (
                        <p
                          className="text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer text-left"
                          key={index}
                          onClick={(e) => selectItemHandler(e, item)}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  )}
                  {toggleSelectMenu ? (
                    <GrUp className="absolute right-4 text-[1.3rem]" />
                  ) : (
                    <GrDown className="absolute right-4 text-[1.3rem]" />
                  )}
                </div>
              </div>

              {terminalCount.map((_, index) => {
                return (
                  showNext && (
                    <Terminal
                      isTerminal={isTerminal}
                      setIsTerminal={setIsTerminal}
                      terminalCount={terminalCount}
                      setIsError={setIsError}
                      isError={isError}
                      key={index}
                      id={index}
                      setup={setup}
                    />
                  )
                );
              })}

              <button
                type="button"
                className="flex self-start items-center justify-self-start gap-4 mt-10 disabled:text-color-grey-4 disabled:cursor-not-allowed"
                onClick={addTerminal}
                disabled={!isTerminal}
              >
                <img
                  src="/icons/admin/add-circle.svg"
                  alt=""
                  className="w-[2.5rem]"
                />
                <span className="text-[1.4rem] ">Add terminal</span>
              </button>
            </div>
          </div>

          <button
            className="text-[1.6rem] bg-color-primary px-10 py-6 justify-self-end w-[28rem] rounded-lg text-color-white uppercase font-semibold mt-auto disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={!isTerminal}
            onClick={handleFormSubmit}
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default PortAndTerminals;
