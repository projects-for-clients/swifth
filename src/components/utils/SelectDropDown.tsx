import { Dispatch, useState, SetStateAction, FC } from 'react';
import { GrUp, GrDown } from 'react-icons/gr';

interface ISelectDropDown {
  selectFrom: string[];
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
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
    <div className="relative flex items-center w-[15rem] justify-items-start cursor-pointer">
      {isFilter ? (
        <div>
          <img
            src="/icons/filter.svg"
            alt=""
            className="cursor-pointer"
            onClick={sortMenuToggler}
          />
          <p
            className=" bg-gray-100 border border-gray-300 p-4 outline-none rounded-xl w-full text-[1.6rem] cursor-pointer text-left"
            onClick={sortMenuToggler}
          >
            {selectedItem || label}
          </p>
        </div>
      ) : (
        <p
          className=" bg-gray-100 border border-gray-300 p-4 outline-none rounded-xl w-full text-[1.6rem] cursor-pointer text-left"
          onClick={sortMenuToggler}
        >
          {selectedItem || label}
        </p>
      )}

      {toggleSortMenu && (
        <div className="absolute top-[6rem] w-[15rem] left-0  bg-white border border-gray-300 rounded-xl grid gap-2 shadow z-20 capitalize">
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
