import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import Header from '../../components/dashboard/Header';
import { getPhotoUrl } from '../../utils/getPhotoUrl';

const onboarding = () => {
  const [cacUploadUrl, setCacUploadUrl] = useState<string>(null as any);
  const [licenseUploadUrl, setLicenseUploadUrl] = useState<string>(null as any);
  const [imageSize, setImageSize] = useState<{
    cac: string;
    license: string;
  }>(null as any);

  const cacUploadHandler = (
    e: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    const fileObj = e.target as HTMLInputElement;

    const { name } = fileObj.files![0];
    const path = fileObj.files![0];

    const size = path.size / 1000;

    const KBSize = size.toString().split('.')[0];

    console.log(KBSize, KBSize.length);

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

    setCacUploadUrl(name);
  };

  const licenseUploadHandler = (
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
      console.log('KB');
      setImageSize((prev) => ({
        ...prev,
        cac: `${KBSize}KB`,
      }));
    }

    setLicenseUploadUrl(name);
  };

  return (
    <>
      <Header
        title="Business Information"
        subTitle="Enter your business details"
      />

      <div className="grid gap-16">
        <div className="flex gap-2">
          <img src="/icons/admin/barFilled.svg" alt="" />
          <img src="/icons/admin/barEmpty.svg" alt="" />
          <img src="/icons/admin/barEmpty.svg" alt="" />
        </div>

        <div className="grid gap-10">
          <figure className="flex gap-8 items-center">
            <img src="/icons/admin/bag.svg" alt="" />
            <figcaption>
              <p className="text-[1.6rem] text-color-primary uppercase">
                Upload Logo
              </p>
            </figcaption>
          </figure>

          <div className="grid grid-cols-2 gap-4 items-center justify-between">
            <label
              htmlFor="cacUpload"
              className="flex border border-color-purple-light rounded-lg py-8 px-10 items-center gap-6 cursor-pointer"
            >
              <img src="/icons/admin/upload.svg" alt="" />
              {cacUploadUrl ? (
                <p>{cacUploadUrl}</p>
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
              className="flex border border-color-purple-light rounded-lg py-8 px-10 items-center gap-6 cursor-pointer"
            >
              <img src="/icons/admin/upload.svg" alt="" />
              {licenseUploadUrl ? (
                <p>{licenseUploadUrl}</p>
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
        </div>
      </div>
    </>
  );
};

export default onboarding;
