import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSingleTrack,
  fetchTrackList, publishTrack,
} from '../store/actions/trackActions';
import { Link } from 'react-router-dom';
import { fetchArtist } from '../store/actions/artistActions';
import { postTrackHistory } from '../store/actions/trackHistoryActions';
import { Button } from 'react-bootstrap';

const Tracks = ({ location }) => {

  const dispatch = useDispatch();
  const tracks = useSelector(state => state.track.trackList);
  const artist = useSelector(state => state.artist.artist);
  const user = useSelector(state => state.user.userInfo);


  const params = new URLSearchParams(location.search);
  const queryId = params.get('album');

  useEffect(() => {
    dispatch(fetchTrackList(queryId));
  }, [dispatch, queryId]);

  const album = tracks.find(track => track._id === tracks[0]._id);

  useEffect(() => {
    if (album) {
      dispatch(fetchArtist(album.album.artist));
    }
  }, [album, dispatch]);

  const clickHandler = (id) => {
    if (user) {
      dispatch(postTrackHistory({ track: id }));
    }
  };

  const deleteHandler = (id) => {
    dispatch(deleteSingleTrack(id));
  };

  const publishHandler = (id) => {
    dispatch(publishTrack(id));
  };

  let trackPage;

  if (user && user.role === 'admin') {
    trackPage = (
      <ul className='track'>
        {tracks && tracks.map(track => {
          return (
            <li key={track._id}>
              <p>
                {track.number}. <strong onClick={() => clickHandler(
                track._id)}>{track.name}</strong> {track.length} min
              </p>
              {track.published ?
                <p className='published-track text-success'>Published</p>
                :
                <p className='published-track text-danger'>Unpublished</p>}
              <>
                <Button
                  onClick={() => publishHandler(track._id)}
                  className='track-publish-btn'
                  variant='success'>Publish</Button>
                <Button
                  onClick={() => deleteHandler(track._id)}
                  className='track-delete-btn'
                  variant='danger'>Delete</Button>
              </>
            </li>
          );
        })}
      </ul>
    );
  }

  if (user && user.role === 'user') {
    trackPage = (
      <>
        {tracks && tracks.map(track => {
          return (
            <ul key={track._id} className='track'>
              {track.published ?
                <li key={track._id}>
                  <p>
                    {track.number}. <strong onClick={() => clickHandler(
                    track._id)}>{track.name}</strong> {track.length} min
                  </p>
                </li> : ''}
            </ul>
          );
        })}
      </>
    );
  }

  return (
    <>
      <div className='trackHeader py-4 mb-2'>
        <h3>{artist.name}</h3>
        <h4>{album ? album.album.name : ''}</h4>
        <div>
          <Link className='btn btn-light' to={`/albums?artist=${artist._id}`}>Go
            back to albums list</Link>
        </div>
      </div>
      {trackPage}
    </>
  );
};

export default Tracks;