import * as types from './types';

const initialState = {
  users: [],
  user:null,
  loading: false,
  error: null,
  total: 0,
  currentUser: localStorage.getItem('user') || null,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_USERS_LIST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_USERS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        total: action.payload.total,
      };
    case types.FETCH_USERS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.UPDATE_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.map((user) => {
          if (user._id === action.payload._id) {
            return { ...user, ...action.payload }; 
          }
          return user;
        }),
      };
    case types.UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case types.LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case types.LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          currentUser: action.payload,
        };
      case types.LOGIN_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case types.ADD_USER_REQUEST:
          return {
            ...state,
            loading: true,
            error: null,
          };
        case types.ADD_USER_SUCCESS:
          return {
            ...state,
            loading: false,
            error: null,
          };
        case types.ADD_USER_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
      case types.LOGOUT:
          localStorage.removeItem('user');
          return {
            ...state,
            currentUser: null,
            error: null,
          };
          case types.FETCH_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload, 
      };
    case types.FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case types.DELETE_USER_SUCCESS:
  return {
    ...state,
    loading: false,
    users: state.users.filter((user) => user._id !== action.payload), 
  };
case types.DELETE_USER_FAILURE:
  return {
    ...state,
    loading: false,
    error: action.payload,
  };
    default:
      return state;
  }
}
