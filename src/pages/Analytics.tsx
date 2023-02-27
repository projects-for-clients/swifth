import { useEffect, useState } from 'react';
import AnalyticsChart from '../components/charts/AnalyticsChart';
import Header from '../components/dashboard/Header';
import AnalyticsInput from '../components/utils/AnalyticsInput';

interface Carousel {
  title: string;
  imgUri: string;
  count: number;
}

type keys =
  | 'All'
  | 'Orders'
  | 'Quotes'
  | 'Customers'
  | 'Deliveries'
  | 'Payments';

const keys: keys[] = [
  'All',
  'Orders',
  'Quotes',
  'Customers',
  'Deliveries',
  'Payments',
];

type Options = 'annually' | 'monthly';
const options: Options[] = ['annually', 'monthly'];

const carousel: Carousel[] = [
  {
    title: 'quotes',
    imgUri: '/icons/analytics/totalQuotes.svg',
    count: 496,
  },
  {
    title: 'orders',
    imgUri: '/icons/analytics/totalOrders.svg',
    count: 300,
  },
  {
    title: 'Full Payments',
    imgUri: '/icons/analytics/totalPayments.svg',
    count: 105,
  },
  {
    title: 'customers',
    imgUri: '/icons/analytics/totalCustomers.svg',
    count: 70,
  },
  {
    title: 'deliveries',
    imgUri: '/icons/analytics/totalDeliveries.svg',
    count: 101,
  },
  {
    title: 'members',
    imgUri: '/icons/analytics/totalMembers.svg',
    count: 12,
  },
];
function Analytics() {
  const [current, setCurrent] = useState<keys>('All');
  const [selectedOption, setSelectedOption] = useState<Options>(options[0]);


  useEffect(() => {
    console.log({current})
  }, [current])
  return (
    <>
      <Header title="Analytics" />
      <main className="mt-[5rem] grid">
        <div
          className=" grid items-center"
          style={{
            gridTemplateColumns: '15% auto',
          }}
        >
          <div className="relative">
            <AnalyticsInput
              label="Your stats for"
              items={[
                'All time',
                'The past year',
                'The past month',
                'The last 24 hours',
              ]}
              placeholder={'All time'}
            />
          </div>
          <div className="flex w-full flex-nowrap h-[22rem] overflow-x-scroll">
            {carousel.map((item) => (
              <div
                className="flex flex-col items-center justify-center min-w-[14rem] h-[16rem] bg-color-white shadow-lg m-4 relative gap-8 border border-color-purple-light rounded-3xl self-center"
                key={item.title}
              >
                <img
                  src={item.imgUri}
                  alt=""
                  className="absolute top-[-2rem]"
                />

                <div className="grid justify-items-center">
                  <p className="text-color-purple-1">Total</p>
                  <p className="text-color-purple font-medium">{item.title}</p>
                </div>

                <p className="text-color-purple text-[3rem]">{item.count}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="flex max-w-[60rem] gap-8">
            {keys.map((key) => {
                console.log({current, key})
              return (
                <div className="analytics__radioBox" key={key}>
                  <input
                    type="radio"
                    name="analytic"
                    id={key}
                    checked={current === key}
                    onChange={() => setCurrent(key)}
                    className=""
                  />
                  <label htmlFor={key} className="cursor-pointer">
                    {key}
                  </label>
                </div>
              );
            })}
          </div>

          <div className="rounded-3xl p-8 border border-color-purple-light grid gap-8 mt-5 relative">
            <div className="flex mb-10 w-full justify-center">
              <div className="w-[40rem] flex items-center justify-items-center border border-color-red-light rounded-2xl p-2">
                {options.map((option) => {
                  return (
                    <div className={`w-full text-center rounded-2xl py-4 ${selectedOption === option ? 'bg-color-red-light-1': ''}`} key={option}>
                      <input
                        type="radio"
                        name="analytic"
                        id={option}
                        checked={selectedOption === option}
                        onChange={() => setSelectedOption(option)}
                        className="hidden"
                      />
                      <label htmlFor={option} className="cursor-pointer capitalize">
                        {option}
                      </label>
                    </div>
                  );
                })}
              </div>
              <div className="min-w-[8rem] absolute right-0 top-0 m-8">
                <AnalyticsInput
                  items={['2023', '2022', '2021']}
                  placeholder={'2023'}
                  right
                />
              </div>
            </div>
            <AnalyticsChart width={1000} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Analytics;
