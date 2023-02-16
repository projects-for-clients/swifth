import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../app/store';
import { InProgress, INPROGRESS } from '../../../components/dashboard/order/OrdersData';

export type RCDocsKeys = 'Bills of Lading' | 'Releases' | 'CAC' | 'Signed POA';
type RCDocsStatus = 'Approved' | 'Declined' | null;
interface RCDocs {
  name: RCDocsKeys;
  status: RCDocsStatus;
  submitted: boolean;
}


interface IOrder {
  RCDocs: RCDocs[];
  ordersData: InProgress[];
}

const RCDocsArr = [
  {
    name: 'Bills of Lading',
    status: null,
    submitted: true,
  },
  {
    name: 'Releases',
    status: null,
    submitted: false,
  },
  {
    name: 'CAC',
    status: null,
    submitted: false,
  },
  {
    name: 'Signed POA',
    status: null,
    submitted: false,
  },
] satisfies RCDocs[];

const initialState: IOrder = {
  RCDocs: RCDocsArr,
  ordersData: INPROGRESS,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateRCDocs: (state, { payload }: { payload: RCDocs }) => {
      return {
        ...state,
        RCDocs: [
          ...state.RCDocs.map((doc) => {
            if (doc.name === payload.name) {
              return payload;
            }
            return doc;
          }),
        ],
      };
    },

    updateOrdersData: (state, { payload }: { payload: Pick<InProgress, 'id' | 'assignedAgent'> }) => {
      const { id, assignedAgent } = payload;
      return { ...state, ordersData: [...state.ordersData.map((order) => {
        if (order.id === id) {
          return { ...order, assignedAgent: assignedAgent};
        }
        return order;
      })] };
    },
  },
});

export const { updateRCDocs, updateOrdersData } = orderSlice.actions;

export const selectOrder = (state: AppState) => state.order;

export default orderSlice.reducer;
