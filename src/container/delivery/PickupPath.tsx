import { nanoid } from 'nanoid';
import { useContext } from 'react';
import { DeliveryContext } from '../../pages/Delivery';

export interface FiltersProps {
  text: string;
  bg: string;
}
export type PickupFilterBy = 'picked up' | 'pick up pending';

export const filterByColors: Record<PickupFilterBy, FiltersProps> = {
  'picked up': {
    text: 'text-[#fff]',
    bg: 'bg-[#40AD6B]',
  },

  'pick up pending': {
    text: 'text-[#182130]',
    bg: 'bg-[#D3EE87]',
  },
};

export function generateRandomDate() {
  const today = new Date();
  const nextYear = new Date(today.getFullYear() + 1, 0, 1);
  const randomDate = new Date(
    today.getTime() + Math.random() * (nextYear.getTime() - today.getTime())
  );
  return randomDate;
}

export interface PickupData {
  id: string;
  name: string;
  description: string;
  date: Date;
  tag: PickupFilterBy;
  assignedAgent?: string;
}

export const PICKUP_DATA: PickupData[] = Array.from({ length: 10 }, (_, i) => {
  return {
    id: nanoid(),
    name: `Jonathan Sunyi ${i}`,
    description: `Toyota Camry XLE, 2018 v6 with alloy wheels ${i}`,
    date: generateRandomDate(),
    tag: Math.random() > 0.5 ?  'picked up' : 'pick up pending',
    assignedAgent: Math.random() > 0.5 ? 'Solomon Henry' : 'Joseph Isaac',
  };
});

export const PickupPath = () => {
  const { pickupData } = useContext(DeliveryContext);

  return (
    <></>
    // <div
    //   className="grid mt-[5rem] gap-10"
    //   style={{
    //     gridTemplateColumns: 'repeat(auto-fit, minmax(33rem, 1fr))',
    //   }}
    // >
    //   {pickupData.map((item, i) => {
    //     const { name, description, date, tag } = item;

    //     return (
    //       <div
    //         className="p-8 bg-white rounded-3xl border border-color-purple-light-2 cursor-pointer"
    //         key={i}
    //       >
    //         <div>
    //           <p className="text-[1.6rem]">{name}</p>
    //           <p className="text-[1.4rem] whitespace-nowrap text-ellipsis overflow-hidden text-gray-500 max-w-[20rem]">
    //             {description}
    //           </p>
    //         </div>

    //         <div className="text-[1.2rem] flex items-center justify-between pt-8">
    //           <p className="text-gray-500">
    //             {date.toLocaleString('en-GB', {
    //               day: 'numeric',
    //               month: 'short',
    //               year: 'numeric',
    //             })}
    //           </p>
    //           <p
    //             className={`py-1.5 px-4 rounded-2xl capitalize ${filterByColors[tag].bg} ${filterByColors[tag].text}`}
    //           >
    //             {tag}
    //           </p>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};
