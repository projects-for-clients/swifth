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
        count: 496
    },
    {
        title: 'orders',
        imgUri: '/icons/analytics/totalOrders.svg',
        count: 300
    },
    {
        title: 'Full Payments',
        imgUri: '/icons/analytics/totalPayments.svg',
        count: 105
    },
    {
        title: 'customers',
        imgUri: '/icons/analytics/totalCustomers.svg',
        count: 70
    },
    {
        title: 'deliveries',
        imgUri: '/icons/analytics/totalDeliveries.svg',
        count: 101
    },
    {
        title: 'members',
        imgUri: '/icons/analytics/totalMembers.svg',
        count: 12
    },
   
   
]
function Analytics() {


  return (
    <>
      <Header title="Analytics" />


      <div>
        <span className=''>
          <SelectInput
            items={[
              'All time',
              'The past year',
              'The past month',
              'The last 24 hours',
            ]}
            placeholder={'All time'}
            fullWidth
          />
        </span>
        <div className='flex w-full flex-nowrap overflow-scroll'>


        </div>
      </div>
    </>
  );
}

export default Analytics;
