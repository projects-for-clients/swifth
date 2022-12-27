import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';


import userReducer from '../features/user/user';
import user from '../features/user/user';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user.cognitoDetails', 'user.userWallet']
  // blacklist: ['competition', 'user.cognitoDetails', 'user.userWallet'],
};

const rootReducer = combineReducers({
  user: userReducer,
})


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },

      serializableCheck: false,
    }),

});

export const persistedStore = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


