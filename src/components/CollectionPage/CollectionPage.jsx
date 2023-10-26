import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

  const ImageCard = ({ item }) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleCardClick = () => {
      setShowDetails(!showDetails);
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
        <img src={item.image_url} alt={item.album_name} style={{ width: '100px', height: '100px' }} />
        {showDetails && (
          <div>
            <p>Artist: {item.artist_name}</p>
            <p>Album: {item.album_name}</p>
            <p>Release Date: {item.release_date}</p>
            <p>Tracklist: {item.tracklist}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h2>My Collection</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {userCollection.map((item, index) => (
          <ImageCard key={item.id || index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default CollectionPage;
