import { useState, useEffect, FC, FormEvent } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { DialogType } from '../../../../container/dashboard/orders';
import { OrderHistoryDetail } from '../OrderHistory';
import { InProgress, filterByColors } from '../OrdersData';
import InitialRender from './InitialRender';

interface AgentOrderDetail {
  handleCloseDialog: (type: DialogType) => void;
  orderDetail: InProgress;
}

const AgentOrderDetail: FC<AgentOrderDetail> = ({
  handleCloseDialog,
  orderDetail,
}) => {
  const [orderHistoryDetail, setOrderHistoryDetail] =
    useState<OrderHistoryDetail | null>(null);
  const [loaded, setLoaded] = useState(false);


  const [isAssignAgent, setIsAssignAgent] = useState(false);

  useEffect(() => {
    if (orderDetail) {
      setOrderHistoryDetail({
        ...orderDetail,
        date: new Date(orderDetail.date),
        adminName: orderDetail.name,
        agentName: 'James Ibori',
        carYear: '2021',
        carModel: 'Toyota Corolla',
        carBrand: 'Toyota',
        carTrim: 'XLE',
        amountPaid: 1000000,
        totalAmount: 20000000,
      });
      setLoaded(true);
    }
  }, [orderDetail]);

 

 
  

 

  // return <div>{isAssignAgent ? <AssignAgentRender /> : <InitialRender />}</div>;

  return (
    <div>
      {loaded && <InitialRender orderHistoryDetail={orderHistoryDetail!} handleCloseDialog={handleCloseDialog} />}
    </div>
  );
};

export default AgentOrderDetail;
