import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../app/store';

type RCDocsKeys = 'Bills of Lading' | 'Releases' | 'CAC' | 'Signed POA';
type RCDocsStatus = 'approved' | 'declined' | null;
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
  isBOLApproved: boolean;
  RCDocs: RCDocs[];
  ordersData: OrdersData[];
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


] satisfies RCDocs[]

const initialState: IOrder = {
  isBOLApproved: false,
  RCDocs: RCDocsArr,
  ordersData: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    handleIsBOL: (state, { payload }: { payload: IOrder['isBOLApproved']}) => {
      return { ...state, isBOLApproved: payload };
    },

    updateRCDocs: (state, { payload }: { payload: RCDocs[] }) => {
      return { ...state, RCDocs: payload };
    },

    updateOrdersData: (state, { payload }: { payload: OrdersData }) => {
      return { ...state, ordersData: [...state.ordersData, payload] };
    }
  },
});

export const { handleIsBOL, updateRCDocs, updateOrdersData } = orderSlice.actions;

export const selectOrder = (state: AppState) => state.order;

export default orderSlice.reducer;
