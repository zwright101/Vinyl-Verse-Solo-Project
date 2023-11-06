import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
        <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Edit your Album</h2>
        <br />
        <br />
        <Box
            component="form"
            sx={{
            '& .MuiTextField-root': { mb: 2 },
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 300,
            margin: 'auto',
            }}
        >
            <TextField
            label="Artist Name"
            variant="outlined"
            value={artistName}
            onChange={handleArtistNameChange}
            />
            <TextField
            label="Album Name"
            variant="outlined"
            value={albumName}
            onChange={handleAlbumNameChange}
            />
            <TextField
            label="Release Date"
            variant="outlined"
            value={releaseDate}
            onChange={handleReleaseDateChange}
            />
            <TextField
            label="Tracklist"
            variant="outlined"
            multiline
            rows={12}
            value={tracklist}
            onChange={handleTracklistChange}
            />
            <TextField
            label="Image URL"
            variant="outlined"
            value={imageUrl}
            onChange={handleImageUrlChange}
            />
            <Box sx={{ mt: 2 }}>
            <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                backgroundColor: '#192B3E',
                '&:hover': {
                    backgroundColor: '#0F1722',
                },
                }}
            >
                Save
            </Button>
            </Box>
        </Box>
        </div>
    );
}

export default EditAlbumPage;
