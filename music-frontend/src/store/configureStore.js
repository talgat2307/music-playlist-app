import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import artistReducers from './reducers/artistReducers';
import albumReducers from './reducers/albumReducers';
import trackReducers from './reducers/trackReducers';
import userReducers from './reducers/userReducers';
import trackHistoryReducers from './reducers/trackHistoryReducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  artist: artistReducers,
  album: albumReducers,
  track: trackReducers,
  user: userReducers,
  trackHistory: trackHistoryReducers,
  router: connectRouter(history),
});

const persistedState = loadFromLocalStorage();

const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
];

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(...middleware)));

store.subscribe(() => {
  saveToLocalStorage({
    user: {
      userInfo: store.getState().user.userInfo,
    },
  });
});

export default store;