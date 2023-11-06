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

  const handleSave = () => {
    const updatedAlbum = {
      id,
      artist_name: artistName,
      album_name: albumName,
      release_date: releaseDate,
      tracklist,
      imageUrl: imageUrl
    };

    axios.put(`/edit-album/${id}`, updatedAlbum)
    .then((response) => {
    history.push('/collection');
    })
    .catch((error) => {
      console.error('Error updating album:', error);
    });


    dispatch({ type: 'UPDATE_EDITED_ALBUM', payload: updatedAlbum });
    history.push('/collection');
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
        <button onClick={handleSave}>Save</button> {/* Add the save button with the onClick event handler */}
      </div>
    </div>
  );
}

export default EditAlbumPage;
