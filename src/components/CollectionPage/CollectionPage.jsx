import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


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

  // Sorting the collection by artist name alphabetically
  const sortedByArtist = [...userCollection].sort((a, b) => {
    if (a.artist_name < b.artist_name) {
      return -1;
    }
    if (a.artist_name > b.artist_name) {
      return 1;
    }
    return 0;
  }); 

  // Sorting the collection based on the most recent albums added
  const mostRecentAlbums = userCollection
  .sort((a, b) => b.id - a.id)
  .slice(0, 5);

  const deleteAlbum = (id) => {
    dispatch({ type: 'DELETE_ALBUM', payload: id });
  };

  const ImageCard = ({ item }) => {
    const history = useHistory();
    const [showDetails, setShowDetails] = useState(false);
  
    const handleCardClick = () => {
      setShowDetails(!showDetails);
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
        onClick={handleCardClick}
      >
        <img src={item.album_artwork} alt={item.album_name} style={{ width: '200px', height: '200px' }} />
        {showDetails && (
          <div>
            <p>Artist: {item.artist_name}</p>
            <p>Album: {item.album_name}</p>
            <p>Release Date: {item.release_date}</p>
            <p>Tracklist: {item.tracklist}</p>
            <button onClick={() => handleDelete(item.id)}>Remove From Collection</button>
            {/* <button onClick={() => handleEdit(item.id)}>Edit</button> */}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
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
