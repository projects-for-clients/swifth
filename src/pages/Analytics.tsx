import Header from '../components/dashboard/Header';
import SelectInput from '../components/utils/SelectInput';

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
