import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrackHistory } from '../store/actions/trackHistoryActions';

const TrackHistory = () => {

  const dispatch = useDispatch();
  const trackHistory = useSelector(state => state.trackHistory.trackHistory);


  useEffect(() => {
    dispatch(fetchTrackHistory());
  }, [dispatch]);


  return (
    <div>
      <h3 className='pb-2'>Track Histories</h3>
      {trackHistory && trackHistory.map(track => {
        return (
          <li className='py-2' key={track._id}>
            {track.track.album.artist.name} <strong>"{track.track.name}"</strong> ({track.datetime})
          </li>
        );
      })}
    </div>
  );
};

export default TrackHistory;