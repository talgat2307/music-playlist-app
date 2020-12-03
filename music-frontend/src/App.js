import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Artists from './containers/Artists';
import Albums from './containers/Albums';
import Tracks from './containers/Tracks';
import Login from './containers/Login';
import Register from './containers/Register';
import TrackHistory from './containers/TrackHistory';
import AddArtist from './containers/AddArtist';
import AddAlbum from './containers/AddAlbum';
import AddTrack from './containers/AddTrack';
import { useSelector } from 'react-redux';

const ProtectedRout = ({isAllowed, redirectTo, ...props}) => {
  return isAllowed ? <Route {...props} /> : <Redirect to={redirectTo} />
};

const App = () => {
  const user = useSelector(state => state.user.userInfo);

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path={'/'} exact component={Artists}/>
          <Route path={'/albums'} component={Albums}/>
          <Route path={'/tracks'} component={Tracks}/>
          <ProtectedRout
            path={'/login'}
            component={Login}
            isAllowed={!user}
            redirectTo={'/'}
          />
          <ProtectedRout
            path={'/register'}
            component={Register}
            isAllowed={!user}
            redirectTo={'/'}
          />
          <Route path={'/track_history'} component={TrackHistory} />
          <Route path={'/add-artist'} component={AddArtist} />
          <Route path={'/add-album'} component={AddAlbum} />
          <Route path={'/add-track'} component={AddTrack} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
