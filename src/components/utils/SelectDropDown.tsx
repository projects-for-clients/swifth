import { Dispatch, useState, SetStateAction, FC } from 'react';
import { GrUp, GrDown } from 'react-icons/gr';
import { DropDownState, SortBy } from '../../container/dashboard/orders';

interface ISelectDropDown {
  selectFrom: string[];
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<SortBy | string>>;
  label?: string;
  isFilter?: boolean;
  setDropDownState?: Dispatch<SetStateAction<DropDownState>>;
  dropDownState?: DropDownState
}

const SelectDropDown: FC<ISelectDropDown> = (props) => {
  const { selectFrom, selectedItem, setSelectedItem, label, isFilter, setDropDownState, dropDownState } = props;
  const [toggleSortMenu, setToggleSortMenu] = useState(false);

  const sortMenuToggler = () => {
    setToggleSortMenu(!toggleSortMenu);

   
  };

  const handleSelectedItem = (item: string) => {
    setSelectedItem(item);
    setToggleSortMenu(false);
  };

  return (
    <div className="relative flex items-center  justify-items-start cursor-pointer">
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
            {selectedItem}
          </p>
        </div>
      ) : (
        <p
          className=" bg-gray-100 border border-gray-300 p-4 rounded-xl text-[1.6rem] cursor-pointer text-left w-[16rem]"
          onClick={sortMenuToggler}
        >
          {selectedItem || label}
        </p>
      )}

      {toggleSortMenu && (
        <div className="absolute top-[6rem] w-[16rem] right-0  bg-white border border-gray-300 rounded-xl grid gap-2 shadow z-20 capitalize">
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
