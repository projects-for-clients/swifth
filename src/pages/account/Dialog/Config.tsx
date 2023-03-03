import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';

function Config({
  closeDialog,
  setWidth,
}: {
  closeDialog: () => void;
  setWidth: (item: string) => void;
}) {
  type Steps =
    | 'duty'
    | 'shipping'
    | 'charges'
    | 'dutyCalculation'
    | 'dutyConstant'
    | 'surfaceDuty'
    | 'carModels'
    | 'carTrims'
    | 'carSurfaceDuty'|'shippingItem'|'EditShippingItem'

  type Filter = 'brand' | 'model' | 'trim';
  const filter: Filter[] = ['brand', 'model', 'trim'];

  type CarProp = {
    name?: string;
    trim?: string;
    content?: string
  };

  const shippingContent = [
    { name: 'sedan', content: '120k' },
    { name: 'suv/bus/pick-up', content: '150k' },
    { name: 'truck', content: '180k' },
  ] as CarProp[];

  const shippingItemProps = Array.from({ length: 10 }, (_, i) => ({
    name: 2015 + (i + 1),
    content: `50k x ${i + 1}`,
  }));

  const [step, setStep] = useState<Steps>('duty');
  const [selectedFilter, setSelectedFilter] = useState<Filter>('brand');
  const [selectedCar, setSelectedCar] = useState<CarProp | null>(null);
  const [selectedShippingItem, setSelectedShippingItem] = useState<CarProp | null>(null);

  const toSurfaceDuty = () => {
    setStep('surfaceDuty');
    setWidth('w-[60%]');
  };

  const backToDutyCalculation = () => {
    setStep('dutyCalculation');
    setWidth('w-[50rem]');
  };

  const moveToCarModels = (item: string) => {
    setStep('carModels');
    setSelectedCar((prev) => ({ ...prev, name: item }));
  };

  const moveToCarTrims = (item: string) => {
    setStep('carTrims');
    setSelectedCar((prev) => ({ ...prev, trim: item }));
  };

  const moveToShippingItem = (item: CarProp) => {
    setStep('shippingItem');
    setSelectedShippingItem(item);
  }

  const first = (
    <>
      <p className="text-[2rem] mb-16">Formular Configuration</p>

      <div className="grid gap-8 mt-[5rem]">
        <button
          className="border border-color-purple-light-2 rounded-3xl p-6 text-left "
          onClick={() => setStep('dutyCalculation')}
        >
          <p>Duty Calculation</p>
          <p className="text-[1.4rem] text-gray-500">
            Duty charges configuration
          </p>
        </button>
        <button
          className="border border-color-purple-light-2 rounded-3xl p-6 text-left"
          onClick={() => setStep('shipping')}
        >
          <p>Shipping and Terminal</p>
          <p className="text-[1.4rem] text-gray-500">
            Shipping & Terminal charges configuration
          </p>
        </button>
        <button className="border border-color-purple-light-2 rounded-3xl p-6 text-left ">
          <p>Charges</p>
          <p className="text-[1.4rem] text-gray-500">Charges configuration</p>
        </button>
      </div>
    </>
  );
  const dutyCalculation = (
    <>
      <div className="flex items-center gap-16">
        <BiArrowBack
          className="text-[1.8rem] cursor-pointer"
          onClick={() => setStep('duty')}
        />
        <p className="text-[2rem]">Duty Calculation</p>
      </div>

      <div className="grid gap-8 mt-[5rem]">
        <button
          className="border border-color-purple-light-2 rounded-3xl p-6 text-left flex items-center justify-between"
          onClick={() => setStep('dutyConstant')}
        >
          <p>Surface Duty Constant</p>
          <span>
            <BsArrowRight />
          </span>
        </button>
        <button
          className="border border-color-purple-light-2 rounded-3xl p-6 text-left flex items-center justify-between"
          onClick={toSurfaceDuty}
        >
          <p>Surface Duty </p>
          <span>
            <BsArrowRight />
          </span>
        </button>
      </div>
    </>
  );
  const SurfaceConstant = (
    <>
      <div className="flex items-center gap-16">
        <BiArrowBack
          className="text-[1.8rem] cursor-pointer"
          onClick={() => setStep('dutyCalculation')}
        />
        <p className="text-[2rem]"> Surface Duty Constant</p>
      </div>

      <div className="grid gap-4 mt-[5rem]">
        <label htmlFor="" className=" text-[1.4rem] text-gray-500">
          Duty Constant
        </label>
        <input
          type="text"
          className="bg-gray-100 px-4 py-8 rounded-2xl border-none outline-none"
        />
      </div>

      <button
        className={`text-[1.6rem] bg-color-primary px-10 py-6 justify-self-end  rounded-lg text-color-white uppercase font-semibold self-center disabled:opacity-60 disabled:cursor-not-allowed absolute bottom-0 w-full`}
        onClick={() => closeDialog()}
      >
        Save Changes
      </button>
    </>
  );
  const SurfaceDuty = (
    <>
      <div className="flex items-center gap-16">
        <BiArrowBack
          className="text-[1.8rem] cursor-pointer"
          onClick={backToDutyCalculation}
        />
        <p className="text-[2rem]"> Surface Duty </p>
      </div>

      <div className="grid gap-16 mt-[5rem]">
        <div className="relative flex items-center w-[45rem] mx-auto">
          <input
            type="text"
            className=" border border-gray-300 py-6 pr-3 pl-[4rem] outline-none w-full rounded-3xl"
            placeholder="Search"
          />

          <img
            src="/icons/search-normal.svg"
            alt=""
            className="absolute left-6 text-[1.8rem]"
          />
        </div>

        <div>
          <p className="font-medium mb-5">Most popular</p>
          <div
            className="grid gap-8"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(30rem, 1fr))',
            }}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <p key={i} className="border bg-gray-100 rounded-3xl p-6">
                Lexus LX 570, 2019
              </p>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-10">
          {filter.map((item) => (
            <div key={item}>
              <input
                type="radio"
                name="filter"
                id={item}
                className="hidden"
                onChange={() => setSelectedFilter(item)}
              />
              <label
                htmlFor={item}
                className={`${
                  item === selectedFilter
                    ? 'bg-color-primary text-white border-none'
                    : 'border'
                } rounded-3xl p-4 w-[10rem] cursor-pointer flex justify-center`}
              >
                {`By ${item}`}
              </label>
            </div>
          ))}
        </div>
        <div className="mb-[5rem]">
          <p className="font-medium mb-5">All Brands</p>
          <div
            className="grid gap-8"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(30rem, 1fr))',
            }}
          >
            {Array.from({ length: 20 }, (_, i) => (
              <p
                key={i}
                className="border bg-gray-100 rounded-3xl p-6 cursor-pointer"
                onClick={() => moveToCarModels('Honda')}
              >
                Honda
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
  const carModels = (
    <>
      <div className="flex items-center gap-16">
        <BiArrowBack
          className="text-[1.8rem] cursor-pointer"
          onClick={() => setStep('surfaceDuty')}
        />
        <p className="text-[2rem]"> Surface Duty - {selectedCar?.name} </p>
      </div>

      <div className="mt-[5rem] pb-[5rem]">
        <p className="text-color-purple-1 font-medium text-[2.4rem]">
          {selectedCar?.name}
        </p>

        <div>
          <p className="font-medium mb-10">{selectedCar?.name} Models</p>
          <div
            className="grid gap-8 "
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(30rem, 1fr))',
            }}
          >
            {Array.from({ length: 20 }, (_, i) => (
              <button
                key={i}
                className="border bg-gray-100 rounded-3xl p-6 outline-transparent cursor-pointer"
                onClick={() => moveToCarTrims('XLE 2018')}
              >
                Accord
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
  const carTrims = (
    <>
      <div className="flex items-center gap-16">
        <BiArrowBack
          className="text-[1.8rem] cursor-pointer"
          onClick={() => setStep('carModels')}
        />
        <p className="text-[2rem]"> Surface Duty - {selectedCar?.name} </p>
      </div>

      <div className=" mt-[5rem] pb-[5rem]">
        <p className="text-color-purple-1 font-medium text-[2.4rem]">
          {selectedCar?.name} Accord
        </p>

        <div>
          <p className="font-medium mb-10">
            {selectedCar?.name} Accord Trims & Years
          </p>
          <div
            className="grid gap-8"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(30rem, 1fr))',
            }}
          >
            {Array.from({ length: 20 }, (_, i) => (
              <p
                key={i}
                className="border bg-gray-100 rounded-3xl p-6 cursor-pointer"
                onClick={() => setStep('carSurfaceDuty')}
              >
                {selectedCar?.trim}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
  const carSurfaceDuty = (
    <>
      <div className="flex items-center gap-16">
        <BiArrowBack
          className="text-[1.8rem] cursor-pointer"
          onClick={() => setStep('carTrims')}
        />
        <p className="text-[2rem]"> Surface Duty Constant</p>
      </div>
      <p className="text-color-purple-1 font-medium text-[2rem] mt-[5rem]">
        {selectedCar?.name} Accord {selectedCar?.trim}
      </p>
      <div className="grid gap-4 mt-2">
        <label htmlFor="" className=" text-[1.4rem] text-gray-500">
          Surface Duty
        </label>
        <input
          type="text"
          className="bg-gray-100 px-4 py-8 rounded-2xl border-none outline-none"
        />
      </div>

      <button
        className={`flex w-full justify-end`}
        onClick={() => closeDialog()}
      >
        <span className=" bg-color-primary px-10 py-6 justify-self-end  rounded-lg text-color-white uppercase font-semibold self-center disabled:opacity-60 disabled:cursor-not-allowed absolute bottom-0 w-[30rem]">
          Save Changes
        </span>
      </button>
    </>
  );

  

  const shipping = (
    <>
      <div className="flex items-center gap-16">
        <BiArrowBack
          className="text-[1.8rem] cursor-pointer"
          onClick={() => closeDialog()}
        />
        <p className="text-[2rem]"> Shipping and Terminal</p>
      </div>

      <div className="grid">
        {shippingContent.map((item, index) => (
          <button
            className={`flex items-center justify-between py-4 outline-none ${
              index !== shippingContent.length - 1 ? 'border-b ' : 'border-none'
            }`}
            onClick={() => moveToShippingItem(item)}
            key={item.name}
          >
            <p className="grid justify-items-start">
              <span className="text-[#4B5463] capitalize">{item.name}</span>
              <span>{item.content}</span>
            </p>
            <p>
              <BsArrowRight className="text-[#4B5463" />
            </p>
          </button>
        ))}
      </div>
    </>
  );
  const shippingItem = (
    <>
      <div className="flex items-center gap-16">
        <BiArrowBack
          className="text-[1.8rem] cursor-pointer"
          onClick={() => setStep('shipping')}
        />
        <p className="text-[2rem]"> Shipping and Terminal</p>
      </div>
      <div className="grid max-h-[60vh] overflow-scroll">
        <button
          className={`flex items-center justify-items-start py-4 outline-none `}
        >
          <p className="grid">
            <span className="text-[#4B5463] capitalize">
              {selectedShippingItem?.name}
            </span>
            <span className="text-[2rem] text-color-purple-1">
              {selectedShippingItem?.content}
            </span>
          </p>
        </button>
        <button
          className={`flex items-center justify-items-start py-4 outline-none text-[1.4rem]`}
        >
          <p className="grid">
            <span className="text-[#4B5463] capitalize">2015 and older</span>
            <span className="text-[2rem] text-[#4B5463]">50k x 1.75</span>
          </p>
        </button>
        {shippingItemProps.map((item, index) => (
          <button
            className={`flex items-center justify-items-start py-4 outline-none ${
              index !== shippingContent.length - 1 ? 'border-b ' : 'border-none'
            }`}
            onClick={() => setStep('shippingItem')}
            key={item.name}
          >
            <p className="grid">
              <span className="text-[#4B5463] capitalize">{item.name}</span>
              <span>{item.content}</span>
            </p>
          </button>
        ))}
      </div>

      <button
        className={`flex w-full justify-end`}
        onClick={() => closeDialog()}
      >
        <span className=" border-color-primary px-10 py-6 border justify-self-end  rounded-lg text-color-primary  font-semibold self-center disabled:opacity-60 disabled:cursor-not-allowed absolute bottom-0 w-[30rem]">
          Edit Formular
        </span>
      </button>
    </>
  );
  const EditShippingItem = (
    <>
      <div className="flex items-center gap-16">
        <BiArrowBack
          className="text-[1.8rem] cursor-pointer"
          onClick={() => setStep('shipping')}
        />
        <p className="text-[2rem]"> Shipping and Terminal</p>
      </div>
      <div className="grid">
          <button
            className={`flex items-center justify-items-start py-4 outline-none `}
          
          >
            <p className="grid">
              <span className="text-[#4B5463] capitalize">{selectedShippingItem?.name}</span>
              <input type="text" className='border-none outline-none' />
            </p>
            
          </button>
        {shippingItemProps.map((item, index) => (
          <button
            className={`flex items-center justify-items-start py-4 outline-none ${
              index !== shippingContent.length - 1 ? 'border-b ' : 'border-none'
            }`}
            onClick={() => setStep('shippingItem')}
            key={item.name}
          >
            <p className="grid">
              <span className="text-[#4B5463] capitalize">{item.name}</span>
              <span>{item.content}</span>
            </p>
            
          </button>
        ))}
      </div>

      <button
        className={`flex w-full justify-end`}
        onClick={() => closeDialog()}
      >
        <span className=" border-color-primary px-10 py-6 border justify-self-end  rounded-lg text-color-primary  font-semibold self-center disabled:opacity-60 disabled:cursor-not-allowed absolute bottom-0 w-[30rem]">
          Edit Formular
        </span>
      </button>
    </>
  );

  const Paths = new Map<Steps, JSX.Element>([
    ['duty', first],
    ['dutyCalculation', dutyCalculation],
    ['dutyConstant', SurfaceConstant],
    ['surfaceDuty', SurfaceDuty],
    ['carModels', carModels],
    ['carTrims', carTrims],
    ['carSurfaceDuty', carSurfaceDuty],
    ['shipping', shipping],
    ['shippingItem', shippingItem],
    ['EditShippingItem', EditShippingItem],
    ['charges', <div>third</div>],
  ]);

  return <div className="relative h-[90vh]">{Paths.get(step)}</div>;
}

export default Config;
