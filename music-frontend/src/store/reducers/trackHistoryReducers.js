import {
  POST_TRACK_HISTORY_FAILURE,
  POST_TRACK_HISTORY_SUCCESS, TRACK_HISTORY_FAILURE, TRACK_HISTORY_SUCCESS,
} from '../actionTypes';

const initialState = {
  error: null,
  trackHistory: null,
};

const trackHistoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case POST_TRACK_HISTORY_SUCCESS:
      return { ...state, error: null };
    case POST_TRACK_HISTORY_FAILURE:
      return { ...state, error: action.error };
    case TRACK_HISTORY_SUCCESS:
      return { ...state, error: null, trackHistory: action.trackHistory };
    case TRACK_HISTORY_FAILURE:
      return { ...state, error: action.error };
    default:
      return state
  }
};

export default trackHistoryReducers;