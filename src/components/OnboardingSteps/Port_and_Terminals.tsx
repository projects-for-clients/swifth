import React, { useContext } from 'react';
import {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { GrDown, GrUp } from 'react-icons/gr';
import Header from '../../components/dashboard/Header';
import { OnboardingContext } from '../../Context/AppContext';
import { getPhotoUri } from '../../utils/getPhotoUri';

interface ITerminal {
  isTerminal: boolean;
  setIsTerminal: (value: boolean) => void;
}

type Terminal = 'Terminal 1' | 'Terminal 2' | 'Terminal 3';

const Terminal: FC<ITerminal> = ({ isTerminal, setIsTerminal }) => {
  const [formCUpload, setFormCUpload] = useState<string>(null as any);
  const [imageSize, setImageSize] = useState<{
    cac: string;
    license: string;
  }>(null as any);
  const [showCalendarIcon, setShowCalendarIcon] = useState(true);

  const terminal: Terminal[] = ['Terminal 1', 'Terminal 2', 'Terminal 3'];
  const [selectedItem, setSelectedItem] = useState<Terminal | null>(null)
  const [toggleSelectMenu, setToggleSelectMenu] = useState(false);

  const selectMenuToggler = () => setToggleSelectMenu(!toggleSelectMenu);

  const handleSelectedItem = (item: Terminal) => {
    setSelectedItem(item);
    setToggleSelectMenu(false);
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

    setFormCUpload(name);
  };
  const handleSelectChange = () => {
    console.log('changed select');
    setIsTerminal(true);
  };

  return (
    <section
      className="grid gap-8 items-center"
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
      }}
    >
      <div className={`grid gap-4 ${isTerminal ? 'w-full' : 'w-[33rem]'}`}>
        <label className="text-[1.4rem] text-color-dark-1">
          Choose Terminal
        </label>
        <div className="relative flex items-center w-[33rem] justify-items-start cursor-pointer">
          <p
            className="border border-color-primary-light p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointe text-left"
            onClick={selectMenuToggler}
          >
            {selectedItem ? (
              selectedItem
            ) : (
              <span className="text-gray-400">Select Terminal</span>
            )}{' '}
          </p>

          {toggleSelectMenu && (
            <div className="absolute top-[5rem]  left-0 border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize">
              {terminal.map((item, index) => (
                <p
                  className="text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer text-left"
                  key={index}
                  onClick={() => handleSelectedItem(item)}
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
          <div className="flex items-center w-full">
            <label
              htmlFor="cacUpload"
              className="flex border border-color-purple-light rounded-lg py-8 px-10 items-center gap-6 cursor-pointer text-[1.4rem] w-full h-full"
            >
              <img src="/icons/admin/upload.svg" alt="" />
              {formCUpload ? (
                <div className="grid">
                  <p className="text-[1.4rem] font-normal">{formCUpload}</p>
                  <p className="text-color-grey-4 text-[1rem]">
                    {imageSize.cac}
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
              name="cacUpload"
              id="cacUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) => formCUploadHandler(e, 'cacUpload')}
            />
          </div>

          <div className="grid gap-4  w-full">
            <label className="text-[1.4rem]">
              Input expiration date for each form C-30{' '}
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
        </>
      )}
    </section>
  );
};

type Port = 'Lagos' | 'Onitsha';

const PortAndTerminals = () => {
  const port: Port[] = ['Lagos', 'Onitsha'];
  const [selectedItem, setSelectedItem] = useState<Port | null>(null);
  const [toggleSelectMenu, setToggleSelectMenu] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const selectMenuToggler = () => setToggleSelectMenu(!toggleSelectMenu);

  const { handleStep } = useContext(OnboardingContext);

  const [isTerminal, setIsTerminal] = useState(false);
  const [terminalCount, setIsTerminalCount] = useState([1]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleStep('personalInfo');
  };

  const addTerminal = (_: MouseEvent<HTMLButtonElement>) => {
    setIsTerminalCount((prev) => [...prev, prev.length + 1]);
  };

  const selectItemHandler = (_: MouseEvent, item: Port) => {
    setSelectedItem(item);
    setToggleSelectMenu(false);
    setShowNext(true)
  };

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
                         key={index}
                       />
                     )
                   );

                  })}

                
              <button
                type="button"
                className="flex self-start items-center gap-4 mt-10 disabled:text-color-grey-4 disabled:cursor-not-allowed"
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

          <button className="text-[1.6rem] bg-color-primary px-10 py-6 justify-self-end w-[28rem] rounded-lg text-color-white uppercase font-semibold mt-auto">
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default PortAndTerminals;
