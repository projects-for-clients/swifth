interface AllNofications {
  id: number;
  title: string;
  date: string;
  amount?: number;
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
        ALL_NOTIFICATIONS.map((item, i) => (
            <div className="flex justify-between items-center border-b border-color-red-light-1 py-4">
                <div className="">
                <p className="text-[1.6rem]">{item.title}</p>
                <p className="text-[1.2rem] text-gray-500">{item.date}</p>
                    </div>
                </div>
        ))
    )
}