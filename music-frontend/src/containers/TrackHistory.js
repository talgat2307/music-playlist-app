import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrackHistory } from '../store/actions/trackHistoryActions';
import { fetchArtist } from '../store/actions/artistActions';
import { fetchAllTracks } from '../store/actions/trackActions';

const TrackHistory = () => {

  const dispatch = useDispatch();
  const trackHistory = useSelector(state => state.trackHistory.trackHistory);
  const tracks = useSelector(state => state.track.allTrackList);
  const artist = useSelector(state => state.artist.artistList);


  useEffect(() => {
    dispatch(fetchAllTracks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTrackHistory());
  }, [dispatch]);

  let albums = [];

  if (trackHistory) {
    for (let i = 0; i < trackHistory.length; i++) {
      albums.push(
        tracks.find(track => track._id === trackHistory[i].track._id));
    }
  }

  useEffect(() => {
    if (albums) {
      for (let i = 0; i < albums.length; i++) {
        dispatch(fetchArtist(albums[i].album.artist));
      }
    }
  }, [dispatch, albums]);

  // Не успел правильно поставить имя исполнителя в Track History


  return (
    <div>
      <h3 className='pb-2'>Track Histories</h3>
      {trackHistory && trackHistory.map(track => {
        return (
          <li className='py-2' key={track._id}>
            <strong>{track.track.name}</strong> ({track.datetime})
          </li>
        );
      })}
    </div>
  );
};

export default TrackHistory;