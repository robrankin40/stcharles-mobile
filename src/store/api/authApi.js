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
        url: 'users/join',
        method: 'POST',
        body: {email, inviteCode},
      }),
      invalidatesTags: ['Auth'],
    }),
    updatePassword: builder.mutation({
      query: ({email, password}) => ({
        url: 'users/update-password',
        method: 'PUT',
        body: {email, password},
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {useLoginMutation} = authApi;
