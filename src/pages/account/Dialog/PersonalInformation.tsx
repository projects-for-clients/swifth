import { useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import PersonalInfo from '../../../components/OnboardingSteps/PersonalInfo';

function PersonalInformation() {
  const [step, setStep] = useState(1);
  const name = 'Ben Davis';
  let initials = name.split(' ').map((n: string) => n[0]);

  const first = (
    <>
      <div className="grid justify-center">
        <figure className="relative grid place-content-center w-[13rem] h-[13rem]">
          <img
            src=""
            alt=""
            className="absolute w-full h-full rounded-full  z-[1]"
          />
          <p className="absolute w-full h-full z-[2] text-[5rem] bg-purple-100 border border-color-purple-light grid place-content-center rounded-full">
            <span>{initials}</span>
          </p>

          <img
            src="/icons/camera.svg"
            alt=""
            className="absolute right-0 z-20 bottom-0 mb-3"
          />
        </figure>

        <div className="text-center mt-10">
          <p className="text-[3rem]">{name}</p>
          <button
            className="btn uppercase border border-color-primary text-color-primary text-center rounded-2xl font-medium"
            onClick={() => setStep(2)}
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid gap-4 font-medium border-t border-t-color-purple-light pt-10 mt-10">
        <p>090238232323</p>
        <p className="lowercase">{name.split(' ').join('')}@gmail.com</p>

        <div className="flex justify-between items-center">
          <p>Contact Person ID card</p>
          <p className="bg-green-100 border border-color-primary rounded-2xl flex items-center gap-4 text-color-primary-dark py-2 px-4">
            <span>
              <IoMdCheckmark />
            </span>
            <span className="text-[1.2rem] font-normal">Verified</span>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p>Proof of Address</p>
          <p className="bg-green-100 border border-color-primary rounded-2xl flex items-center gap-4 text-color-primary-dark py-2 px-4">
            <span>
              <IoMdCheckmark />
            </span>
            <span className="text-[1.2rem] font-normal">Verified</span>
          </p>
        </div>
      </div>
    </>
  );

  const second = <>
  </>;

  const Paths = new Map<number, JSX.Element>([
    [1, first],
    [2, <PersonalInfo setup={true} setStep={setStep}/>],
    // [2, second],
    [3, first],
  ]);

  //console.log({signalValues})

  return (
    <>
      <p className="text-[2rem] mb-16">Personal Information</p>

      {Paths.get(step)}
    </>
  );
}

export default PersonalInformation;
