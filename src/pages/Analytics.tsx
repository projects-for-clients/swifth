import Header from '../components/dashboard/Header';
import SelectInput from '../components/utils/SelectInput';

interface Carousel {
  title: string;
  imgUri: string;
  count: number;
}
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
  return (
    <>
      <Header title="Analytics" />

      <div className=" flex items-center">
        <span className="w-[15rem]">
          <SelectInput
            items={[
              'All time',
              'The past year',
              'The past month',
              'The last 24 hours',
            ]}
            placeholder={'All time'}
            fullWidth
            analytics
          />
        </span>
        <div className="flex w-full flex-nowrap overflow-scroll">
          {carousel.map((item, index) => (
            <div
              className="flex flex-col items-center justify-center w-[14rem] h-[16rem] bg-color-white rounded-lg shadow-lg m-4 relative gap-8 border border-color-purple-light"
              key={item.title}
            >
              <img src={item.imgUri} alt="" className="absolute top-[-2rem]" />

              <div className='grid justify-items-center'>
                <p className='text-color-purple-1'>Total</p>
                <p className='text-color-purple font-medium'>{item.title}</p>
              </div>

              <p className='text-color-purple text-[3rem]'>{item.count}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Analytics;
