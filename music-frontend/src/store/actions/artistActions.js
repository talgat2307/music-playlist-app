import { push } from 'connected-react-router';
import {
  ADD_ARTIST_FAILURE,
  ADD_ARTIST_SUCCESS,
  ARTIST_FAILURE,
  ARTIST_LIST_FAILURE,
  ARTIST_LIST_REQUEST,
  ARTIST_LIST_SUCCESS,
  ARTIST_REQUEST,
  ARTIST_SUCCESS,
  DELETE_ARTIST, PUBLISH_ARTIST_SUCCESS,
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

const artistRequest = () => {
  return { type: ARTIST_REQUEST };
};

const artistSuccess = (artist) => {
  return { type: ARTIST_SUCCESS, artist };
};

const artistFailure = (error) => {
  return { type: ARTIST_FAILURE, error };
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

const addArtistSuccess = () => {
  return { type: ADD_ARTIST_SUCCESS };
};

const addArtistFailure = (error) => {
  return { type: ADD_ARTIST_FAILURE, error };
};

export const addArtist = (artist) => {
  return async (dispatch, getState) => {
    const token = getState().user.userInfo.user.token;
    const headers = { 'Authorization': token };
    try {
      await axiosApi.post('/artists', artist, { headers });
      dispatch(addArtistSuccess());
      dispatch(push('/'));
    } catch (e) {
      dispatch(addArtistFailure(e));
    }
  };
};

const deleteArtist = (id) => {
  return { type: DELETE_ARTIST, id };
};

export const deleteSingleArtist = (id) => {
  return async (dispatch, getState) => {

    const token = getState().user.userInfo.user.token;
    const headers = { 'Authorization': token };

    await axiosApi.delete(`/artists/${id}`, { headers });
    dispatch(deleteArtist(id));
  };
};

const publishArtistSuccess = (id) => {
  return { type: PUBLISH_ARTIST_SUCCESS, id };
};

export const publishArtist = (id) => {
  return async (dispatch, getState) => {

    const token = getState().user.userInfo.user.token;
    const headers = { 'Authorization': token };

    await axiosApi.put(`/artists/${id}`, {}, { headers });
    dispatch(publishArtistSuccess());
  };
};
