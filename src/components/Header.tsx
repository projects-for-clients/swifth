export default () => {
  return (
    <div className="header">
      <div className="header__left">
        <img src="/logo.svg" alt="" width={28} height={28} />
        <h3 className="header__left--logoText">Swifth</h3>
      </div>
      <div className="header__right">
        <button className="btn header__right--btn">
            Log In
        </button>
      </div>
    </div>
  );
};
