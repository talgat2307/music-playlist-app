import { push } from 'connected-react-router';
import {
  LOGOUT_USER,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../actionTypes';
import axiosApi from '../../axios';

const userRegisterRequest = () => {
  return { type: USER_REGISTER_REQUEST };
};

const userRegisterSuccess = () => {
  return { type: USER_REGISTER_SUCCESS };
};

const userRegisterFailure = (error) => {
  return { type: USER_REGISTER_FAILURE, error };
};

export const registerUser = (userData) => {
  return async dispatch => {
    dispatch(userRegisterRequest());
    try {
      await axiosApi.post('/users', userData);
      dispatch(userRegisterSuccess());
      dispatch(push('/login'));
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(userRegisterFailure(e.response.data));
      } else {
        dispatch(userRegisterFailure({global: 'No internet'}))
      }
    }
  };
};

const userLoginRequest = () => {
  return { type: USER_LOGIN_REQUEST };
};

const userLoginSuccess = (userInfo) => {
  return { type: USER_LOGIN_SUCCESS, userInfo };
};

const userLoginFailure = (error) => {
  return { type: USER_LOGIN_FAILURE, error };
};

export const userLogin = (user) => {
  return async dispatch => {
    dispatch(userLoginRequest());
    try {
      const response = await axiosApi.post('/users/sessions', user);
      dispatch(userLoginSuccess(response.data));
      dispatch(push('/'));
    } catch (e) {
      dispatch(userLoginFailure(e));
    }
  };
};

const logoutUser = () => {
  return {type: LOGOUT_USER};
};

export const logout = () => {
  return async (dispatch, getState) => {

    const token = getState().user.userInfo.user.token;
    const headers = {'Authorization': token};

    await axiosApi.delete('users/sessions', {headers});
    dispatch(logoutUser());
    dispatch(push('/'));
  }
};