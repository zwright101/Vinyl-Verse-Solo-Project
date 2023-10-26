import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CollectionPage() {
  const dispatch = useDispatch();
  const collection = useSelector((store) => store.albumList);

  useEffect(() => {
    getAlbumList();
  }, []);

  const getAlbumList = () => {
    dispatch({ type: 'FETCH_ALBUM_LIST' });
  };

  return (
    <div>
      <h2>Collection</h2>
      <ul>
        {collection.map(item => (
          <li key={item.id}>
            {/* Display the item details here */}
            <p>Artist: {item.artist_name}</p>
            <p>Album: {item.album_name}</p>
            <p>Release Date: {item.release_date}</p>
            <p>Tracklist: {item.tracklist}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CollectionPage;
