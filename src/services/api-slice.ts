import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type {
  IngredientResponse,
  OrderResponse,
  OrderPayload,
  ResetPasswordResponse,
  ResetPasswordPayload,
  ChangePasswordResponse,
  ChangePasswordPayload,
  RegistrationResponse,
  RegistrationPayload,
  RefreshTokenResponse,
  UserResponse,
  User,
  OrdersQueue,
} from '@/types';
import { config } from '@/constants';
import { getItem, setItem } from '@/utils';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl,
  }),
  tagTypes: ['USER'],
  endpoints: (builder) => ({
    getIngredients: builder.query<IngredientResponse, void>({
      query: () => config.ingredients,
    }),
    createOrder: builder.mutation<OrderResponse, OrderPayload>({
      query: (payload) => ({
        url: config.orders,
        method: 'POST',
        body: payload,
        headers: {
          authorization: getItem('accessToken'),
        },
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordPayload
    >({
      query: (payload) => ({
        url: config.passwordReset,
        method: 'POST',
        body: payload,
      }),
    }),
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordPayload
    >({
      query: (payload) => ({
        url: config.newPassword,
        method: 'POST',
        body: payload,
      }),
    }),
    login: builder.mutation<
      RegistrationResponse,
      Omit<RegistrationPayload, 'name'>
    >({
      query: (payload) => ({
        url: config.login,
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          response.data.accessToken;

          setItem('accessToken', response.data.accessToken);
          setItem('refreshToken', response.data.refreshToken);
        } catch (error) {
          console.error(error);
        }
      },
    }),
    register: builder.mutation<RegistrationResponse, RegistrationPayload>({
      query: (payload) => ({
        url: config.register,
        method: 'POST',
        body: payload,
      }),
    }),
    logout: builder.mutation<ChangePasswordResponse, void>({
      query: () => ({
        url: config.logout,
        method: 'POST',
        body: {
          token: getItem('refreshToken'),
        },
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          localStorage.clear();
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          console.error(error);
        }
      },
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, void>({
      query: () => ({
        invalidatesTags: ['USER'],
        url: config.token,
        method: 'POST',
        body: {
          token: getItem('refreshToken'),
        },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          response.data.accessToken;

          setItem('accessToken', response.data.accessToken);
          setItem('refreshToken', response.data.refreshToken);
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getUser: builder.query<UserResponse, void>({
      providesTags: ['USER'],
      query: () => ({
        method: 'GET',
        url: config.user,
        headers: {
          authorization: getItem('accessToken'),
        },
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (error) {
          const err = error as Record<string, FetchBaseQueryError>;

          if (err.error.status === 403) {
            dispatch(apiSlice.endpoints.refreshToken.initiate());
          }
        }
      },
    }),
    patchUser: builder.mutation<UserResponse, Partial<User>>({
      invalidatesTags: ['USER'],
      query: (payload) => ({
        method: 'PATCH',
        url: config.user,
        body: payload,
        headers: {
          authorization: getItem('accessToken'),
        },
      }),
    }),
    getOrders: builder.query<OrdersQueue, void>({
      queryFn: () => ({
        data: { success: false, orders: [], total: 0, totalToday: 0 },
      }),
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const token = getItem('accessToken');

        const ws = new WebSocket(
          config.wsOrders.concat(`?token=${token.split(' ')[1]}`)
        );

        try {
          await cacheDataLoaded;

          ws.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            updateCachedData(() => data);
          });

          ws.addEventListener('error', (event) => {
            console.log(event, 'on error');
          });
        } catch (error) {
          console.error('WebSocket error:', error);
        }

        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetIngredientsQuery,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useGetUserQuery,
  useLogoutMutation,
  usePatchUserMutation,
  useGetOrdersQuery,
} = apiSlice;
