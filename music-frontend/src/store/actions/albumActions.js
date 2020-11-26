import { push } from 'connected-react-router';
import {
  ADD_ALBUM_FAILURE,
  ADD_ALBUM_SUCCESS,
  ALBUM_LIST_FAILURE,
  ALBUM_LIST_REQUEST,
  ALBUM_LIST_SUCCESS,
  ALL_ALBUM_FAILURE,
  ALL_AlBUM_SUCCESS,
  DELETE_ALBUM,
  PUBLISH_ALBUM_SUCCESS,
} from '../actionTypes';
import axiosApi from '../../axios';

const albumListRequest = () => {
  return { type: ALBUM_LIST_REQUEST };
};

const albumListSuccess = (albumList) => {
  return { type: ALBUM_LIST_SUCCESS, albumList };
};

const albumListFailure = (error) => {
  return { type: ALBUM_LIST_FAILURE, error };
};

export const fetchAlbumList = (id) => {
  return async dispatch => {
    dispatch(albumListRequest());
    try {
      const response = await axiosApi(`/albums?artist=${id}`);
      dispatch(albumListSuccess(response.data));
    } catch (e) {
      dispatch(albumListFailure(e));
    }
  };
};

const allAlbumSuccess = (allAlbumList) => {
  return { type: ALL_AlBUM_SUCCESS, allAlbumList };
};

const allAlbumFailure = (error) => {
  return { type: ALL_ALBUM_FAILURE, error };
};

export const fetchAllAlbums = () => {
  return async dispatch => {
    try {
      const response = await axiosApi('/albums');
      dispatch(allAlbumSuccess(response.data));
    } catch (e) {
      dispatch(allAlbumFailure(e));
    }
  };
};

const addAlbumSuccess = () => {
  return { type: ADD_ALBUM_SUCCESS };
};

const addAlbumFailure = (error) => {
  return { type: ADD_ALBUM_FAILURE, error };
};

export const addAlbum = (album) => {
  return async (dispatch, getState) => {

    const token = getState().user.userInfo.user.token;
    const headers = { 'Authorization': token };

    try {
      await axiosApi.post('/albums', album, { headers });
      dispatch(addAlbumSuccess());
      dispatch(push('/'));
    } catch (e) {
      dispatch(addAlbumFailure(e));
    }
  };
};

const deleteAlbum = (id) => {
  return { type: DELETE_ALBUM, id };
};

export const deleteSingleAlbum = (id) => {
  return async (dispatch, getState) => {
    const token = getState().user.userInfo.user.token;
    const headers = { 'Authorization': token };

    await axiosApi.delete(`/albums/${id}` , {headers});
    dispatch(deleteAlbum(id));
  };
};

const publishAlbumSuccess = () => {
  return { type: PUBLISH_ALBUM_SUCCESS };
};

export const publishAlbum = (id) => {
  return async (dispatch, getState) => {
    const token = getState().user.userInfo.user.token;
    const headers = { 'Authorization': token };

    await axiosApi.put(`/albums/${id}`, {}, {headers});
    dispatch(publishAlbumSuccess());
  };
};
