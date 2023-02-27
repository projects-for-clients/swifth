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
  const [selectedSort, setSelectedSort] = useState<string>('All time');
  const [toggleSortMenu, setToggleSortMenu] = useState(false);

  const sortMenuToggler = () => setToggleSortMenu(!toggleSortMenu);

  const handleSelectedSort = (item: typeof selectedSort) => {
    setSelectedSort(item);
    setToggleSortMenu(false);

    setIsTerminal && setIsTerminal(true);
  };

  return (
    <div className={`grid items-center`}>
      <p className="text-color-purple text-[1.4rem]">Your stats for</p>
      <div
        className={`relative items-center flex cursor-pointer text-black`}
        onClick={sortMenuToggler}
      >
        <p
          className={` outline-none rounded-lg w-full text-[1.4rem] cursor-pointer text-left text-color-purple font-semibold `}
        >
          {selectedSort}
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
