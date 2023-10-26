import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useHistory } from 'react-router-dom';

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
      tracklist
    };
    dispatch({ type: 'ADD_NEW_RECORD', payload: newRecord });
    setArtistName('');
    setAlbumName('');
    setReleaseDate('');
    setTracklist('');
  };

  

  return (
    <form onSubmit={submitRecord}>
      <input
        type="text"
        placeholder="Artist Name"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Album Name"
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Release Date"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tracklist"
        value={tracklist}
        onChange={(e) => setTracklist(e.target.value)}
      />
      <button type="submit">Add Vinyl Record</button>
    </form>
  );
}

export default AddCustomRecord;
