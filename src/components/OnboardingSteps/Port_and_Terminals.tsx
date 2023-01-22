import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
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

  const cacUploadHandler = (
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
            <div className="grid grid-cols-2 gap-4 items-center justify-between">
              {/* <label
              htmlFor="cacUpload"
              className="flex border border-color-purple-light rounded-lg py-8 px-10 items-center gap-6 cursor-pointer h-[7rem]"
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
            /> */}
            </div>

            <div className="grid gap-10 mt-4 max-w-[50rem]">
              <div className="grid gap-4">
                <label className="text-[1.4rem]">Choose Port</label>
                <div className="relative flex items-center">
                  <select
                    placeholder="Enter business name"
                    className=" rounded-lg py-4 px-4 outline-none border-none bg-color-grey-1 w-full cursor-pointer appearance-none text-[1.4rem]"
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

              <div className="grid gap-4">
                <label className="text-[1.4rem]">Choose Terminal</label>
                <div className="relative flex items-center">
                  <select
                    placeholder="Enter business name"
                    className=" rounded-lg py-4 px-4 outline-none border-none text-[1.4rem] bg-color-grey-1 w-full cursor-pointer appearance-none"
                  >
                    <option value="1" hidden className="cursor-pointer py-3 px-4">
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
