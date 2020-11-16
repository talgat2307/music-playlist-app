import {
  ALBUM_LIST_FAILURE,
  ALBUM_LIST_REQUEST,
  ALBUM_LIST_SUCCESS,
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
