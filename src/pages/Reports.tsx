import Header from '../components/dashboard/Header';
import {
  ChangeEvent,
  Fragment,
  useEffect,
  useState,
  createContext,
  useContext,
} from 'react';
import SelectDropDown from '../components/utils/SelectDropDown';
import { GrClose } from 'react-icons/gr';

import DeliveryPath, {
  DeliveryData,
  DeliveryFilterBy,
  DELIVERY_DATA,
} from '../container/delivery/DeliveryPath';
import {
  PickupData,
  PickupFilterBy,
  PickupPath,
  PICKUP_DATA,
} from '../container/delivery/PickupPath';
import DeliveryHistory from '../container/delivery/deliveryHistory';
import { AgentOrderDetailContext } from '../container/order/AgentOrderDetail/AgentOrderDetail';

export type OrderHistoryPath = {
  path: 'list' | 'detail';
  id?: number | null;
};

export type DialogType = 'orderHistory' | 'eachOrder' | 'pickup';

export type SortBy = 'Most Recent' | 'A-Z';
export type ShowDetails = {
  show: boolean;
  id?: number | null;
};

export interface DropDownState {
  sortBy: boolean;
  filterBy: boolean;
}

export interface DeliveryContext {
  deliveryData: DeliveryData[];
  pickupData: PickupData[];
  openHistoryDialog: boolean;
}

export const DeliveryContext = createContext<DeliveryContext>(null as any);

function Reports() {
  type SwitchPath = 'delivery' | 'pickup';
  const sortBy: SortBy[] = ['Most Recent', 'A-Z'];
  const deliveryFilters: DeliveryFilterBy[] = ['delivered', 'delivery Pending'];

  const pickupFilters: PickupFilterBy[] = ['picked up', 'pick up pending'];

  const [deliveryFilteredBy, setDeliveryFilteredBy] = useState('');
  const [pickupFilteredBy, setPickupFilteredBy] = useState('');
  const [selectedSort, setSelectedSort] = useState<SortBy | string>(
    'Most Recent'
  );
  const [openHistoryDialog, setOpenHistoryDialog] = useState(false);
  const [dropDownState, setDropDownState] = useState<DropDownState>({
    sortBy: false,
    filterBy: false,
  });

  const [currentPath, setCurrentPath] = useState<SwitchPath>('delivery');

  const [search, setSearch] = useState('');

  const [deliveryData, setDeliveryData] = useState<DeliveryData[]>([]);
  const [pickupData, setPickupData] = useState<PickupData[]>([]);

  useEffect(() => {
    setDeliveryData(() => [...DELIVERY_DATA]);
    setPickupData(() => [...PICKUP_DATA]);
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);

    if (currentPath === 'delivery') {
      const filtered = DELIVERY_DATA.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setDeliveryData(filtered);
    } else {
      const filtered = PICKUP_DATA.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setPickupData(filtered);
    }
  };

//   useEffect(() => {
//     if (deliveryFilteredBy && currentPath === 'delivery') {
//       const filtered = DELIVERY_DATA.filter(
//         (item) => item.tag === deliveryFilteredBy
//       );

//       return setDeliveryData(() => [...filtered]);
//     }

//     if (pickupFilteredBy && currentPath === 'pickup') {
//       const filtered = PICKUP_DATA.filter(
//         (item) => item.tag.toLowerCase() === pickupFilteredBy.toLowerCase()
//       );

//       return setPickupData(() => [...filtered]);
//     }
//   }, [deliveryFilteredBy, pickupFilteredBy]);

//   useEffect(() => {
//     if (selectedSort) {
//       if ((selectedSort as SortBy) === 'A-Z') {
//         const sortedNames = [...DELIVERY_DATA].sort((a, b) => {
//           return a.name.localeCompare(b.name);
//         });

//         return setDeliveryData(() => [...sortedNames]);
//       } else if ((selectedSort as SortBy) === 'Most Recent') {
//         const sortedDates = [...DELIVERY_DATA].sort((a, b) => {
//           return new Date(a.date).getTime() - new Date(b.date).getTime();
//         });

//         return setDeliveryData(() => [...sortedDates]);
//       }
//     }
//   }, [selectedSort]);

//   const handleClearFilter = (toClear: 'delivery' | 'pickup') => {
//     if (toClear === 'delivery') {
//       setDeliveryFilteredBy('');
//       setDropDownState((prev) => ({ ...prev, filterBy: false }));
//     } else {
//       setPickupFilteredBy('');
//     }
//   };



  return (
    <>
      <Header title="Reports" />

      <main className="text-[1.6rem]">
        <section className="relative flex items-center w-[45rem] mx-auto">
          <input
            type="text"
            className=" border border-gray-300 py-6 pr-3 pl-[4rem] outline-none w-full rounded-3xl"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />

          <img
            src="/icons/search-normal.svg"
            alt=""
            className="absolute left-6 text-[1.8rem]"
          />
        </section>

        <section>
          <div className="flex justify-between items-center mt-10">
            <div
              className="flex items-center bg-gray-100 border border-gray-300 py-3 px-8 rounded-xl gap-4 justify-center cursor-pointer w-[15rem]"
              onClick={() => setOpenHistoryDialog(true)}
            >
              <img
                src="/icons/history.svg"
                alt=""
                className="w-[1.6rem] h-[1.6rem]"
              />
              <p>March</p>
            </div>
            <div className="flex items-center gap-8">
              <button className="btn text-color-purple bg-color-red-light-1 border border-color-red-light-3 flex items-center gap-4 rounded-2xl">
                <img
                  src="/icons/send-square.svg"
                  alt=""
                  className="w-[2rem] h-[2rem]"
                />
                <span>Download</span>
              </button>
              <button className="btn text-green-600 bg-green-100 border border-[#ADD9BD] items-center gap-4 rounded-2xl flex">
                <img
                  src="/icons/send-2.svg"
                  alt=""
                  className="w-[2rem] h-[2rem]"
                />
                <span>Share</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Reports;
