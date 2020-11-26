import {
  ADD_ALBUM_FAILURE,
  ALBUM_LIST_FAILURE,
  ALBUM_LIST_REQUEST,
  ALBUM_LIST_SUCCESS, ALL_ALBUM_FAILURE, ALL_AlBUM_SUCCESS, DELETE_ALBUM,
} from '../actionTypes';

const initialState = {
  loading: false,
  error: null,
  albumList: [],
  allAlbumList: [],
};

const albumReducers = (state = initialState, action) => {
  switch (action.type) {
    case ALBUM_LIST_REQUEST:
      return { ...state, loading: true };
    case ALBUM_LIST_SUCCESS:
      return { ...state, loading: false, albumList: action.albumList };
    case ALBUM_LIST_FAILURE:
      return { ...state, error: action.error };
    case ALL_AlBUM_SUCCESS:
      return { ...state, allAlbumList: action.allAlbumList };
    case ALL_ALBUM_FAILURE:
      return { ...state, error: action.error };
    case ADD_ALBUM_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default albumReducers;