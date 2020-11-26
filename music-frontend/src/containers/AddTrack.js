import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAlbums } from '../store/actions/albumActions';
import { addTrack } from '../store/actions/trackActions';

const AddTrack = () => {
  const [track, setTrack] = useState({
    name: '',
    length: '',
    number: '',
    album: '',
  });

  const dispatch = useDispatch();
  const albums = useSelector(state => state.album.allAlbumList);

  useEffect(() => {
    dispatch(fetchAllAlbums());
  }, [dispatch]);

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setTrack(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    dispatch(addTrack(track));
  };

  return (
    <>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h2 className='py-4'>Add new track</h2>
            <Form onSubmit={(e) => submitFormHandler(e)}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  value={track.name}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='length'>
                <Form.Label>Length</Form.Label>
                <Form.Control
                  name='length'
                  value={track.length}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </Form.Control>
              </Form.Group>


              <Form.Group controlId='number'>
                <Form.Label>Number</Form.Label>
                <Form.Control
                  name='number'
                  value={track.number}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Album</Form.Label>
                <Form.Control
                  name='album'
                  value={track.album}
                  onChange={(e) => inputChangeHandler(e)}
                  as="select"
                >
                  <option hidden>Select album</option>
                  {albums && albums.map(album => {
                    return (
                      <option
                        key={album._id}
                        value={album._id}
                      >
                        {album.name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>

              <Button className='mt-3' type='submit' variant='primary'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddTrack;