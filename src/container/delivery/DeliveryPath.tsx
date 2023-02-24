import { nanoid } from 'nanoid';

export interface FiltersProps {
  text: string;
  bg: string;
}
export type DeliveryFilterBy = 'Delivered' | 'Delivery Pending';

export const filterByColors: Record<DeliveryFilterBy, FiltersProps> = {
  Delivered: {
    text: 'text-[#fff]',
    bg: 'bg-[#40AD6B]',
  },

  'Delivery Pending': {
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

export interface Delivery {
  id: string;
  name: string;
  description: string;
  date: Date;
  tag: DeliveryFilterBy;
  assignedAgent?: string;
}

export const DELIVERY: Delivery[] = Array.from({ length: 10 }, (_, i) => {
  return {
    id: nanoid(),
    name: `Jonathan Sunyi ${i}`,
    description: `Toyota Camry XLE, 2018 v6 with alloy wheels ${i}`,
    date: generateRandomDate(),
    tag: Math.random() > 0.5 ? 'Delivered' : 'Delivery Pending',
    assignedAgent: Math.random() > 0.5 ? 'Solomon Henry' : 'Joseph Isaac',
  };
});

export const DeliveryView: FC<{
  deliveryData: Delivery[];
  openOrderDetail: (item: Delivery) => void;
}> = ({ deliveryData, openOrderDetail }) => {
  return (
    <div
      className="grid mt-[5rem] gap-10"
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(33rem, 1fr))',
      }}
    >
      {deliveryData.map((item, i) => {
        const { name, description, date, tag } = item;

        return (
          <div
            className="p-8 bg-white rounded-3xl border border-color-purple-light-2 cursor-pointer"
            key={i}
            onClick={() => openOrderDetail(item)}
          >
            <div>
              <p className="text-[1.6rem]">{name}</p>
              <p className="text-[1.4rem] whitespace-nowrap text-ellipsis overflow-hidden text-gray-500 max-w-[20rem]">
                {description}
              </p>
            </div>

            <div className="text-[1.2rem] flex items-center justify-between pt-8">
              <p className="text-gray-500">
                {date.toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <p
                className={`py-1.5 px-4 rounded-2xl ${filterByColors[tag].bg} ${filterByColors[tag].text}`}
              >
                {tag}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
