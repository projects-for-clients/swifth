export function generateRandomDate() {
  const today = new Date();
  const nextYear = new Date(today.getFullYear() + 1, 0, 1);
  const randomDate = new Date(
    today.getTime() + Math.random() * (nextYear.getTime() - today.getTime())
  );
  return randomDate;
}

export const generateRandomNum = () =>
  Math.floor(100000000000 + Math.random() * 900000);
  
export type InProgressFilterBy =
  | 'Docs in Review'
  | 'Valuating'
  | 'Duty Processing'
  | 'Custom Releasing'
  | 'Delivery Pending'
  | 'Completed';

export interface InProgress {
  id: number;
  name: string;
  description: string;
  date: Date;
  tag: InProgressFilterBy;
  assignedAgent?: string;
  RCDocs: RCDocs[];
}

export const INPROGRESS: InProgress[] = [
  {
    id: generateRandomNum(),
    name: 'Jonathan Sunyi',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: generateRandomDate(),
    tag: 'Docs in Review',
    RCDocs: RCDocsArr,
  },
  {
    id: generateRandomNum(),
    name: 'Akpan Sunyi',
    description: 'Lexus ES350, 2017 v6 with alloy wheels and',
    date: generateRandomDate(),
    RCDocs: RCDocsArr,

    tag: 'Duty Processing',
  },
  {
    id: generateRandomNum(),
    name: 'Solomon Henry',
    description: 'Lexus RX350, 2017 v6 with alloy wheels and',
    date: generateRandomDate(),
    RCDocs: RCDocsArr,

    tag: 'Custom Releasing',
  },
  {
    id: generateRandomNum(),
    name: 'Joseph Isaac',
    description: 'Mercedes GLE350, 2022 v6 with alloy wheels and',
    date: generateRandomDate(),
    RCDocs: RCDocsArr,

    tag: 'Delivery Pending',
  },
  {
    id: generateRandomNum(),
    name: 'Jonathan Sunyi',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels and',
    date: generateRandomDate(),
    RCDocs: RCDocsArr,

    tag: 'Completed',
  },
  {
    id: generateRandomNum(),
    name: 'Akpan Sunyi',
    description: 'Lexus ES350, 2017 v6 with alloy wheels and',
    date: generateRandomDate(),
    RCDocs: RCDocsArr,

    tag: 'Custom Releasing',
  },
  {
    id: generateRandomNum(),
    name: 'Solomon Henry',
    description: 'Lexus RX350, 2017 v6 with alloy wheels and',
    date: generateRandomDate(),
    RCDocs: RCDocsArr,

    tag: 'Custom Releasing',
  },
  {
    id: generateRandomNum(),
    name: 'Joseph Isaac',
    description: 'Mercedes GLE350, 2022 v6 with alloy wheels and',
    date: generateRandomDate(),
    RCDocs: RCDocsArr,
    tag: 'Completed',
  },
  {
    id: generateRandomNum(),
    name: 'Jonathan Sunyi',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels and',
    date: generateRandomDate(),
    RCDocs: RCDocsArr,
    tag: 'Valuating',
  },
  {
    id: generateRandomNum(),
    name: 'Akpan Sunyi',
    description: 'Lexus ES350, 2017 v6 with alloy wheels and',
    date: generateRandomDate(),
    RCDocs: RCDocsArr,
    tag: 'Docs in Review',
  },
  {
    id: generateRandomNum(),
    name: 'Solomon Henry',
    description: 'Lexus RX350, 2017 v6 with alloy wheels and',
    date: generateRandomDate(),
    RCDocs: RCDocsArr,
    tag: 'Valuating',
  },
  {
    id: generateRandomNum(),
    name: 'Joseph Isaac',
    description: 'Mercedes GLE350, 2022 v6 with alloy wheels and',
    date: generateRandomDate(),
    RCDocs: RCDocsArr,

    tag: 'Delivery Pending',
  },
];

export const InProgressView: FC<{
  inProgressData: InProgress[];
  openOrderDetail: (item: InProgress) => void;
}> = ({ inProgressData, openOrderDetail }) => {
  return (
    <div
      className="grid mt-[5rem] gap-10"
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(33rem, 1fr))',
      }}
    >
      {inProgressData.map((item, i) => {
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
