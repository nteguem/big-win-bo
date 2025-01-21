import { call, put, takeLatest } from 'redux-saga/effects';
import { sendRequest } from '../../utils/api';
import * as types from './types';
import { toast } from 'react-toastify';

function* fetchUsersList({ payload }) {
  const { limit, offset } = payload;
  try {
    const response = yield call(sendRequest, 'GET', `user/list?limit=${limit}&offset=${offset}`);
    if (response.status === 200) {
      yield put({ type: types.FETCH_USERS_LIST_SUCCESS, payload: response.data });
    } else {
      yield put({ type: types.FETCH_USERS_LIST_FAILURE, payload: response.message });
    }
  } catch (error) {
    yield put({ type: types.FETCH_USERS_LIST_FAILURE, payload: error.message });
  }
}

function* updateUser({ payload }) {
  const { userId, userData } = payload;
  try {
    const response = yield call(sendRequest, 'PUT', `user/update?phoneNumber=${userId}`, userData);
    if (response.status === 200 || response.status === 200) {
      yield put({ type: types.UPDATE_USER_SUCCESS, payload: response.data });
      toast.success('Utilisateur mis à jour avec succès');
      userData.navigate('/utilisateurs');
    } else {
      yield put({ type: types.UPDATE_USER_FAILURE, payload: response.message });
    }
  } catch (error) {
    yield put({ type: types.UPDATE_USER_FAILURE, payload: error.message });
  }
}

function* loginUser({ payload }) {
  try {
    const response = yield call(sendRequest, 'POST', 'user/login', payload, {}, false);
    if (response.status === 200) {
      localStorage.setItem('user', JSON.stringify(response.data));
      yield put({ type: types.LOGIN_SUCCESS, payload: response.data });
    } else {
      yield put({ type: types.LOGIN_FAILURE, payload: response.message });
    }
  } catch (error) {
    yield put({ type: types.LOGIN_FAILURE, payload: error.message });
  }
}

function* addUser(action) {
  const {payload} = action;
  try {
      const response = yield call(sendRequest, 'POST', "user/add", payload);

      if (response) {
          yield put({ type: types.ADD_USER_SUCCESS, payload: response });
          toast.success(response.data.message);
          payload.navigate('/utilisateurs');
      } else {
          toast.error("Échec lors de l'ajout des données");
          yield put({ type: types.ADD_USER_FAILED, payload: "Échec lors de l'ajout des données" });
      }
  } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de l'ajout des données.");
      yield put({ type: types.ADD_USER_FAILED, payload: error.message || "Une erreur s'est produite" });
  }
}

function* fetchUser({ payload }) {
  try {
    const response = yield call(sendRequest, 'GET', `user/getOne?phoneNumber=${payload}`);
    if (response.status === 200) {
      yield put({ type: types.FETCH_USER_SUCCESS, payload: response.data.user });
    } else {
      yield put({ type: types.FETCH_USER_FAILURE, payload: response.message });
    }
  } catch (error) {
    yield put({ type: types.FETCH_USER_FAILURE, payload: error.message });
  }
}

function* deleteUser({ payload }) {
  try {
    const response = yield call(sendRequest, 'DELETE', `user/delete?phoneNumber=${payload}`);
    if (response.status === 200) {
      yield put({ type: types.DELETE_USER_SUCCESS, payload: payload });
      toast.success('Utilisateur supprimé avec succès');
      // yield put({ type: types.FETCH_USERS_LIST }); 
    } else {
      yield put({ type: types.DELETE_USER_FAILURE, payload: response.message });
    }
  } catch (error) {
    yield put({ type: types.DELETE_USER_FAILURE, payload: error.message });
    toast.error("Une erreur s'est produite lors de la suppression de l'utilisateur.");
  }
}


function* usersSaga() {
  yield takeLatest(types.FETCH_USERS_LIST, fetchUsersList);
  yield takeLatest(types.UPDATE_USER, updateUser);
  yield takeLatest(types.LOGIN_REQUEST, loginUser);
  yield takeLatest(types.ADD_USER_REQUEST, addUser);
  yield takeLatest(types.FETCH_USER, fetchUser); 
  yield takeLatest(types.DELETE_USER_REQUEST, deleteUser); 

}

export default usersSaga;



