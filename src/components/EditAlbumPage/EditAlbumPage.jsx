import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditAlbumPage() {
  const { id } = useParams();
  const albumList = useSelector((store) => store.albumList);
  const album = albumList.find((item) => item.id === parseInt(id));
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Edit your Album</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {album.album_artwork && <img src={album.album_artwork} alt={album.album_name} style={{ width: '200px', height: '200px' }} />}
        <p>Artist: {album.artist_name}</p>
        <p>Album: {album.album_name}</p>
        <p>Release Date: {album.release_date}</p>
        <p>Tracklist:</p>
        <ul style={{ textAlign: 'left' }}>
          {album.tracklist.split(',').map((track, index) => (
            <li key={index}>{track.trim()}</li>
          ))}
        </ul>
        {/* Add edit functionality here */}
      </div>
    </div>
  );
}

export default EditAlbumPage;
