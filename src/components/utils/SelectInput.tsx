import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { GrUp, GrDown } from 'react-icons/gr';


interface ISelectInput {
    items: string[]
    placeholder: string
    label: string
    fullWidth?: boolean
    setIsTerminal?: Dispatch<SetStateAction<boolean>>
}

const SelectInput:FC<ISelectInput> = ({items, placeholder, label, setIsTerminal, fullWidth}) => {


  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [toggleSortMenu, setToggleSortMenu] = useState(false);

  const sortMenuToggler = () => setToggleSortMenu(!toggleSortMenu);

  const handleSelectedSort = (item: typeof selectedSort) => {
    setSelectedSort(item);
    setToggleSortMenu(false);
   

    setIsTerminal && setIsTerminal(true)
  };

  return (
    <div className="grid gap-4 min-w-[30rem] items-center">
      <label className="text-[1.4rem] text-color-dark-1">{label}</label>
      <div className="relative flex items-center  justify-items-start cursor-pointer text-black">
        <p
          className="border  p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer text-left"
          onClick={sortMenuToggler}
        >
          {selectedSort ? (
            selectedSort
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </p>

        {toggleSortMenu && (
          <div
            className={`absolute top-[5rem]  left-0 border border-color-primary-light  bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize ${
              fullWidth ? '' : 'w-[10rem]'
            }`}
          >
            {items.map((item, index) => (
              <p
                className="text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer text-left"
                key={index}
                onClick={() => handleSelectedSort(item)}
              >
                {item}
              </p>
            ))}
          </div>
        )}
        {toggleSortMenu ? (
          <GrUp className="absolute right-4 text-[1.3rem]" />
        ) : (
          <GrDown className="absolute right-4 text-[1.3rem]" />
        )}
      </div>
    </div>
  );
};

export default SelectInput;
