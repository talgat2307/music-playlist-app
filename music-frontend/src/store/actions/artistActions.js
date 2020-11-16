import {
  ARTIST_FAILURE,
  ARTIST_LIST_FAILURE,
  ARTIST_LIST_REQUEST,
  ARTIST_LIST_SUCCESS, ARTIST_REQUEST, ARTIST_SUCCESS,
} from '../actionTypes';
import axiosApi from '../../axios';

const artistListRequest = () => {
  return { type: ARTIST_LIST_REQUEST };
};

const artistListSuccess = (artistList) => {
  return { type: ARTIST_LIST_SUCCESS, artistList };
};

const artistListFailure = (error) => {
  return { type: ARTIST_LIST_FAILURE, error };
};

const artistRequest = () => {
  return { type: ARTIST_REQUEST };
};

const artistSuccess = (artist) => {
  return { type: ARTIST_SUCCESS, artist };
};

const artistFailure = (error) => {
  return { type: ARTIST_FAILURE, error };
};

export const fetchArtistList = () => {
  return async dispatch => {
    dispatch(artistListRequest());
    try {
      const response = await axiosApi('/artists');
      dispatch(artistListSuccess(response.data));
    } catch (e) {
      dispatch(artistListFailure(e));
    }
  };
};

export const fetchArtist = (id) => {
  return async dispatch => {
    dispatch(artistRequest());
    try {
      const response = await axiosApi(`/artists/${id}`);
      dispatch(artistSuccess(response.data));
    } catch (e) {
      dispatch(artistFailure(e));
    }
  };
};
