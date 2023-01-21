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
  const [logoUrl, setLogoUrl] = useState('/icons/admin/bag.svg');

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
  };

  const logoUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const getUrl = await getPhotoUrl(`#photoUpload`);
    setLogoUrl(getUrl);
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
            <label htmlFor="logoUpload">
              <img src={logoUrl} alt="" className="object-contain" />
              <input
                type="file"
                id="logoUpload"
                accept="image/*"
                className="hidden"
                onChange={logoUploadHandler}
              />
              <p className="text-[1.6rem] text-color-primary uppercase">
                Upload Logo
              </p>
            </label>
          </figure>

          <div className="grid grid-cols-2 gap-4 items-center justify-between">
            <label
              htmlFor="cacUpload"
              className="flex border border-color-purple-light rounded-lg py-8 px-10 items-center gap-6 cursor-pointer h-[9rem]"
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
              className="flex border border-color-purple-light rounded-lg py-8 px-10 items-center gap-6 cursor-pointer h-[9rem]"
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
        </div>
      </div>
    </>
  );
};

export default onboarding;
