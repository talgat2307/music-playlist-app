import {
  POST_TRACK_HISTORY_FAILURE,
  POST_TRACK_HISTORY_SUCCESS, TRACK_HISTORY_FAILURE, TRACK_HISTORY_SUCCESS,
} from '../actionTypes';
import axiosApi from '../../axios';

const postTrackHistorySuccess = () => {
  return { type: POST_TRACK_HISTORY_SUCCESS };
};

const postTrackHistoryFailure = (error) => {
  return { type: POST_TRACK_HISTORY_FAILURE, error };
};

export const postTrackHistory = (trackHistory) => {
  return async (dispatch, getState) => {
    const headers = {
      'Authorization': getState().user.userInfo && getState().user.userInfo.user.token
    };
    try {
      await axiosApi.post('/track_history', trackHistory, {headers} );
      dispatch(postTrackHistorySuccess());
    } catch (e) {
      dispatch(postTrackHistoryFailure(e));
    }
  };
};

const trackHistorySuccess = (trackHistory) => {
  return { type: TRACK_HISTORY_SUCCESS, trackHistory };
};

const trackHistoryFailure = (error) => {
  return { type: TRACK_HISTORY_FAILURE, error };
};

export const fetchTrackHistory = () => {
  return async (dispatch, getState) => {
    const headers = {
      'Authorization': getState().user.userInfo && getState().user.userInfo.user.token
    };
    try {
      const response = await axiosApi('/track_history', {headers});
      dispatch(trackHistorySuccess(response.data));
    } catch (e) {
      dispatch(trackHistoryFailure(e));
    }
  };
};