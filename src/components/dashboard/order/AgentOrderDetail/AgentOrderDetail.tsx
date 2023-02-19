import {
  useState,
  useEffect,
  FC,
  FormEvent,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { DialogType } from '../../../../container/dashboard/Orders';
import { UpdateDocsPayload } from '../../../../store/features/order/order';
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

interface AgentOrderDetailContext {
  showAssignAgentView: ShowAssignAgentView;
  setShowAssignAgentView: Dispatch<SetStateAction<ShowAssignAgentView>>;
  orderId: number;
  orderHistoryDetail: OrderHistoryDetail;
  handleCloseDialog: (type: DialogType) => void;
  updateDocsPayload: UpdateDocsPayload;
  setUpdateDocsPayload: Dispatch<SetStateAction<UpdateDocsPayload>>;
}

export const AgentOrderDetailContext = createContext<AgentOrderDetailContext>(
  null as any
);

const AgentOrderDetail: FC<AgentOrderDetail> = ({
  handleCloseDialog,
  orderDetail,
}) => {
  const [orderHistoryDetail, setOrderHistoryDetail] =
    useState<OrderHistoryDetail | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [updateDocsPayload, setUpdateDocsPayload] = useState<UpdateDocsPayload>(
    null as any
  );

  const [showAssignAgentView, setShowAssignAgentView] =
    useState<ShowAssignAgentView>({
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

  return (
    <AgentOrderDetailContext.Provider
      value={{
        showAssignAgentView,
        setShowAssignAgentView,
        orderId: loaded ? orderDetail.id : 0,
        orderHistoryDetail: orderHistoryDetail!,
        handleCloseDialog,
        updateDocsPayload,
        setUpdateDocsPayload,
      }}
    >
      {loaded ? (
        <>
          {showAssignAgentView.show ? <AssignAgentRender /> : <InitialRender />}
        </>
      ) : null}
    </AgentOrderDetailContext.Provider>
  );
};

export default AgentOrderDetail;
