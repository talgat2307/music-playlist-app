import {
  ALBUM_LIST_FAILURE,
  ALBUM_LIST_REQUEST,
  ALBUM_LIST_SUCCESS,
} from '../actionTypes';

const initialState = {
  loading: false,
  error: null,
  albumList: [],
};

const albumReducers = (state = initialState, action) => {
  switch (action.type) {
    case ALBUM_LIST_REQUEST:
      return { ...state, loading: true };
    case ALBUM_LIST_SUCCESS:
      return { ...state, loading: false, albumList: action.albumList };
    case ALBUM_LIST_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default albumReducers;