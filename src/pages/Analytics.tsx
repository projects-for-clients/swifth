import { useState } from 'react';
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

        <div>
          {keys.map((key) => {
            return (
              <div>
                <input
                  type="radio"
                  name="analytic"
                  id={key}
                  className="hidden"
                />
                <label htmlFor={key} className=" cursor-pointer">
                  {key}
                </label>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default Analytics;
