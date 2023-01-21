import Header from '../../components/dashboard/Header';

const onboarding = () => {
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

        <div className="grid">
          <figure className="flex gap-8 items-center">
            <img src="/icons/admin/bag.svg" alt="" />
            <figcaption>
              <p className="text-[1.6rem] text-color-primary uppercase">
                Upload Logo
              </p>
            </figcaption>
          </figure>

          <div className="flex gap-4 items-center">
            <div className="flex border border-color-purple-light rounded-lg py-8 px-10 items-center">
              <img src="/icons/admin/upload.svg" alt="" />
              <p>Upload CAC Certificate</p>
            </div>
            <div className="flex border border-color-purple-light rounded-lg py-8 px-10 items-center">
              <img src="/icons/admin/upload.svg" alt="" />
              <p>Upload Custom License (yearly)</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default onboarding;
