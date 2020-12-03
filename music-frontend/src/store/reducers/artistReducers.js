import {
  ADD_ARTIST_FAILURE,
  ARTIST_FAILURE,
  ARTIST_LIST_FAILURE,
  ARTIST_LIST_REQUEST,
  ARTIST_LIST_SUCCESS,
  ARTIST_REQUEST,
  ARTIST_SUCCESS,
  DELETE_ARTIST, PUBLISH_ARTIST_SUCCESS,
} from '../actionTypes';

const initialState = {
  loading: false,
  error: null,
  artistList: [],
  artist: {},
};

const artistReducers = (state = initialState, action) => {
  switch (action.type) {
    case ARTIST_LIST_REQUEST:
      return { ...state, loading: true };
    case ARTIST_LIST_SUCCESS:
      return { ...state, loading: false, artistList: action.artistList };
    case ARTIST_LIST_FAILURE:
      return { ...state, loading: false, error: action.error };
    case ARTIST_REQUEST:
      return { ...state, loading: true };
    case ARTIST_SUCCESS:
      return { ...state, loading: false, artist: action.artist };
    case ARTIST_FAILURE:
      return { ...state, error: action.error };
    case ADD_ARTIST_FAILURE:
      return { ...state, error: action.error };
    case DELETE_ARTIST:
      return {
        ...state,
        artistList: state.artistList.filter(artist => artist._id !== action.id),
      };
    case PUBLISH_ARTIST_SUCCESS:
      const index = state.artistList.findIndex(
        artist => artist._id === action.id);
      if (index !== -1) {
        const copyState = [...state.artistList];
        const copyObj = { ...copyState[index] };
        copyObj.published = true;
        copyState[index] = copyObj;
        return { ...state, artistList: copyState };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default artistReducers;