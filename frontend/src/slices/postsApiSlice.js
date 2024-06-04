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
      invalidatesTags: ["Post"],
    }),
    getPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getPost: builder.query({
      query: (id) => ({
        url: `${POSTS_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateMutation, useGetPostsQuery, useGetPostQuery } =
  postsApiSlice;
