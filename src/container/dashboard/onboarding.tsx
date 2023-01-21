import Header from "../../components/dashboard/Header";


const onboarding = () => {
  return (
    <>
      <Header title="Business Information" subTitle="Enter your business details" />

      <div>
        <div className="flex gap-2">
          <img src="/icons/admin/barFilled.svg" alt="" />
          <img src="/icons/admin/barEmpty.svg" alt="" />
          <img src="/icons/admin/barEmpty.svg" alt="" />
        </div>

        <div>
          
        </div>
      </div>
    </>
  );
}


export default onboarding