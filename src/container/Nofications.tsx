import { BsArrowRight } from 'react-icons/bs';

interface AllNofications {
  id: number;
  title: string;
  date: string;
  amount?: number;
}

interface QuoteRequestsDetails {
  id: number;
  title: string;
  carYear: string;
  carModel: string;
  carBrand: string;
  trim: string;
  port: string;
  terminal: string
}

const ALL_NOTIFICATIONS: AllNofications[] = [
  {
    id: 1,
    title: 'James Ibori  paid',
    date: 'Jan 9, 2023  Just now',
    amount: 780_923,
  },
  {
    id: 1,
    title: 'Kayode Odedele made a quote request ',
    date: 'Jan 9, 2023  5mins ago',
  },
  {
    id: 1,
    title: 'Rick Wright has accepted your invite to be field agent',
    date: 'Jan 9, 2023  Just now',
  },
  {
    id: 1,
    title: 'Kayode Odedele paid ',
    date: 'Jan 9, 2023  Just now',
    amount: 71_000,
  },
  {
    id: 1,
    title: 'James Ibori  paid',
    date: 'Jan 9, 2023  Just now',
    amount: 780_923,
  },
  {
    id: 1,
    title: 'Kayode Odedele made a quote request ',
    date: 'Jan 9, 2023  5mins ago',
  },
  {
    id: 1,
    title: 'Rick Wright has accepted your invite to be field agent',
    date: 'Jan 9, 2023  Just now',
  },
  {
    id: 1,
    title: 'James Ibori  paid',
    date: 'Jan 9, 2023  Just now',
    amount: 780_923,
  },
];

const QUOTE_REQUESTS: AllNofications[] = [
  {
    id: 1,
    title: 'Jonathan Ogunleye',
    date: 'Jan 9, 2023  Just now',
  },
  {
    id: 1,
    title: 'David Ogunleye',
    date: 'Jan 9, 2023  5mins ago',
  },
  {
    id: 1,
    title: 'Jonathan Ogunleye',
    date: 'Jan 9, 2023  Just now',
  },
  {
    id: 1,
    title: 'David Ogunleye',
    date: 'Jan 9, 2023  5mins ago',
  },
  {
    id: 1,
    title: 'Jonathan Ogunleye',
    date: 'Jan 9, 2023  Just now',
  },
  {
    id: 1,
    title: 'David Ogunleye',
    date: 'Jan 9, 2023  5mins ago',
  },
  {
    id: 1,
    title: 'Jonathan Ogunleye',
    date: 'Jan 9, 2023  Just now',
  },
  {
    id: 1,
    title: 'David Ogunleye',
    date: 'Jan 9, 2023  5mins ago',
  },
];

export const AllNofications = () => {
  return (
    <>
      {ALL_NOTIFICATIONS.map((item, i) => (
        <div
          className="flex justify-between items-center border-b border-color-red-light-1 py-4"
          key={i}
        >
          <div className="">
            <p className="text-[1.6rem] text-gray-600">{item.title}</p>
            <p className="text-[1.2rem] text-gray-500">{item.date}</p>
          </div>
          {item.amount && (
            <p className="text-[1.6rem] text-color-purple-1">
              <span className="text-gray-500">NGN</span>{' '}
              {item.amount.toLocaleString()}
            </p>
          )}
        </div>
      ))}
    </>
  );
};

export const QuoteRequests = () => {
  return (
    <>
      {QUOTE_REQUESTS.map((item, i) => (
        <div
          className="flex justify-between items-center border-b border-color-red-light-1 py-4"
          key={i}
        >
          <div className="">
            <p className="text-[1.6rem] text-gray-600">{item.title}</p>
            <p className="text-[1.2rem] text-gray-500">{item.date}</p>
          </div>
          <BsArrowRight className="text-[2.4rem]" />
        </div>
      ))}
    </>
  );
};
