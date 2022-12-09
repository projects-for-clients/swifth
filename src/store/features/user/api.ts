import { createAsyncThunk } from '@reduxjs/toolkit';
import { Auth, API, Storage } from 'aws-amplify';
import * as queries from '../../../graphql/queries';
import * as mutations from '../../../graphql/mutations';
import * as subscriptions from '../../../graphql/subscriptions';
import * as custom from '../../../graphql/customcall';
import { Competition } from '../../../API';
import { IUser } from './user';
import { selectUser } from './user';
import { useAppSelector } from '../../app/hooks';
import { CompetitionProps } from '../../../Components/Tournaments';
import { handleInputProps } from '../../../Components/Auth/RegisterContainer';
import { getUserWallet } from '../../../graphql/queries';

interface IAuth {
  email: string;
  password: string;
}

interface WalletData {
  amount: number;
  userId: string;
}

interface RazorpayData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  tableId: string;
  amount: number;
}

interface CreateUserWallet {
  userId: string;
  inputAmount: number;
  rewardAmount?: number;
}

interface UpdateUserWallet {
  inputAmount: number;
  userId: string;
}

interface PlayerData {
  userId: string;
  competitionId: string;
  status: 'Live' | 'Register' | 'Completed';
}

export const signUp = createAsyncThunk(
  'user/signUp',
  async ({ email, password }: IAuth) => {
    try {
      console.log('ENTERED SignUp Thunk');
      const user = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },

        autoSignIn: {
          enabled: true,
        },
      });

      console.log({ user });
      return user;
    } catch (err) {
      console.log('Error in AUth.signUp', err);
      return err;
    }
  }
);
export const signIn = createAsyncThunk(
  'user/signIn',
  async ({ email, password }: IAuth) => {
    try {
      const { attributes } = await Auth.signIn({
        username: email,
        password,
      });
      return attributes;
    } catch (err) {
      console.log('Error in AUth.signIn', err);
      return err;
    }
  }
);
export const signOut = createAsyncThunk('user/signOut', async () => {
  try {
    const { attributes } = await Auth.signOut();

    console.log({ attributes });
    return attributes;
  } catch (err) {
    console.log('Error in AUth.signIn', err);
    return err;
  }
});

export const currentUser = createAsyncThunk('user/currentUser', async () => {
  try {
    const currUser = await Auth.currentAuthenticatedUser();
    return currUser;
  } catch (err) {
    console.log('ThunkError::Caught error in', err);
    return;
  }
});

export const fetchUserDB = createAsyncThunk(
  'user/fetchUserDB',
  async (email: string) => {
    interface UserDBVal {
      data: {
        listUsers: {
          items: IUser[];
        };
      };
    }

    try {
      const userDBVal: Partial<UserDBVal> = await API.graphql<any>({
        query: queries.listUsers,
        variables: { filter: { email: { eq: email } } },
      });

      let updatedUserDBPhoto = userDBVal;

      console.log({ userDBVal });

      const userDBPhotos = userDBVal.data?.listUsers.items[0];

      if (userDBVal.data && userDBPhotos?.profilePhoto) {
        const profilePhotoKey = userDBPhotos['profilePhoto']['key'];
        console.log({ profilePhotoKey });
        const profileUri = await Storage.get(profilePhotoKey, {
          level: 'public' || 'protected',
          bucket: 'eslamsplatformv1a19e4c525f994b3a8309e8e9a4ea8f0195344-main',
          region: 'us-east-1',
        });

        console.log({ profileUri });

        updatedUserDBPhoto = {
          ...userDBVal,
          data: {
            listUsers: {
              items: [
                {
                  ...userDBVal.data.listUsers.items[0],
                  profileUri,
                },
              ],
            },
          },
        };

        console.log({ updatedUserDBPhoto }, 'profile');
      }
      if (userDBVal.data && userDBPhotos?.coverPhoto) {
        console.log('start coverUri');
        let coverPhotoUri = userDBPhotos['coverPhoto']['key'];
        const coverUri = await Storage.get(coverPhotoUri, {
          level: 'public' || 'protected',
          bucket: 'eslamsplatformv1a19e4c525f994b3a8309e8e9a4ea8f0195344-main',
          region: 'us-east-1',
        });

        console.log({ coverUri });

        if (updatedUserDBPhoto.data){

          updatedUserDBPhoto = {
            ...updatedUserDBPhoto,
            data: {
              listUsers: {
                items: [
                  {
                    ...updatedUserDBPhoto.data.listUsers.items[0],
                    coverUri,
                  },
                ],
              },
            },
          };
        }
        else{
          updatedUserDBPhoto = {
            ...userDBVal,
            data: {
              listUsers: {
                items: [
                  {
                    ...userDBVal.data.listUsers.items[0],
                    coverUri,
                  },
                ],
              },
            },
          };
        }
      }

      console.log({ updatedUserDBPhoto }, 'cover');

      return updatedUserDBPhoto.data?.listUsers.items[0];
    } catch (err) {
      console.error('ThunkError::Caught error in fetchUserDB', err);
      return;
    }
  }
);

