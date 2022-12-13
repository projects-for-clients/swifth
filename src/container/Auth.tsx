import React, { useState } from 'react'
import { GrFormClose } from 'react-icons/gr';
import FirstStep from '../components/AuthSteps/FirstStep';
import SecondStep from '../components/AuthSteps/SecondStep';
import ThirdStep from '../components/AuthSteps/ThirdStep';

function Auth() {
      const [isOpen, setIsOpen] = useState(false);

      const authSteps = () => {
        switch (step) {
          case 0:
            return <FirstStep  />;
          case 1:
            return <SecondStep/>;
          case 2:
            return <ThirdStep />;

          default:
            return 'hello';
        }
      };

  return (<>
    {isOpen && (
        <div className="authDialog relative z-10 " id="authDialog">
          <div
            className="authDialog__container"
            // onSubmit={handleSubmit}
          >
            <button className="authDialog__button" onClick={closeModal}>
              <GrFormClose className="text-3xl " />
            </button>

            {authSteps()}
          </div>
        </div>
      )}
      </>
  )
}

export default Auth