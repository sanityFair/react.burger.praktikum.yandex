import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IngredientResponse, OrderResponse, OrderPayload } from "@/types";
import { config } from "@/constants";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }),
  endpoints: (builder) => ({
    getIngredients: builder.query<IngredientResponse, void>({
      query: () => config.ingredients,
    }),
    createOrder: builder.mutation<OrderResponse, OrderPayload>({
      query: (payload) => ({
        url: config.orders,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetIngredientsQuery } = apiSlice;
