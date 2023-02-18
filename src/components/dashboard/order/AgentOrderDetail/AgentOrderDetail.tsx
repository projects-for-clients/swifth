import { useState, useEffect, FC, FormEvent, createContext, Dispatch, SetStateAction } from 'react';
import { DialogType } from '../../../../container/dashboard/orders';
import { OrderHistoryDetail } from '../OrderHistory';
import { InProgress } from '../OrdersData';
import AssignAgentRender from './AssignAgentRender';
import InitialRender from './InitialRender';

interface AgentOrderDetail {
  handleCloseDialog: (type: DialogType) => void;
  orderDetail: InProgress;
}

export interface ShowAssignAgentView {
  show: boolean;
  whichDoc?: 'RCDoc' | 'clearingDoc';
}

const AgentOrderDetail: FC<AgentOrderDetail> = ({
  handleCloseDialog,
  orderDetail,
}) => {
  const [orderHistoryDetail, setOrderHistoryDetail] =
    useState<OrderHistoryDetail | null>(null);
  const [loaded, setLoaded] = useState(false);

  const [showAssignAgentView, setShowAssignAgentView] = useState<ShowAssignAgentView>({
    show: false,
    whichDoc: 'RCDoc',
  });

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

  // return <div></div>;

  interface AgentOrderDetailContext {
    showAssignAgentView: ShowAssignAgentView;
    setShowAssignAgentView: Dispatch<SetStateAction<ShowAssignAgentView>>;
    orderId: string;
    orderHistoryDetail: OrderHistoryDetail;
    handleCloseDialog: (type: DialogType) => void;
  }

  const AgentOrderDetailContext = createContext(null as any)

  return (
    <AgentOrderDetailContext.Provider value={{
      showAssignAgentView,
      setShowAssignAgentView,
      orderId: orderDetail.id,
      orderHistoryDetail,
      handleCloseDialog
    }}>
      {loaded ? (
        <>
          {showAssignAgentView.show ? (
            <AssignAgentRender
              showAssignAgentView={showAssignAgentView}
              setShowAssignAgentView={setShowAssignAgentView}
              orderId={orderDetail.id}
            />
          ) : (
            <InitialRender
              setShowAssignAgentView={setShowAssignAgentView}
              orderHistoryDetail={orderHistoryDetail!}
              handleCloseDialog={handleCloseDialog}
            />
          )}
        </>
      ) : null}
    </AgentOrderDetailContext.Provider>
  );
};

export default AgentOrderDetail;
