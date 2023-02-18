import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../app/store';
import {
  InProgress,
  INPROGRESS,
} from '../../../components/dashboard/order/OrdersData';

export type RCDocsKeys = 'Bills of Lading' | 'Releases' | 'CAC' | 'Signed POA';
export type ClearingKeys = 'Valuating' | 'Duty Processing' | 'Custom Releasing';
type RCDocsStatus = 'Approved' | 'Declined' | null;

export type RCDocsContent = {
  name: RCDocsKeys;
  status: RCDocsStatus;
  submitted: boolean;
};

interface UpdateRCDocsPayload {
  orderId: number;
  content: RCDocsContent;
}
interface RCDocs {
  orderId: number;
  docId: number;
  content: RCDocsContent[];
}

interface IOrder {
  RCDocsArr: RCDocs[];
  ordersData: InProgress[];
}


const generateRandomNum = () =>
  Math.floor(100000 + Math.random() * 900000);

  

const RCDocs = {
  orderId: generateRandomNum(),
  docId: 0,
  content: [
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
  ],
} satisfies RCDocs

const RCDocsArr:RCDocs[] = [];


INPROGRESS.forEach((order) => {
  const {id} = order

  const newRCDocs = {
    ...RCDocs,
    orderId: id,
    docId: generateRandomNum(),
  };

  RCDocsArr.push(newRCDocs);

});


const initialState: IOrder = {
  RCDocsArr,
  ordersData: INPROGRESS,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateRCDocs: (state, { payload }: { payload: UpdateRCDocsPayload }) => {
      return {
        ...state,
        RCDocsArr: [
          ...state.RCDocsArr.map((doc) => {
            if (doc.orderId === payload.orderId) {
              return {
                ...doc,
                content: doc.content.map((content) => {
                  if (content.name === payload.content.name) {
                    return {
                      ...content,
                      status: payload.content.status,
                      submitted: payload.content.submitted,
                    };
                  }
                  return content;
                }),
              };
            }
            return doc;
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
