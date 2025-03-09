import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from '@mui/material';



function CollectionPage() {
  const dispatch = useDispatch();
  const collection = useSelector((store) => store.albumList);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    getAlbumList();
  }, []);

  const getAlbumList = () => {
    dispatch({ type: 'FETCH_ALBUM_LIST' });
  };

  const userCollection = collection.filter((item) => item.user_id === user.id);

  const sortedByArtist = [...userCollection].sort((a, b) => {
    if (a.artist_name < b.artist_name) {
      return -1;
    }
    if (a.artist_name > b.artist_name) {
      return 1;
    }
    return 0;
  });

  const mostRecentAlbums = userCollection
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  const deleteAlbum = (id) => {
    dispatch({ type: 'DELETE_ALBUM', payload: id });
  };

  const ImageCard = ({ item }) => {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = () => {
      setShowModal(true);
    };

    const handleDelete = (id) => {
      deleteAlbum(id);
    };

    const handleEdit = (id) => {
      history.push(`/edit-album/${id}`);
    };

    return (
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          margin: '10px',
          cursor: 'pointer',
        }}
      >
        <img
          src={item.album_artwork}
          alt={item.album_name}
          style={{ width: '200px', height: '200px' }}
          onClick={handleCardClick}
        />
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              backgroundColor: '#fef8e1',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              textAlign: 'center',
            }}
          >
            <img
              src={item.album_artwork}
              alt={item.album_name}
              style={{ width: '200px', height: '200px' }}
            />
            <p>Artist: {item.artist_name}</p>
            <p>Album: {item.album_name}</p>
            <p>Release Date: {item.release_date}</p>
            <p>Tracklist:</p>
            {item.tracklist && item.tracklist.length > 0 ? (
              <ul style={{ textAlign: 'left' }}>
                {(typeof item.tracklist === "string" ? item.tracklist.split(',') : item.tracklist).map((track, index) => (
                  <li key={index}>{String(track).replace(/['"{}']/g, "").trim()}</li>
                ))}
            </ul>
          ) : (
          <p>No tracklist available</p>
          )}
          
            <div style={{ margin: '10px 0' }}>
              <Button
                variant="contained"
                onClick={() => handleDelete(item.id)}
                sx={{ backgroundColor: '#192B3E', '&:hover': { backgroundColor: '#0F1722' } }}
              >
                Remove from Collection
              </Button>
            </div>
            <div style={{ margin: '10px 0' }}>
              <Button
                variant="contained"
                onClick={() => handleEdit(item.id)}
                sx={{ backgroundColor: '#192B3E', '&:hover': { backgroundColor: '#0F1722' } }}
              >
                Edit Record
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  };

  

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Record Collection</h1>
      <br />
      <br />
      <br />
      <h2>Recently Added</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {mostRecentAlbums.map((item, index) => (
          <ImageCard key={item.id || index} item={item} />
        ))}
      </div>
      <h2>My Full Collection</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {sortedByArtist.map((item, index) => (
          <ImageCard key={item.id || index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default CollectionPage;
