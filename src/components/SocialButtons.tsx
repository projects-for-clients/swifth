import React, { useRef } from 'react';

interface ISocialButtons {
  children: React.ReactNode;
}

const SocialButtons: React.FC<{}> = () => {
  return (
    <div>
      <button>Continue with Email</button>
      <button>Continue with Google</button>
      <button>Continue with Facebook</button>
    </div>
  );
};

export default SocialButtons;
