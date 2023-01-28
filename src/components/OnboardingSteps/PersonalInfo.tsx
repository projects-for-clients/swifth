import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import Header from '../../components/dashboard/Header';
import { getPhotoUri } from '../../utils/getPhotoUri';

const PersonalInfo = () => {
  const [cacUploadUrl, setCacUploadUrl] = useState<string>(null as any);
  const [licenseUploadUrl, setLicenseUploadUrl] = useState<string>(null as any);
  const [imageSize, setImageSize] = useState<{
    cac: string;
    license: string;
  }>(null as any);
  const [showCalendarIcon, setShowCalendarIcon] = useState(true);

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

        <form className="grid gap-10 " onSubmit={handleFormSubmit}>
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
                  <p>Upload ID card</p>
                )}
                <input
                  type="file"
                  name="cacUpload"
                  id="cacUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => cacUploadHandler(e, 'cacUpload')}
                />
              </label>
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
                  <p>Upload Proof of Address</p>
                )}
                <input
                  type="file"
                  name="licenseUpload"
                  id="licenseUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => licenseUploadHandler(e, 'licenseUpload')}
                />
              </label>
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
          <button className="text-[1.6rem] bg-color-primary px-10 py-6 justify-self-end w-[28rem] rounded-lg text-color-white uppercase font-semibold self-center">
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default PersonalInfo;
