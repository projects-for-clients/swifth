import { AppState } from '../../app/store';
import { createSlice } from '@reduxjs/toolkit';


export interface IUser {
 
  firstName: string;
  lastName: string;
  email: string;
  
}


const initialState: IUser = {
  firstName: '',
  lastName: '',
  email: ''
}

export const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    
    updateUser(state, action) {
      const payload = action.payload;

     console.log(payload)

     const values = Object.entries(payload)

     values.forEach((item) => {
      console.log(item)
      const [key, value] = item

      console.log(key, value)
     })

      state = payload

      // for(let i in payload){
      //   state[i] = payload[i]
      // }

      // Object.entries(payload).forEach((field) => {
      //   state[field as keyof IUser] = field[1] as string;
      // });
    },
    clearUser(state, action) {
      console.log('++++++++++++++clearing user');
      state = initialState;
    },
   
  },

  extraReducers: (builder) => {},
});

export const { clearUser, updateUser } =
  userSlice.actions;

export const selectUser = (state: AppState) => state.user;


export default userSlice.reducer;
