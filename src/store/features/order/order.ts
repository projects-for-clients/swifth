import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../app/store';

type RCDocsKeys = 'Bills of Lading' | 'Releases' | 'CAC' | 'Signed POA';
type RCDocsStatus = 'Approved' | 'Declined' | null;
interface RCDocs {
  name: RCDocsKeys;
  status: RCDocsStatus;
  submitted: boolean;
}

interface OrdersData {
  id: number;
  assignedAgent: string | null
}
interface IOrder {
  RCDocs: RCDocs[];
  ordersData: OrdersData | null;
}


const RCDocsArr = [
  {
    name: 'Bills of Lading',
    status: null,
    submitted: false,
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


] satisfies RCDocs[]

const initialState: IOrder = {
  RCDocs: RCDocsArr,
  ordersData: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
   

    updateRCDocs: (state, { payload }: { payload: RCDocs[] }) => {
      return { ...state, RCDocs: payload };
    },

    updateOrdersData: (state, { payload }: { payload: OrdersData }) => {
      return { ...state, ordersData: payload };
    }
  },
});

export const {  updateRCDocs, updateOrdersData } = orderSlice.actions;

export const selectOrder = (state: AppState) => state.order;

export default orderSlice.reducer;
