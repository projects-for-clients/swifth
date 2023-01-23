import { useContext } from "react";
import { OnboardingContext } from "../../Context/AppContext";


const inputChange = () => {
    const {onboardingInputs: {
        businessInfo: {
            businessName
        }
    }, handleInputChange} = useContext(OnboardingContext)

  return (
    <div>
      <input
        type="text"
        placeholder="enter"
        className="border py-8 px-4"
        value={businessName}
        onChange={handleInputChange}
        name="businessName"
      />
    </div>
  );
}


export default inputChange