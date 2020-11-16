import {
  ALL_TRACK_FAILURE,
  ALL_TRACK_SUCCESS,
  TRACK_LIST_FAILURE,
  TRACK_LIST_REQUEST,
  TRACK_LIST_SUCCESS,
} from '../actionTypes';

const initialState = {
  loading: false,
  error: null,
  trackList: [],
  allTrackList: []
};

const trackReducers = (state = initialState, action) => {
  switch (action.type) {
    case TRACK_LIST_REQUEST:
      return { ...state, loading: true };
    case TRACK_LIST_SUCCESS:
      return { ...state, loading: false, trackList: action.trackList };
    case TRACK_LIST_FAILURE:
      return { ...state, error: action.error };
    case ALL_TRACK_SUCCESS:
      return {...state, allTrackList: action.allTrackList};
    case ALL_TRACK_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
};

export default trackReducers;
