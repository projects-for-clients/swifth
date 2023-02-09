import { Dispatch, useState, SetStateAction } from 'react'
import { GrUp, GrDown } from 'react-icons/gr';

interface ISelectDropDown {
    selectFrom: string[];
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
}

const SelectDropDown = () => {
    const sortBy = ['A-Z', 'date'];

    const [toggleSortMenu, setToggleSortMenu] = useState(false);

    const [selectedSort, setSelectedSort] = useState('');

    const sortMenuToggler = () => setToggleSortMenu(!toggleSortMenu);

    const handleSelectedSort = (item: any) => {
      setSelectedSort(item);
      setToggleSortMenu(false);
    }
    
  return (
    <div className="relative flex items-center w-[20rem] justify-items-start cursor-pointer">
      <p
        className="border border-color-primary-light p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointe text-left"
        onClick={sortMenuToggler}
      >
        {selectedSort || 'Today'}
      </p>

      {toggleSortMenu && (
        <div className="absolute top-[5rem]  left-0 border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize">
          {sortBy.map((item, index) => (
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
  );
}

export default SelectDropDown