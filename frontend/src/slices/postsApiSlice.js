import { apiSlice } from "./apiSlice";
const POSTS_URL = "/api/posts";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/new`,
        method: "POST",
        body: data,
      }),
    }),
    getPosts: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const { useCreateMutation, useGetPostsMutation } = postsApiSlice;
