import { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';

function Settings({
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
    | 'editCharges'
    | 'dutyCalculation'
    | 'dutyConstant'
    | 'surfaceDuty'
    | 'carModels'
    | 'carTrims'
    | 'carSurfaceDuty'
    | 'shippingItem'
    | 'EditShippingItem';

  type Filter = 'brand' | 'model' | 'trim';
  const filter: Filter[] = ['brand', 'model', 'trim'];

  type CarProp = {
    name?: string;
    trim?: string;
    content?: string;
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
  const [selectedShippingItem, setSelectedShippingItem] =
    useState<CarProp | null>(null);

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
  };

  const saveShipping = () => {
    setStep('shipping');

    toast('Changes Saved', {
      type: 'success',
      className:
        'bg-[#D9EFE1] border border-[#8CCEA6] text-[#319F5A] py-4 px-8 rounded-3xl',
    });
  };
  const saveCharges = () => {
    setStep('charges');

    toast('Changes Saved', {
      type: 'success',
      className:
        'bg-[#D9EFE1] border border-[#8CCEA6] text-[#319F5A] py-4 px-8 rounded-3xl',
    });
  };

  const first = (
    <>
      <p className="text-[2rem] mb-16">Settings</p>

      <div className="grid gap-8 mt-[5rem]">
        <button
          className="border border-color-purple-light-2 rounded-3xl p-6 text-left flex items-center gap-8 "
          onClick={() => setStep('dutyCalculation')}
        >
          <img src="/icons/car.svg" alt="" />
          <div>
            <p className="text-[#251A45]">Add a Car</p>
            <p className="text-[1.4rem] text-gray-500">
              Add new car and details
            </p>
          </div>
        </button>
        <button
          className="border border-color-purple-light-2 rounded-3xl p-6 text-left flex items-center gap-8 "
          onClick={() => setStep('dutyCalculation')}
        >
          <img src="/icons/customerPayment.svg" alt="" />
          <div>
            <p className="text-[#251A45]">Customer/Payment Settings</p>
            <p className="text-[1.4rem] text-gray-500">
              Manage customer & payment settings{' '}
            </p>
          </div>
        </button>
        <button
          className="border border-color-purple-light-2 rounded-3xl p-6 text-left flex items-center gap-8 "
          onClick={() => setStep('dutyCalculation')}
        >
          <img src="/icons/security.svg" alt="" />
          <div>
            <p className="text-[#251A45]">Password & Security</p>
            <p className="text-[1.4rem] text-gray-500">
              Set up password and 2FA
            </p>
          </div>
        </button>
        <button
          className="border border-color-purple-light-2 rounded-3xl p-6 text-left flex items-center gap-8 "
          onClick={() => setStep('dutyCalculation')}
        >
          <img src="/icons/notification-1.svg" alt="" />
          <div>
            <p className="text-[#251A45]">Notification Settings</p>
            <p className="text-[1.4rem] text-gray-500">
              Adjust your notification setting
            </p>
          </div>
        </button>
      </div>
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
    ['charges', charges],
    ['editCharges', editCharges],
  ]);

  return (
    <div className="relative h-[90vh]">
      <ToastContainer />
      {Paths.get(step)}
    </div>
  );
}

export default Settings;
