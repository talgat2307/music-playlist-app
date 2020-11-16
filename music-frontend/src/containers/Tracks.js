import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrackList } from '../store/actions/trackActions';
import { Link } from 'react-router-dom';
import { fetchArtist } from '../store/actions/artistActions';
import { postTrackHistory } from '../store/actions/trackHistoryActions';

const Tracks = ({ location }) => {

  const dispatch = useDispatch();
  const tracks = useSelector(state => state.track.trackList);
  const artist = useSelector(state => state.artist.artist);

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
    dispatch(postTrackHistory({track: id}));
  };

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
      <ul className='track'>
        {tracks.map(track => {
          return (
            <li key={track._id} onClick={() => clickHandler(track._id)}>
              <p>{track.number}. <strong>{track.name}</strong> {track.length} min
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Tracks;