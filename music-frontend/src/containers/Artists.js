import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSingleArtist,
  fetchArtistList, publishArtist,
} from '../store/actions/artistActions';
import { Button } from 'react-bootstrap';

const Artists = props => {

  const dispatch = useDispatch();
  const artists = useSelector(state => state.artist.artistList);
  const user = useSelector(state => state.user.userInfo);


  useEffect(() => {
    dispatch(fetchArtistList());
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch(deleteSingleArtist(id));
  };

  const publishHandler = (id) => {
    dispatch(publishArtist(id));
  };

  const artistClickHandler = (id) => {
    props.history.push(`/albums?artist=${id}`);
  };

  let artistPage;

  if (user && user.role === 'admin') {
    artistPage = (
      <>
        {artists && artists.map(artist => {
          return (
            <div
              className='artist'
              key={artist._id}
            >
              <img
                onClick={() => artistClickHandler(artist._id)}
                src={`http://localhost:8000/uploads/${artist.image}`}
                alt="" width="90px" height='90px'/>
              <h4>{artist.name}</h4>
              {artist.published ?
                <p className='published text-success'>Published</p>
                :
                <p className='published text-danger'>Unpublished</p>}
              <div className='artist-btn'>
                <Button
                  onClick={() => publishHandler(artist._id)}
                  variant='success'>Publish</Button>
                <Button
                  onClick={() => deleteHandler(artist._id)}
                  variant='danger'>Delete</Button>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  if (user && user.role === 'user') {
    artistPage = (
      <>
        {artists && artists.map(artist => {
          return (
            <div key={artist._id}>
              {artist.published ?
                <div
                  className='artist'
                  key={artist._id}
                >
                  <img
                    onClick={() => artistClickHandler(artist._id)}
                    src={`http://localhost:8000/uploads/${artist.image}`}
                    alt="" width="90px" height='90px'/>
                  <h4>{artist.name}</h4>
                </div> : '' }
            </div>
          );
        })}
      </>
    )
  }

  return (
    <>
      <h4 className='py-3'>List of artists</h4>
      {artistPage}
    </>
  );
};

export default Artists;