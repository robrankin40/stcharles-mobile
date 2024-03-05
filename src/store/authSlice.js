import {createSlice} from '@reduxjs/toolkit';
import {authApi} from './api/authApi';

// const initialState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   isTempPasswordReady: false,
//   temporaryPassword: null,
//   errorMessage: null,
// };

const initialState = {
  user: {
    firstName: 'Rob',
    lastName: 'Tester',
    status: 'active',
  },
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWU1Y2U1NjRlZTJmNDJhOWU5MzZhMWIiLCJpYXQiOjE3MDk1NzkxOTAsImV4cCI6MTcxMDE4Mzk5MH0.cJULo2vzBv4Zmch7SZztiLp7shYFhdByfUxo4CkniU8',
  isAuthenticated: true,
  isTempPasswordReady: false,
  temporaryPassword: null,
  errorMessage: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    resetAuth: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addMatcher(authApi.endpoints.login.matchPending, (_, action) => {})
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = {
          email: action.payload.data.email,
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          status: action.payload.data.status,
        };
        state.isAuthenticated = true;
        state.token = action.payload.data.token;
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (_, action) => {
        return {
          ...initialState,
          errorMessage: action.payload.data.message,
        };
      })
      .addMatcher(authApi.endpoints.join.matchFulfilled, (state, action) => {
        state.isTempPasswordReady = true;
        state.temporaryPassword = action.payload.password;
      })
      .addMatcher(authApi.endpoints.join.matchRejected, (_, action) => {
        return {
          ...initialState,
          errorMessage: action.payload.data.message,
        };
      })
      .addMatcher(
        authApi.endpoints.updatePassword.matchRejected,
        (_, action) => {
          return {
            ...initialState,
            errorMessage: action.payload.data.message,
          };
        },
      );
  },
});

export const {logout, resetAuth} = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectTempPassword = state => state.auth.temporaryPassword;
export const selectIsTempPasswordReady = state =>
  state.auth.isTempPasswordReady;
export const selectAuthErrorMessage = state => state.auth.errorMessage;
export const selectUserStatus = state => state.auth.user?.status;
