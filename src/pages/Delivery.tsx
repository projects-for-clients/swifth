import Header from '../components/dashboard/Header';
import {
  ChangeEvent,
  Fragment,
  useEffect,
  useState,
  useRef,
  createContext,
} from 'react';
import SelectDropDown from '../components/utils/SelectDropDown';
import { GrClose } from 'react-icons/gr';

import {
  ListOrderHistory,
  OrderHistoryDetail,
} from '../container/order/OrderHistory';
import {
  DeliveryData,
  DeliveryFilterBy,
  DeliveryPath,
  DELIVERY_DATA,
} from '../container/delivery/DeliveryPath';
import {
  PickupData,
  PickupPath,
  PICKUP_DATA,
} from '../container/delivery/PickupPath';
import DialogDetails from '../container/delivery/DialogDetails';

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

type PickupFilterBy = 'Picked Up' | 'Pick Up pending';

export interface DropDownState {
  sortBy: boolean;
  filterBy: boolean;
}

export interface DeliveryContext {
  openDeliveryDetail: (item: DeliveryData) => void;
  openPickupDetail: (item: PickupData) => void;
  deliveryData: DeliveryData[];
  pickupData: PickupData[];
}

export const DeliveryContext = createContext<DeliveryContext>(null as any);

function Delivery() {
  type SwitchPath = 'delivery' | 'pickup';
  const sortBy: SortBy[] = ['Most Recent', 'A-Z'];
  const deliveryFilters: DeliveryFilterBy[] = ['delivered', 'delivery Pending'];

  const pickupFilters: PickupFilterBy[] = ['Picked Up', 'Pick Up pending'];

  const [deliveryFilteredBy, setDeliveryFilteredBy] = useState('');
  const [pickupFilteredBy, setPickupFilteredBy] = useState('');
  const [selectedSort, setSelectedSort] = useState<SortBy | string>(
    'Most Recent'
  );
  const [dropDownState, setDropDownState] = useState<DropDownState>({
    sortBy: false,
    filterBy: false,
  });

  const [currentPath, setCurrentPath] = useState<SwitchPath>('delivery');
  const [orderHistoryPath, setOrderHistoryPath] = useState<OrderHistoryPath>({
    path: 'list',
  });
  const [search, setSearch] = useState('');

  const [deliveryData, setDeliveryData] = useState<DeliveryData[]>([]);
  const [pickupData, setPickupData] = useState<PickupData[]>([]);
  const [pickupDetail, setPickupDetail] = useState<PickupData | null>(null);
  const [DeliveryDetail, setDeliveryDetail] = useState<DeliveryData>(
    null as any
  );

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

  useEffect(() => {
    if (deliveryFilteredBy && currentPath === 'delivery') {
      const filtered = DELIVERY_DATA.filter(
        (item) => item.tag === deliveryFilteredBy
      );

      return setDeliveryData(() => [...filtered]);
    }

    if (pickupFilteredBy && currentPath === 'pickup') {
      const filtered = PICKUP_DATA.filter(
        (item) => item.tag === pickupFilteredBy
      );

      return setPickupData(() => [...filtered]);
    }
  }, [deliveryFilteredBy, pickupFilteredBy]);

  useEffect(() => {
    if (selectedSort) {
      console.log({ selectedSort });
      if ((selectedSort as SortBy) === 'A-Z') {
        const sortedNames = [...DELIVERY_DATA].sort((a, b) => {
          return a.name.localeCompare(b.name);
        });

        return setDeliveryData(() => [...sortedNames]);
      } else if ((selectedSort as SortBy) === 'Most Recent') {
        const sortedDates = [...DELIVERY_DATA].sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        return setDeliveryData(() => [...sortedDates]);
      }
    }
  }, [selectedSort]);

  const handleClearFilter = (toClear: 'delivery' | 'pickup') => {
    if (toClear === 'delivery') {
      setDeliveryFilteredBy('');
      setDropDownState((prev) => ({ ...prev, filterBy: false }));
    } else {
      setPickupFilteredBy('');
    }
  };

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const dialogDetailRef = useRef<HTMLDialogElement | null>(null);

  const pickupDialogRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseDialog = (type: DialogType): void => {
    if (type === 'orderHistory' && dialogRef.current) {
      dialogRef.current.close();
    }

    if (type === 'eachOrder' && dialogDetailRef.current) {
      dialogDetailRef.current.close();
    }

    if (type === 'pickup' && pickupDialogRef.current) {
      pickupDialogRef.current.close();
    }
  };
  const handleOpenDialog = (type: DialogType) => {
    if (type === 'orderHistory' && dialogRef.current) {
      dialogRef.current.showModal();
    }

    if (type === 'eachOrder' && dialogDetailRef.current) {
      dialogDetailRef.current.showModal();
    }

    if (type === 'pickup' && pickupDialogRef.current) {
      pickupDialogRef.current.showModal();
    }
  };

  const openDeliveryDetail = (item: DeliveryData) => {
    setDeliveryDetail(item);
    handleOpenDialog('eachOrder');
  };

  const openPickupDetail = (item: PickupData) => {
    setPickupDetail(item);
    handleOpenDialog('eachOrder');
  };

  const orderHistoryPaths: Record<string, JSX.Element> = {
    list: <ListOrderHistory setOrderHistoryPath={setOrderHistoryPath} />,
    detail: <OrderHistoryDetail setOrderHistoryPath={setOrderHistoryPath} />,
  };

  const pathToSwitch: Record<SwitchPath, JSX.Element> = {
    delivery: <DeliveryPath />,
    pickup: <PickupPath />,
  };

  return (
    <DeliveryContext.Provider
      value={{
        openDeliveryDetail,
        openPickupDetail,
        pickupData,
        deliveryData,
      }}
    >
      <Header title="Delivery" />

      <dialog className="dialog relative text-[1.6rem]" ref={dialogDetailRef}>
        <div className="bg-white fixed right-0 h-[100vh] py-4 px-12">
          <input type="text" className="absolute top-0 w-0" />
          <figure className="flex justify-end">
            <img
              src="/icons/close.svg"
              alt=""
              className="w-[3rem] cursor-pointer"
              onClick={() => handleCloseDialog('eachOrder')}
            />
          </figure>

          <section className="h-full">
            <DialogDetails />
          </section>
        </div>
      </dialog>
      <dialog className="dialog relative text-[1.6rem]" ref={dialogRef}>
        <div className="bg-white fixed right-0 h-[100vh] w-[50rem] py-4 px-12">
          <input type="text" className="absolute top-0 w-0" />
          <figure className="flex justify-end">
            <img
              src="/icons/close.svg"
              alt=""
              className="w-[3rem] cursor-pointer"
              onClick={() => handleCloseDialog('orderHistory')}
            />
          </figure>

          <section className="h-full">
            <h3 className="text-[2.4rem] mb-10">Order history</h3>
            {orderHistoryPaths[orderHistoryPath.path]}
          </section>
        </div>
      </dialog>
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
          <div className="radioBox gap-16">
            <input
              type="radio"
              name="delivery"
              id="delivery"
              className="hidden"
              onChange={() => setCurrentPath('delivery')}
              checked={currentPath === 'delivery'}
            />
            <label htmlFor="delivery" className="capitalize text-[1.8rem]">
              Delivery
            </label>

            <input
              type="radio"
              name="delivery"
              id="pickup"
              className="hidden"
              checked={currentPath === 'pickup'}
              onChange={() => setCurrentPath('pickup')}
            />
            <label htmlFor="pickup" className="capitalize text-[1.8rem]">
              Pickup
            </label>
          </div>

          {(currentPath === 'delivery' && deliveryData.length < 1) ||
          (currentPath === 'pickup' && pickupData.length < 1) ? (
            <div className="grid place-content-center h-[70vh] text-center">
              <p>Nothing to Show here</p>
              <p className="text-gray-500 text-[1.4rem] max-w-[35rem]">
                {currentPath === 'delivery' ? (
                  <span>Delivery initiated would appear here</span>
                ) : (
                  <span>Pickup initiated would appear here</span>
                )}
              </p>
            </div>
          ) : (
            <Fragment>
              <div className="flex justify-between items-center mt-10">
                <div
                  className="flex items-center bg-gray-100 border border-gray-300 py-3 px-8 rounded-xl gap-4 justify-center cursor-pointer w-[15rem]"
                  onClick={() => handleOpenDialog('orderHistory')}
                >
                  <img
                    src="/icons/history.svg"
                    alt=""
                    className="w-[1.6rem] h-[1.6rem]"
                  />
                  <p>History</p>
                </div>
                <div className="flex items-center gap-8">
                  <>
                    <SelectDropDown
                      selectFrom={sortBy}
                      selectedItem={selectedSort}
                      setSelectedItem={setSelectedSort}
                      label={'sortBy'}
                      setDropDownState={setDropDownState}
                      dropDownState={dropDownState}
                    />
                    <SelectDropDown
                      selectFrom={currentPath === 'delivery' ? DeliveryFilters : pickupFilters}
                      selectedItem={currentPath === 'delivery' ? deliveryFilteredBy : pickupFilteredBy}
                      setSelectedItem={setDeliveryFilteredBy}
                      isFilter
                      label={'filterBy'}
                      setDropDownState={setDropDownState}
                      dropDownState={dropDownState}
                    />
                    {deliveryFilteredBy && (
                      <GrClose
                        className="text-[1.4rem] cursor-pointer"
                        onClick={() => handleClearFilter('delivery')}
                      />
                    )}
                  </>
                </div>
              </div>
              <>{pathToSwitch[currentPath]}</>
            </Fragment>
          )}
        </section>
      </main>
    </DeliveryContext.Provider>
  );
}

export default Delivery;
