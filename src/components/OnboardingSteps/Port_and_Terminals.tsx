import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react';
import { GrDown } from 'react-icons/gr';
import Header from '../../components/dashboard/Header';
import { getPhotoUrl } from '../../utils/getPhotoUrl';

const PersonalInfo = () => {
  const [formCUpload, setFormCUpload] = useState<string>(null as any);
  const [imageSize, setImageSize] = useState<{
    cac: string;
    license: string;
  }>(null as any);
  const [showCalendarIcon, setShowCalendarIcon] = useState(true);
  const [isTerminal, setIsTerminal] = useState(false);

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

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleSelectChange = () => {
    setIsTerminal(true);
  }

  useEffect(() => {
    console.log({isTerminal})
  }, [isTerminal])
  return (
    <>
      <Header
        title="Ports and Terminals"
        subTitle="Enter your ports and terminals details"
      />

      <div
        className="grid gap-16 h-[90%]"
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
                <label className="text-[1.4rem]">Choose Port</label>
                <div className="relative flex items-center">
                  <select
                    placeholder="Enter business name"
                    className=" rounded-lg py-4 px-4 outline-none border-none bg-color-grey-1 w-full cursor-pointer appearance-none text-[1.4rem]"
                    onChange={handleSelectChange}
                  >
                    <option value="1" className="cursor-pointer py-3 px-4">
                      Lagos Port
                    </option>
                    <option value="2" className="cursor-pointer py-3 px-4">
                      Onitsha Port
                    </option>
                    <option value="3" className="cursor-pointer py-3 px-4">
                      PH Port
                    </option>
                  </select>
                  <GrDown className="text-[1.3rem] absolute right-3" />
                </div>
              </div>

              <section
                className="grid gap-8 items-center"
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
                }}
              >
                <div className="grid gap-4 w-full">
                  <label className="text-[1.4rem]">Choose Terminal</label>
                  <div className="relative flex items-center">
                    <select
                      placeholder="Enter business name"
                      className=" rounded-lg py-4 px-4 outline-none border-none text-[1.4rem] bg-color-grey-1 w-full cursor-pointer appearance-none"
                    >
                      <option
                        value="1"
                        hidden
                        className="cursor-pointer py-3 px-4"
                      >
                        Select Terminal
                      </option>
                      <option value="2" className="cursor-pointer py-3 px-4">
                        Onitsha Port
                      </option>
                      <option value="3" className="cursor-pointer py-3 px-4">
                        PH Port
                      </option>
                    </select>
                    <GrDown className="text-[1.3rem] absolute right-3" />
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
                            <p className="text-[1.4rem] font-normal">
                              {formCUpload}
                            </p>
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

              <button
                type="button"
                className="flex self-start items-center gap-4 mt-10"
              >
                <img
                  src="/icons/admin/add-circle.svg"
                  alt=""
                  className="w-[2.5rem]"
                />
                <span className="text-[1.4rem]">Add terminal</span>
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

export default PersonalInfo;
