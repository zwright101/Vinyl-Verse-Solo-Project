import { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function AddCustomRecord() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [album, setAlbum] = useState({
    artistName: "",
    albumName: "",
    releaseDate: "",
    imageUrl: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const dispatch = useDispatch();

  // Search for albums using Discogs API
  const searchAlbums = async () => {
    if (!searchQuery) return;

    try {
      const response = await fetch(`/albums?search=${searchQuery}&limit=10`);
      const data = await response.json();
      setSearchResults(data); // Store search results
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  // Autofill the form when a user selects an album
  const handleAlbumSelect = (selectedAlbum) => {
    setAlbum({
      artistName: selectedAlbum.artist || "Unknown",
      albumName: selectedAlbum.title,
      releaseDate: selectedAlbum.year || "N/A",
      imageUrl: selectedAlbum.cover_image || "",
      tracklist: selectedAlbum.tracklist || [],
    });
    setSearchResults([]); // Clear search results after selection
  };

  // Submit the selected album to the collection
  const submitRecord = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_NEW_RECORD", payload: album });

    setAlbum({ artistName: "", albumName: "", releaseDate: "", imageUrl: "" });
    handleSnackbarOpen("Record added to your collection!");
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Add a Record!</h1>

      {/* Search Box for Discogs API */}
      <Box sx={{ maxWidth: 400, margin: "auto" }}>
        <TextField
          label="Search Album"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
        <Button onClick={searchAlbums} variant="contained" sx={{ mt: 1 }}>
          Search
        </Button>
      </Box>

      {/* Display Search Results */}
      {searchResults.length > 0 && (
        <Box sx={{ maxWidth: 400, margin: "auto", mt: 2 }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {searchResults.map((album) => (
              <li
                key={album.id}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                }}
                onClick={() => handleAlbumSelect(album)}
              >
                <strong>{album.title}</strong> ({album.year})
                {album.cover_image && (
                  <img
                    src={album.cover_image}
                    alt={album.title}
                    style={{ width: "50px", marginLeft: "10px" }}
                  />
                )}
              </li>
            ))}
          </ul>
        </Box>
      )}

      <br />

      {/* Manual Form Entry (Now Autofilled) */}
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { mb: 2 },
          display: "flex",
          flexDirection: "column",
          maxWidth: 300,
          margin: "auto",
        }}
        onSubmit={submitRecord}
      >
        <TextField label="Artist Name" variant="outlined" value={album.artistName} readOnly />
        <TextField label="Album Name" variant="outlined" value={album.albumName} readOnly />
        <TextField label="Release Date" variant="outlined" value={album.releaseDate} readOnly />
        {album.imageUrl && <img src={album.imageUrl} alt="Album Cover" style={{ maxWidth: "100px", margin: "10px auto" }} />}
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained">
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
