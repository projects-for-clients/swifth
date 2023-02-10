import { Dispatch, useState, SetStateAction, FC } from 'react';
import { GrUp, GrDown } from 'react-icons/gr';

interface ISelectDropDown {
  selectFrom: string[];
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<unknown>>;
  label?: string;
  isFilter?: boolean;
}

const SelectDropDown: FC<ISelectDropDown> = ({
  selectFrom,
  selectedItem,
  setSelectedItem,
  label,
  isFilter,
}) => {
  const [toggleSortMenu, setToggleSortMenu] = useState(false);

  const sortMenuToggler = () => setToggleSortMenu(!toggleSortMenu);

  const handleSelectedItem = (item: string) => {
    setSelectedItem(item);
    setToggleSortMenu(false);
  };

  return (
    <div className="relative flex items-center min-w-[16rem] justify-items-start cursor-pointer">
      {isFilter ? (
        <div
          className={`bg-color-purple-light-1 p-4 gap-2 text-[1.6rem] cursor-pointer rounded-xl justify-items-center items-center  ${
            selectedItem ? 'flex w-[16rem]' : 'block'
          }`}
          onClick={sortMenuToggler}
        >
          <>
          <img src="/icons/filter.svg" alt="" className="cursor-pointer" />
          {selectedItem && <span>:</span>}
          </>
          <p className=" whitespace-nowrap text-[1.2rem] text-center w-full text-color-purple-1">
            {selectedItem || label}
          </p>
        </div>
      ) : (
        <p
          className=" bg-gray-100 border border-gray-300 p-4 rounded-xl w-full text-[1.6rem] cursor-pointer text-left"
          onClick={sortMenuToggler}
        >
          {selectedItem || label}
        </p>
      )}

      {toggleSortMenu && (
        <div className="absolute top-[6rem] w-[16rem] left-0  bg-white border border-gray-300 rounded-xl grid gap-2 shadow z-20 capitalize">
          {selectFrom.map((item, index) => (
            <p
              className="text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer text-left"
              key={index}
              onClick={() => handleSelectedItem(item)}
            >
              {item}
            </p>
          ))}
        </div>
      )}

      {!isFilter && (
        <>
          {toggleSortMenu ? (
            <GrUp className="absolute right-4 text-[1.3rem]" />
          ) : (
            <GrDown className="absolute right-4 text-[1.3rem]" />
          )}
        </>
      )}
    </div>
  );
};

export default SelectDropDown;
