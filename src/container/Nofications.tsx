import { Dispatch, FC, useEffect, useState, SetStateAction } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { ShowDetails, SwitchPath } from './dashboard/Home';

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

interface IQuoteRequestsProps {
  showDetails: ShowDetails;
  setShowDetails: Dispatch<SetStateAction<ShowDetails>>;
  setCurrentPath: Dispatch<SetStateAction<SwitchPath>>;
}

export const QuoteRequestsDetails: FC<IQuoteRequestsProps> = ({
  setCurrentPath,
  setShowDetails,
  showDetails,
}) => {
  interface QuoteRequestsDetails {
    id: number;
    title: string;
    carYear: string;
    carModel: string;
    carBrand: string;
    trim: string;
    port: string;
    terminal: string;
  }

  const [quoteDetails, setQuoteDetails] = useState<QuoteRequestsDetails>(
    {} as QuoteRequestsDetails
  );

  useEffect(() => {
    const data = {
      id: showDetails.id!,
      title: 'Jonathan Ogunleye',
      carYear: '2021',
      carModel: 'Toyota Corolla',
      carBrand: 'Toyota',
      trim: 'XLE',
      port: 'Lagos',
      terminal: 'Terminal 1',
    };
    setQuoteDetails(data);
  }, [showDetails.id]);

  const goBack = () => {
    setShowDetails({
      show: false,
    });
    setCurrentPath('quoteRequests');
  };

  const { id, title, carYear, carModel, carBrand, trim, port, terminal } =
    quoteDetails;

  return (
    <>
          <section className='absolute top-0 left-0 bottom-0'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus voluptatibus repellendus quae corporis illo. Cupiditate et mollitia qui. Quam, non placeat temporibus dolor eum quasi tenetur tempore eius nemo explicabo.
          </section>

      <div className="px-5 h-full items-baseline ">
        <div className="flex">
          <BsArrowLeft
            className="text-[2.4rem] cursor-pointer"
            onClick={goBack}
            />
          <p className="text-[1.6rem] text-gray-600 w-full text-center">
            {title}
          </p>
        </div>
        <main className="grid gap-4 mt-20">
          <div className="flex justify-between items-center border-b border-b-color-red-light-1 py-4">
            <div>
              <p className="text-[1.4rem] text-gray-400">Car Year</p>
              <p className="text-[1.6rem] text-gray-600">{carYear}</p>
            </div>
            <div>
              <p className="text-[1.4rem] text-gray-400">Car Brand</p>
              <p className="text-[1.6rem] text-gray-600">{carBrand}</p>
            </div>
          </div>
          <div className="flex justify-between items-center border-b border-b-color-red-light-1 py-4">
            <div>
              <p className="text-[1.4rem] text-gray-400">Car Model</p>
              <p className="text-[1.6rem] text-gray-600">{carModel}</p>
            </div>
            <div>
              <p className="text-[1.4rem] text-gray-400">Trim</p>
              <p className="text-[1.6rem] text-gray-600">{trim}</p>
            </div>
          </div>
          <div className="flex justify-between items-center border-b border-b-color-red-light-1 py-4">
            <div>
              <p className="text-[1.4rem] text-gray-400">Port</p>
              <p className="text-[1.6rem] text-gray-600">{port}</p>
            </div>
            <div>
              <p className="text-[1.4rem] text-gray-400">Terminal</p>
              <p className="text-[1.6rem] text-gray-600">{terminal}</p>
            </div>
          </div>
        </main>

        <button className="flex w-full h-full items-center ">
          <span className="bg-color-primary rounded-lg text-white w-full py-4">
            Send Quote
          </span>
        </button>
      </div>
    </>
  );
};

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

export const QuoteRequests: FC<Pick<IQuoteRequestsProps, 'setShowDetails'>> = ({
  setShowDetails,
}) => {
  const showDetailsHandler = (id: number) => {
    setShowDetails({
      show: true,
      id,
    });
  };

  return (
    <>
      {QUOTE_REQUESTS.map((item, i) => (
        <div
          className="flex justify-between items-center border-b border-color-red-light-1 py-4 cursor-pointer"
          key={i}
          onClick={() => showDetailsHandler(item.id)}
        >
          <div>
            <p className="text-[1.6rem] text-gray-600">{item.title}</p>
            <p className="text-[1.2rem] text-gray-500">{item.date}</p>
          </div>
          <BsArrowRight className="text-[2.4rem]" />
        </div>
      ))}
    </>
  );
};
