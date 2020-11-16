import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumList } from '../store/actions/albumActions';
import { Link } from 'react-router-dom';

const Albums = ({ location, history }) => {

  const dispatch = useDispatch();
  const albums = useSelector(state => state.album.albumList);

  const params = new URLSearchParams(location.search);
  const queryId = params.get('artist');

  useEffect(() => {
    dispatch(fetchAlbumList(queryId));
  }, [dispatch, queryId]);

  const artist = albums.find(album => album._id === albums[0]._id);

  const albumClickHandler = (id) => {
    history.push(`/tracks?album=${id}`);
  };

  return (
    <>
      <div className='albumHeader py-3'>
        <h4>{artist? artist.artist.name : ''}'s albums</h4>
        <div>
          <Link className='btn btn-light' to='/'>Go back to artists list</Link>
        </div>
      </div>
      {albums.map(album => {
        return (
          <div
            className='album'
            onClick={() => albumClickHandler(album._id)}
            key={album._id}
          >
            <img
              src={`http://localhost:8000/uploads/${album.image}`}
              alt="" width="100px"/>
            <div>
              <h4>{album.name}</h4>
              <p>Released in <strong>{album.released_date}</strong></p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Albums;