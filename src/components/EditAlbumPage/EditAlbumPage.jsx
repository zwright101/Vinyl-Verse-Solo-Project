import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function EditAlbumPage() {
  const { id } = useParams();
  const albumList = useSelector((store) => store.albumList);
  const album = albumList.find((item) => item.id === parseInt(id));

  const dispatch = useDispatch();
  const history = useHistory();

  const [artistName, setArtistName] = useState(album.artist_name);
  const [albumName, setAlbumName] = useState(album.album_name);
  const [releaseDate, setReleaseDate] = useState(album.release_date);
  const [tracklist, setTracklist] = useState(album.tracklist);
  const [imageUrl, setImageUrl] = useState(album.imageUrl);

  const handleArtistNameChange = (event) => {
    setArtistName(event.target.value);
  };

  const handleAlbumNameChange = (event) => {
    setAlbumName(event.target.value);
  };

  const handleReleaseDateChange = (event) => {
    setReleaseDate(event.target.value);
  };

  const handleTracklistChange = (event) => {
    setTracklist(event.target.value);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  }

  const handleSave = () => {
    const formattedReleaseDate = new Date(releaseDate).toISOString();
    const updatedAlbum = {
      artistName: artistName,
      albumName: albumName,
      releaseDate: formattedReleaseDate,
      tracklist: tracklist,
      imageUrl: imageUrl,
      id: id,
    };
  
    axios
      .put(`/api/collection/edit-album/${id}`, updatedAlbum)
      .then((response) => {
        dispatch({ type: 'UPDATE_EDITED_ALBUM', payload: updatedAlbum });
        history.push('/collection');
      })
      .catch((error) => {
        console.error('Error updating album:', error);
      });
  };
  


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Edit your Album</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {album.album_artwork && <img src={album.album_artwork} alt={album.album_name} style={{ width: '200px', height: '200px' }} />}
        <label>
          Artist:
          <input type="text" value={artistName} onChange={handleArtistNameChange} />
        </label>
        <label>
          Album:
          <input type="text" value={albumName} onChange={handleAlbumNameChange} />
        </label>
        <label>
          Release Date:
          <input type="text" value={releaseDate} onChange={handleReleaseDateChange} />
        </label>
        <label>
          Tracklist:
          <input type="text" value={tracklist} onChange={handleTracklistChange} />
        </label>
        <label>
          Album Artwork:
          <input type="text" value={imageUrl} onChange={handleImageUrlChange} />
        </label>
        <button onClick={handleSave}>Save</button> {/* Add the save button with the onClick event handler */}
      </div>
    </div>
  );
}

export default EditAlbumPage;
