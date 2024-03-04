import {api} from './api';

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: ({email, password}) => ({
        url: 'auth/login',
        method: 'POST',
        body: {email, password},
      }),
      invalidatesTags: ['Auth'],
    }),
    join: builder.mutation({
      query: ({email, inviteCode}) => ({
        url: 'auth/join',
        method: 'POST',
        body: {email, inviteCode},
      }),
      invalidatesTags: ['Auth'],
    }),
    updatePassword: builder.mutation({
      query: ({oldPassword, password}) => ({
        url: 'users/update-password',
        method: 'PUT',
        body: {oldPassword, password},
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {useLoginMutation, useJoinMutation, useUpdatePasswordMutation} =
  authApi;