export const createNewUser = createAsyncThunk(
  'user/createNewUser',
  async (userData: Partial<IUser>) => {
    const userCreate = await API.graphql({
      query: mutations.createUser,
      variables: {
        input: userData,
      },

      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    return userCreate;
  }
);

export const createAddToWallet = createAsyncThunk(
  'user/createAddToWallet',
  async (walletData: WalletData) => {
    const { username } = await Auth.currentUserInfo();

    const createAddToWalletResponse = await API.graphql({
      query: `
        mutation CreateAddToWallet(
          $input: CreateAddToWalletInput!
          $condition: ModelAddToWalletConditionInput
        ) {
          createAddToWallet(input: $input, condition: $condition) {
            userId
            tableId
            body {
              id
              entity
              amount
              amount_paid
              amount_due
              currency
              receipt
              offer_id
              status
              attempts
            }
          
          }
        }
      `,

      variables: {
        input: {
          ...walletData,
          id: username,
        },
      },

      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    console.log({ createAddToWalletResponse });

    return createAddToWalletResponse;
  }
);

export const updateAddToWallet = createAsyncThunk(
  'user/updateAddToWallet',
  async (razorpayData: RazorpayData) => {
    const { username } = await Auth.currentUserInfo();
    const userdb = useAppSelector(selectUser);

    const updateAddToWalletResponse = await API.graphql({
      query: `
        mutation UpdateAddToWallet(
          $input: UpdateAddToWalletInput!
          $condition: ModelAddToWalletConditionInput
        ) {
          updateAddToWallet(input: $input, condition: $condition) {
            userId
            amount
            body {
              id
              entity
              amount
              amount_paid
              amount_due
              currency
              receipt
              offer_id
              status
              attempts
            }
          
          }
        }
      `,

      variables: {
        input: {
          id: username,
          razorpay: {
            ...razorpayData,
          },
        },
      },

      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });

    return updateAddToWalletResponse;
  }
);

export const createUserWallet = createAsyncThunk(
  'user/createUserWallet',
  async (createUserWalletData: CreateUserWallet) => {
    // const { username } = await Auth.currentUserInfo();

    console.log('createUserWalletData', createUserWalletData);

    //  console.log({ username });
    const createUserWalletResponse = await API.graphql({
      query: mutations.createUserWallet,

      variables: {
        input: {
          ...createUserWalletData,
        },
      },

      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });

    console.log({ createUserWalletResponse });

    const {
      data: { createUserWallet },
    } = createUserWalletResponse as any;

    return createUserWallet;
  }
);

export const updateUserWallet = createAsyncThunk(
  'user/updateUserWallet',
  async (updateUserWalletData: UpdateUserWallet) => {
    // const { username } = await Auth.currentUserInfo();

    const updateUserWalletResponse = await API.graphql({
      query: mutations.updateUserWallet,

      variables: {
        input: {
          ...updateUserWalletData,
        },
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });

    console.log({ updateUserWalletResponse });

    const {
      data: { updateUserWallet },
    } = updateUserWalletResponse as any;

    return updateUserWallet;
  }
);

export const fetchUserWallet = createAsyncThunk(
  'user/fetchUserWallet',
  async (userId: string) => {
    console.log('fetch user wallet action::ID of user');
    // const { username } = await Auth.currentUserInfo();

    interface FetchUserWallet {
      data: {
        getUserWallet;
      };
    }

    try {
      const fetchUserWalletResponse: Partial<FetchUserWallet> =
        await API.graphql<any>({
          query: queries.getUserWallet,
          variables: {
            userId,
          },
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        });

      console.log({ fetchUserWalletResponse });

      if (fetchUserWalletResponse.data?.getUserWallet) {
        return fetchUserWalletResponse.data?.getUserWallet;
      } else {
        return {
          inputAmount: 0,
        };
      }
    } catch (err) {
      console.log('fetchUserWalletResponse::error', err);
      return err;
    }
  }
);
export const createPlayer = createAsyncThunk(
  'user/createPlayer',
  async (playerData: PlayerData) => {
    //  const { username } = await Auth.currentUserInfo();
    const createPlayerResponse: any = await API.graphql({
      query: mutations.createPlayer,
      variables: {
        input: {
          ...playerData,
        },
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });

    console.log({ createPlayerResponse });

    const {
      data: { createPlayer },
    } = createPlayerResponse as any;

    return createPlayer;
  }
);
