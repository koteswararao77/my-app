import { createApi } from "@reduxjs/toolkit/query/react";
import { GetDataParams, GetResponse, PostPayload } from "../types/types";
import { customBaseQuery } from "../../../customBaseQuery";

export const rtkGetPostApi = createApi({
  reducerPath: "rtkGetPostApi",
  baseQuery: customBaseQuery,
  tagTypes: ["rtkGetPostApi"],
  endpoints: (builder) => ({
    getData: builder.query<GetResponse[], void>({
      query: () => "users",
      providesTags: ["rtkGetPostApi"],
    }),

// to pass params 

//     builder.query<any, GetMarketParams>({
//   query: ({ adminId, marketType }) => ({
//     url: `market-details/mrktpower/adminId/${adminId}`,
//     params: { marketType }, //
//   }),

    postData: builder.mutation<any, PostPayload>({
      query: (body) => ({
        url: "posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["rtkGetPostApi"],
    }),
  }),
});


export const {
    useGetDataQuery,  // getData  --->>  useGetDataQuery
    usePostDataMutation,  //  postData --->> usePostDataMutation
} = rtkGetPostApi;

export const useGetData = useGetDataQuery;
export const usePostData = usePostDataMutation;
