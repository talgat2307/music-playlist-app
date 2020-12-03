import { push } from 'connected-react-router';
import {
  ADD_TRACK_FAILURE,
  ADD_TRACK_SUCCESS,
  ALL_TRACK_FAILURE,
  ALL_TRACK_SUCCESS, DELETE_TRACK, PUBLISH_TRACK_SUCCESS,
  TRACK_LIST_FAILURE,
  TRACK_LIST_REQUEST,
  TRACK_LIST_SUCCESS,
} from '../actionTypes';
import axiosApi from '../../axios';

const trackListRequest = () => {
  return { type: TRACK_LIST_REQUEST };
};

const trackListSuccess = (trackList) => {
  return { type: TRACK_LIST_SUCCESS, trackList };
};

const trackListFailure = (error) => {
  return { type: TRACK_LIST_FAILURE, error };
};

export const fetchTrackList = (id) => {
  return async dispatch => {
    dispatch(trackListRequest());
    try {
      const response = await axiosApi(`/tracks?album=${id}`);
      dispatch(trackListSuccess(response.data));
    } catch (e) {
      dispatch(trackListFailure(e));
    }
  };
};

const allTrackSuccess = (allTrackList) => {
  return { type: ALL_TRACK_SUCCESS, allTrackList };
};

const allTrackFailure = (error) => {
  return { type: ALL_TRACK_FAILURE, error };
};

export const fetchAllTracks = () => {
  return async dispatch => {
    try {
      const response = await axiosApi('/tracks');
      dispatch(allTrackSuccess(response.data));
    } catch (e) {
      dispatch(allTrackFailure(e));
    }
  };
};

const addTrackSuccess = () => {
  return { type: ADD_TRACK_SUCCESS };
};

const addTrackFailure = (error) => {
  return { type: ADD_TRACK_FAILURE, error };
};

export const addTrack = (track) => {
  return async (dispatch, getState) => {

    const token = getState().user.userInfo.token;
    const headers = { 'Authorization': token };

    try {
      await axiosApi.post('/tracks', track, { headers });
      dispatch(addTrackSuccess());
      dispatch(push('/'));
    } catch (e) {
      dispatch(addTrackFailure(e));
    }
  };
};

const deleteTrack = (id) => {
  return { type: DELETE_TRACK, id };
};

export const deleteSingleTrack = (id) => {
  return async (dispatch, getState) => {

    const token = getState().user.userInfo.token;
    const headers = { 'Authorization': token };

    await axiosApi.delete(`/tracks/${id}`, { headers });
    dispatch(deleteTrack(id));
  };
};

const publishTrackSuccess = (id) => {
  return { type: PUBLISH_TRACK_SUCCESS, id };
};

export const publishTrack = (id) => {
  return async (dispatch, getState) => {

    const token = getState().user.userInfo.token;
    const headers = { 'Authorization': token };

    await axiosApi.put(`/tracks/${id}`, {}, { headers });
    dispatch(publishTrackSuccess(id));
  };
};