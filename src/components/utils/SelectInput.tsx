import React, { FC, useState } from 'react';
import { GrUp, GrDown } from 'react-icons/gr';


interface ISelectInput {
    items: string[]
    placeholder: string
    label: string
}

const SelectInput:FC<ISelectInput> = ({items, placeholder, label}) => {


  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [toggleSortMenu, setToggleSortMenu] = useState(false);

  const sortMenuToggler = () => setToggleSortMenu(!toggleSortMenu);

  const handleSelectedSort = (item: typeof selectedSort) => {
    setSelectedSort(item);
    setToggleSortMenu(false);
  };

  return (
    <div className="grid gap-4 w-[33rem] items-center">
      <label className="text-[1.4rem] text-color-dark-1">{label}</label>
      <div className="relative flex items-center w-[33rem] justify-items-start cursor-pointer">
        {selectedSort ? (
          <p
            className="border border-color-primary-light p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointe text-left"
            onClick={sortMenuToggler}
          >
            {selectedSort}
          </p>
        ) : (
          <p
            className="border border-color-primary-light p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointe text-left"
            onClick={sortMenuToggler}
          >
            {placeholder}
          </p>
        )}

        {toggleSortMenu && (
          <div className="absolute top-[5rem]  left-0 border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize">
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
