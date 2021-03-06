import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSingleAlbum,
  fetchAlbumList, publishAlbum,
} from '../store/actions/albumActions';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Albums = ({ location, history }) => {

  const dispatch = useDispatch();
  const albums = useSelector(state => state.album.albumList);
  const user = useSelector(state => state.user.userInfo);

  const params = new URLSearchParams(location.search);
  const queryId = params.get('artist');

  useEffect(() => {
    dispatch(fetchAlbumList(queryId));
  }, [dispatch, queryId]);

  const artist = albums.find(album => album._id === albums[0]._id);

  const albumClickHandler = (id) => {
    history.push(`/tracks?album=${id}`);
  };

  const deleteHandler = (id) => {
    dispatch(deleteSingleAlbum(id));
  };

  const publishHandler = (id) => {
    dispatch(publishAlbum(id));
  };

  let albumPage;

  if (user && user.role === 'admin') {
    albumPage = (
      <>
        {albums && albums.map(album => {
          return (
            <div
              className='album'
              key={album._id}
            >
              <img
                onClick={() => albumClickHandler(album._id)}
                src={`http://localhost:8000/uploads/${album.image}`}
                alt="" width="100px"/>
              <div>
                <h4>{album.name}</h4>
                <p>Released in <strong>{album.released_date}</strong></p>
                {album.published ?
                  <p className='published-album text-success'>Published</p>
                  :
                  <p className='published-album text-danger'>Unpublished</p>}
                <div className='album-btn'>
                  <Button
                    onClick={() => publishHandler(album._id)}
                    variant='success'>Publish</Button>
                  <Button
                    onClick={() => deleteHandler(album._id)}
                    variant='danger'>Delete</Button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  if (user && user.role === 'user') {
    albumPage = (
      <>
        {albums && albums.map(album => {
          return (
            <div key={album._id}>
              {album.published ?
                <div
                  className='album'
                  key={album._id}
                >
                  <img
                    onClick={() => albumClickHandler(album._id)}
                    src={`http://localhost:8000/uploads/${album.image}`}
                    alt="" width="100px"/>
                  <div>
                    <h4>{album.name}</h4>
                    <p>Released in <strong>{album.released_date}</strong></p>
                  </div>
                </div> : ''}
            </div>
          );
        })}
      </>
    );
  }

  return (
    <>
      <div className='albumHeader py-3'>
        <h4>{artist ? artist.artist.name + ' \'s albums' : ''}</h4>
        <div>
          <Link className='btn btn-light' to='/'>Go back to artists list</Link>
        </div>
      </div>
      {albumPage}
    </>
  );
};

export default Albums;