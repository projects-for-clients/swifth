import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../app/store';
import {
  InProgress,
  INPROGRESS,
} from '../../../components/dashboard/order/OrdersData';

export type RCDocsKeys = 'Bills of Lading' | 'Releases' | 'CAC' | 'Signed POA';
export type ClearingKeys = 'Valuating' | 'Duty Processing' | 'Custom Releasing';
type DocStatus = 'Approved' | 'Declined' | null;

export type DocsContent = {
  name: RCDocsKeys | ClearingKeys;
  status: DocStatus;
  submitted: boolean;
};
interface UpdateRCDocsPayload {
  orderId: number;
  content: DocsContent;
}
interface IDocs {
  orderId: number;
  docId: number;
  content: DocsContent[];
}

interface IOrder {
  RCDocsArr: IDocs[];
  clearingDocsArr: IDocs[];
  ordersData: InProgress[];
}

const generateRandomNum = () => Math.floor(100000 + Math.random() * 900000);

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
} satisfies IDocs;

const clearingDocs = {
  orderId: generateRandomNum(),
  docId: 0,
  content: [
    {
      name: 'Valuating',
      status: null,
      submitted: true,
    },
    {
      name: 'Duty Processing',
      status: null,
      submitted: false,
    },
    {
      name: 'Custom Releasing',
      status: null,
      submitted: false,
    },
  ],
} satisfies IDocs;

const RCDocsArr: IDocs[] = [];
const clearingDocsArr: IDocs[] = [];

INPROGRESS.forEach((order) => {
  const { id } = order;

  const newRCDocs = {
    ...RCDocs,
    orderId: id,
    docId: generateRandomNum(),
  };
  const newClearingDocs = {
    ...clearingDocs,
    orderId: id,
    docId: generateRandomNum(),
  };

  RCDocsArr.push(newRCDocs);
  clearingDocsArr.push(newClearingDocs);
});

const initialState: IOrder = {
  RCDocsArr,
  clearingDocsArr,
  ordersData: INPROGRESS,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateRCDocs: (state, { payload }: { payload: UpdateRCDocsPayload }) => {
   

      const { orderId, content } = payload;

      const updatedRCDocsArr = state.RCDocsArr.map((doc) => {
        if (doc.orderId !== orderId) return doc;

        const updatedContent = doc.content.map((c) =>
          c.name === content.name ? { ...c, ...content } : c
        );

        return { ...doc, content: updatedContent };
      });

      return { ...state, RCDocsArr: updatedRCDocsArr };
    },

    updateClearingDoc: (
      state,
      { payload }: { payload: UpdateRCDocsPayload }
    ) => {
      const { orderId, content } = payload;
      const updatedClearingDoc = state.clearingDocsArr.reduce(
        (acc: IDocs[], doc) => {
          if (doc.orderId === orderId) {
            const updatedContent = doc.content.map((c) =>
              c.name === content.name ? { ...c, ...content } : c
            );
            acc.push({ ...doc, content: updatedContent });
          } else {
            acc.push(doc);
          }
          return acc;
        },
        []
      );
      return { ...state, clearingDocsArr: updatedClearingDoc };
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

export const { updateRCDocs, updateClearingDoc, assignAgentHandler } = orderSlice.actions;

export const selectOrder = (state: AppState) => state.order;

export default orderSlice.reducer;
