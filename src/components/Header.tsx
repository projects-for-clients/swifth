import { useAppDispatch } from '../store/app/hooks';
import { open } from '../store/features/modal';

export default () => {
  const dispatch = useAppDispatch();
  const openModal = () => dispatch(open('login'));
  
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__left">
          <img src="/logo_with_text.svg" alt="" />
          {/* <h3 className="header__left--logoText">Swifth</h3> */}
        </div>
        <div className="header__right">
          <button className="btn header__right--btn" onClick={openModal}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};
