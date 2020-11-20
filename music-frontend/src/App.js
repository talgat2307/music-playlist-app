import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Artists from './containers/Artists';
import Albums from './containers/Albums';
import Tracks from './containers/Tracks';
import Login from './containers/Login';
import Register from './containers/Register';
import TrackHistory from './containers/TrackHistory';

const App = () => (
  <div className="App">
      <Layout>
        <Switch>
          <Route path={'/'} exact component={Artists}/>
          <Route path={'/albums'} component={Albums}/>
          <Route path={'/tracks'} component={Tracks}/>
          <Route path={'/login'} component={Login}/>
          <Route path={'/register'} component={Register}/>
          <Route path={'/track_history'} component={TrackHistory}/>
        </Switch>
      </Layout>
  </div>
);

export default App;
