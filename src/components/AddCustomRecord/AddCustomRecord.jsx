import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function AddCustomRecord() {
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [tracklist, setTracklist] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const dispatch = useDispatch();

  const addRecord = (newRecord) => ({
    type: 'ADD_RECORD',
    payload: newRecord,
  });

  const submitRecord = (e) => {
    e.preventDefault();
    const newRecord = {
      artistName,
      albumName,
      releaseDate,
      tracklist,
      imageUrl,
    };
    dispatch({ type: 'ADD_NEW_RECORD', payload: newRecord });
    setArtistName('');
    setAlbumName('');
    setReleaseDate('');
    setTracklist('');
    setImageUrl('');
    handleSnackbarOpen('Record added to your collection!');
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Add a Record!</h1>
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
        onSubmit={submitRecord}
      >
        <TextField
          label="Artist Name"
          variant="outlined"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
        <TextField
          label="Album Name"
          variant="outlined"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />
        <TextField
          label="Release Date"
          variant="outlined"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
        <TextField
          label="Tracklist"
          variant="outlined"
          multiline
          rows={12}
          value={tracklist}
          onChange={(e) => setTracklist(e.target.value)}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#192B3E',
              '&:hover': {
                backgroundColor: '#0F1722',
              },
            }}
          >
            Add Record
          </Button>
        </Box>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default AddCustomRecord;
