import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { GrUp, GrDown } from 'react-icons/gr';

interface IAnalyticsInput {
  items: string[];
  placeholder: string;

  setIsTerminal?: Dispatch<SetStateAction<boolean>>;
}

const AnalyticsInput: FC<IAnalyticsInput> = ({
  items,
  placeholder,

  setIsTerminal,
}) => {
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [toggleSortMenu, setToggleSortMenu] = useState(false);

  const sortMenuToggler = () => setToggleSortMenu(!toggleSortMenu);

  const handleSelectedSort = (item: typeof selectedSort) => {
    setSelectedSort(item);
    setToggleSortMenu(false);

    setIsTerminal && setIsTerminal(true);
  };

  return (
    <div className={`grid gap-4 items-center`}>
      <div
        className={`relative ${
          analytics ? 'grid justify-items-center' : 'flex'
        } items-center  justify-items-start cursor-pointer text-black`}
      >
        <span className="text-color-purple">Your stats for</span>
        <p
          className={` p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer text-left`}
          onClick={sortMenuToggler}
        >
          {selectedSort ? (
            selectedSort
          ) : (
            <span className="text-color-purple font-medium">{placeholder}</span>
          )}
        </p>

        {toggleSortMenu && (
          <div
            className={`absolute top-[5rem]  left-0 border border-gray-300 bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize w-[20rem]
            `}
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

export default AnalyticsInput;
