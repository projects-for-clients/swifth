import Header from '../components/dashboard/Header';
import SelectInput from '../components/utils/SelectInput';


interface Carousel {
    title: string;
    imgUri: string;
    count: number;

}
const carousel: Carousel[] = [
    {
        title: 'Total Quotes',
        imgUri: '/icons/analytics/total-quotes.svg',
        count: 496
    },
    {
        title: 'Total Quotes',
        imgUri: '/icons/analytics/totalQuotes.svg',
        count: 496
    },
    {
        title: 'Total Quotes',
        imgUri: '/icons/analytics/totalQuotes.svg',
        count: 496
    },
    {
        title: 'Total orders',
        imgUri: '/icons/analytics/totalOrders.svg',
        count: 300
    },
    {
        title: 'Total Quotes',
        imgUri: '/icons/analytics/totalQuotes.svg',
        count: 496
    },
    {
        title: 'Total Quotes',
        imgUri: '/icons/analytics/totalQuotes.svg',
        count: 496
    },
    {
        title: 'Total Quotes',
        imgUri: '/icons/analytics/totalQuotes.svg',
        count: 496
    },
    {
        title: 'Total Quotes',
        imgUri: '/icons/analytics/totalQuotes.svg',
        count: 496
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
        <div>


        </div>
      </div>
    </>
  );
}

export default Analytics;
