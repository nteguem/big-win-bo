import * as types from './types';

export const fetchAvailableDays = () => ({
  type: types.FETCH_AVAILABLE_DAYS,
});

export const fetchCountries = (params) => ({
  type: types.FETCH_COUNTRIES,
  payload: params,
});

export const fetchLeagues = (params) => ({
  type: types.FETCH_LEAGUES,
  payload: params,
});

export const fetchMatches = (params) => ({
  type: types.FETCH_MATCHES,
  payload: params,
});
