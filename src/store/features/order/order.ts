import { RCDocs } from './../../../components/dashboard/order/OrdersData';
import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../app/store';
import {
  InProgress,
  INPROGRESS,
  RCDocs,
} from '../../../components/dashboard/order/OrdersData';




interface IOrder {
  ordersData: InProgress[];
}


const initialState: IOrder = {
  ordersData: INPROGRESS,
};



export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateRCDocs: (state, { payload }: { payload: RCDocs }) => {
      return {
        ...state,
        ordersData: [
          ...state.ordersData.map((order) => {
            if (order.id === payload.id) {
              return { ...order, RCDocs: [
                ...order.RCDocs,
                payload,

              ] };
            }
            return order;
          }),
        ],

      };
    },

    assignAgentHandler: (
      state,
      { payload }: { payload: Pick<InProgress, 'id' | 'assignedAgent'> }
    ) => {
      const { id, assignedAgent } = payload;
      return {
        ...state,
        ordersData: [
          ...state.ordersData.map((order) => {
            if (order.id === id) {
              return { ...order, assignedAgent };
            }
            return order;
          }),
        ],
      };
    },
  },
});

export const { updateRCDocs, assignAgentHandler } = orderSlice.actions;

export const selectOrder = (state: AppState) => state.order;

export default orderSlice.reducer;
