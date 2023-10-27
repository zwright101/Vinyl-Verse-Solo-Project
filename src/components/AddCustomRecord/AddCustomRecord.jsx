import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function AddCustomRecord() {
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [tracklist, setTracklist] = useState('');

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
    };
    dispatch({ type: 'ADD_NEW_RECORD', payload: newRecord });
    setArtistName('');
    setAlbumName('');
    setReleaseDate('');
    setTracklist('');
  };

  return (
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
      <Box sx={{ mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#192B3E",
            '&:hover': {
              backgroundColor: "#0F1722",
            },
          }}
        >
          Add Record
        </Button>
      </Box>
    </Box>
  );
}

export default AddCustomRecord;
