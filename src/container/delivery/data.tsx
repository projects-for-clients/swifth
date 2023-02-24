import { Dispatch, FC, SetStateAction } from 'react';
import { DialogType } from '../../../pages/Orders';

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

export type RCDocsKeys = 'Bills of Lading' | 'Releases' | 'CAC' | 'Signed POA';
type RCDocsStatus = 'Approved' | 'Declined' | null;
export interface RCDocs {
  name: RCDocsKeys;
  status: RCDocsStatus;
  submitted: boolean;
}


export interface Waitlist {
  id: number;
  name: string;
  description: string;
  subDescription?: string;
  date: Date;
  submitted: boolean;
}




const RCDocsArr = [
  {
    name: 'Bills of Lading',
    status: null,
    submitted: true,
  },
  {
    name: 'Releases',
    status: null,
    submitted: false,
  },
  {
    name: 'CAC',
    status: null,
    submitted: false,
  },
  {
    name: 'Signed POA',
    status: null,
    submitted: false,
  },
] satisfies RCDocs[];



export const WAITLIST: Waitlist[] = [
  {
    id: generateRandomNum(),
    name: 'Jonathan Sunya',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: generateRandomDate(),
    submitted: true,
  },
  {
    id: generateRandomNum(),
    name: 'Robert Sunya',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: generateRandomDate(),
    submitted: true,
  },
  {
    id: generateRandomNum(),
    name: 'Tommy Yaun',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    subDescription: 'and 2 more',
    date: generateRandomDate(),
    submitted: false,
  },
  {
    id: generateRandomNum(),
    name: 'Daniel Okafor',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: generateRandomDate(),
    submitted: true,
  },
  {
    id: generateRandomNum(),
    name: 'Jonathan Sunya',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: generateRandomDate(),
    submitted: true,
  },
  {
    id: generateRandomNum(),
    name: 'Robert Sunya',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: generateRandomDate(),
    submitted: true,
  },
  {
    id: generateRandomNum(),
    name: 'Tommy Yaun',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    subDescription: 'and 2 more',
    date: generateRandomDate(),
    submitted: false,
  },
  {
    id: generateRandomNum(),
    name: 'Daniel Okafor',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: generateRandomDate(),
    submitted: true,
  },
  {
    id: generateRandomNum(),
    name: 'Jonathan Sunya',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: generateRandomDate(),
    submitted: true,
  },
  {
    id: generateRandomNum(),
    name: 'Robert Sunya',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: generateRandomDate(),
    submitted: true,
  },
  {
    id: generateRandomNum(),
    name: 'Tommy Yaun',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    subDescription: 'and 2 more',
    date: generateRandomDate(),
    submitted: false,
  },
  {
    id: generateRandomNum(),
    name: 'Daniel Okafor',
    description: 'Toyota Camry XLE, 2018 v6 with alloy wheels',
    date: generateRandomDate(),
    submitted: true,
  },
];


export const WaitlistView: FC<{
  waitlistData: Waitlist[];
  handleOpenDialog: (dialogType: DialogType, item: Waitlist) => void;
}> = ({ waitlistData, handleOpenDialog }) => (
  <div
    className="grid mt-[5rem] gap-10"
    style={{
      gridTemplateColumns: 'repeat(auto-fit, minmax(40rem, 1fr))',
    }}
  >
    {waitlistData.map((item, i) => {
      const { name, description, date, submitted, subDescription } = item;

      return (
        <div
          className="p-8 bg-white rounded-3xl border border-color-purple-light-2 flex justify-between items-center cursor-pointer"
          key={i}
          onClick={() => handleOpenDialog('waitlist', item)}
        >
          <div>
            <p className="text-[1.6rem]">{name}</p>
            <p className="text-[1.4rem] whitespace-nowrap text-ellipsis overflow-hidden text-gray-500 flex max-w-[20rem]">
              {description}
              {subDescription && (
                <span className="text-gray-400">{subDescription}</span>
              )}
            </p>
          </div>

          <div className="text-[1.6rem] justify-between">
            {submitted ? (
              <span className="text-green-500 font-medium">
                Documents Submitted
              </span>
            ) : (
              <span className="text-[#BEB3DE] font-medium">Quote Sent</span>
            )}
            <p className="text-gray-500 text-[1.4rem]">
              {date.toLocaleString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      );
    })}
  </div>
);
