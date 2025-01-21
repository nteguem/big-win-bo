import * as types from './types';

export const fetchUsersList = (limit = 10, offset = 0) => ({
  type: types.FETCH_USERS_LIST,
  payload: { limit, offset },
});

export const updateUser = (userId, userData) => ({
  type: types.UPDATE_USER,
  payload: { userId, userData },
});

export const loginUser = (credentials) => ({
  type: types.LOGIN_REQUEST,
  payload: credentials,
});


export const addUser = (userData) => ({
  type: types.ADD_USER_REQUEST,
  payload: userData
});

export const fetchUser = (criteria) => ({
  type: types.FETCH_USER,
  payload: criteria, 
});


export const logout = () => ({
  type: types.LOGOUT,
});

export const deleteUser = (userId) => ({
  type: types.DELETE_USER_REQUEST,
  payload: userId,
});
