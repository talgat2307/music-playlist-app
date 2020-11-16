import {
  ALL_TRACK_FAILURE,
  ALL_TRACK_SUCCESS,
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