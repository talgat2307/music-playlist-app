import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import store, {history} from './store/configureStore';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
