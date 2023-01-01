import React from 'react';

type THeader = {
    title: string
    subTitle: string
}

function Header({title, subTitle}: THeader) {
  return (
    <div className="header">
      <div className="header__left">

      </div>
      <div className="header__right"></div>
    </div>
  );
}

export default Header;
