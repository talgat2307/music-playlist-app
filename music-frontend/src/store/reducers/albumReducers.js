import {
  ADD_ALBUM_FAILURE,
  ALBUM_LIST_FAILURE,
  ALBUM_LIST_REQUEST,
  ALBUM_LIST_SUCCESS,
  ALL_ALBUM_FAILURE,
  ALL_AlBUM_SUCCESS,
  DELETE_ALBUM,
  PUBLISH_ALBUM_SUCCESS,
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
    case DELETE_ALBUM:
      return {
        ...state,
        albumList: state.albumList.filter(album => album._id !== action.id),
      };
    case PUBLISH_ALBUM_SUCCESS:
      const index = state.albumList.findIndex(album => album._id === action.id);
      if (index !== -1) {
        const copyState = [...state.albumList];
        const copyObj = { ...copyState[index] };
        copyObj.published = true;
        copyState[index] = copyObj;
        return { ...state, albumList: copyState };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default albumReducers;