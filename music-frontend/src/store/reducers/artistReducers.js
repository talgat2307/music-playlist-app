import {
  ARTIST_FAILURE,
  ARTIST_LIST_FAILURE,
  ARTIST_LIST_REQUEST,
  ARTIST_LIST_SUCCESS, ARTIST_REQUEST, ARTIST_SUCCESS,
} from '../actionTypes';

const initialState = {
  loading: false,
  error: null,
  artistList: [],
  allArtist: [],
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
    default:
      return state;
  }
};

export default artistReducers;