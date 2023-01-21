import { MouseEvent, useEffect, useReducer, useState } from 'react';
import Header from '../../components/dashboard/Header';
import { getPhotoUrl } from '../../utils/getPhotoUrl';

const onboarding = () => {
  interface PhotoUrl {
    cacUploadUrl?: string;
    licenseUploadUrl?: string;
  }

  const [photoUrl, setPhotoUrl] = useReducer(
    (prev: PhotoUrl, next: PhotoUrl): PhotoUrl => {
      return {
        ...prev,
        ...next,
      };
    },
    {
      cacUploadUrl: '',
      licenseUploadUrl: '',
    }
  );

  
  const uploadPhotoHandler = async (
    file: MouseEvent<HTMLInputElement>,
    value: string,
    type: 'cac' | 'license'
  ) => {

    console.log('e', e.target.files);
    let getCacUploadUrl = '';
    let getLicenseUploadUrl = '';

    if (type === 'cac') {
      getCacUploadUrl = await getPhotoUrl(value);
    } else {
      getLicenseUploadUrl = await getPhotoUrl(value);
    }

    console.log(getCacUploadUrl, getLicenseUploadUrl);

    setPhotoUrl({
      cacUploadUrl: getCacUploadUrl ?? '',
      licenseUploadUrl: getLicenseUploadUrl ?? '',
    });
  };

  useEffect(() => {
    console.log({photoUrl});
  }, [photoUrl.cacUploadUrl, photoUrl.licenseUploadUrl]);
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
              <p>Upload CAC Certificate</p>
            </label>
            <input
              type="file"
              name="cacUpload"
              id="cacUpload"
              accept="image/*"
              // className="hidden"
              onClick={(e) => uploadPhotoHandler(e, 'cacUpload', 'cac')}
            />
            <label
              htmlFor="licenseUpload"
              className="flex border border-color-purple-light rounded-lg py-8 px-10 items-center gap-6 cursor-pointer"
            >
              <img src="/icons/admin/upload.svg" alt="" />
              <p>Upload Custom License (yearly)</p>
            </label>
            <input
              type="file"
              name="licenseUpload"
              id="licenseUpload"
              accept="image/*"
              className="hidden"
              onClick={(e) => uploadPhotoHandler(e, 'licenseUpload', 'license')}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default onboarding;
