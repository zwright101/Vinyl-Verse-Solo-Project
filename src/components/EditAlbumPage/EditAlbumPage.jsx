import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function EditAlbumPage(props) {
  const store = useSelector((store) => store);
  const [album, setAlbum] = useState(null);
  const [heading, setHeading] = useState('Edit your Album');

  useEffect(() => {
    const id = props.match.params.id;
    fetchAlbum(id);
  }, [props.match.params.id]);

  const fetchAlbum = async (id) => {
    try {
      const response = await axios.get(`/api/edit-album/${id}`);
      setAlbum(response.data);
    } catch (error) {
      console.error('Error fetching album for editing: ', error);
    }
  };

  return (
    <div>
      <h2>{heading}</h2>
      {album && (
        <div>
          <p>Artist: {album.artistName}</p>
          <p>Album Name: {album.albumName}</p>
          <p>Release Date: {album.releaseDate}</p>
          {/* Add other album details here */}
        </div>
      )}
    </div>
  );
}

export default EditAlbumPage;
