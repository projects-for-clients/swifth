import SocialLogin from 'react-social-login';
import React, { useRef } from 'react';

interface ISocialButtons {
  children: React.ReactNode;
  triggerLogin: () => void;
}

const SocialButtons: React.FC<ISocialButtons> = ({ children }) => {
  return <div>{children}</div>;
};

export default SocialLogin(SocialButtons);
