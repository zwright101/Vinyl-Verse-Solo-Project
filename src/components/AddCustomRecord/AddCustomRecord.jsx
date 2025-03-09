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

  // Autofill fields when a user selects an album, but allow manual editing
  const handleAlbumSelect = (selectedAlbum) => {
    setAlbum((prevAlbum) => ({
      ...prevAlbum, // Keep any manually typed values
      artistName: selectedAlbum.artist || "Unknown",
      albumName: selectedAlbum.title,
      releaseDate: selectedAlbum.year ? selectedAlbum.year.toString() : "",
      imageUrl: selectedAlbum.cover_image || "",
      tracklist: selectedAlbum.tracklist ? selectedAlbum.tracklist.join(",") : "",
    }));
    setSearchResults([]); // Clear search results after selection
  };

  // Update specific field in album object when typing manually
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlbum((prevAlbum) => ({
      ...prevAlbum,
      [name]: value,
    }));
  };

  // Submit the selected or manually entered album to the collection
  const submitRecord = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_NEW_RECORD", payload: album });

    // Reset form fields
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
      <p>Enter the artist name or album title to find your record</p>

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
      

      <p>Or manually add your record information here! </p>

      {/* Manual Form Entry (Now Autofilled but Editable) */}
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
        <TextField
          label="Artist Name"
          variant="outlined"
          name="artistName"
          value={album.artistName}
          onChange={handleInputChange}
        />
        <TextField
          label="Album Name"
          variant="outlined"
          name="albumName"
          value={album.albumName}
          onChange={handleInputChange}
        />
        <TextField
          label="Release Date (Year)"
          variant="outlined"
          name="releaseDate"
          value={album.releaseDate}
          onChange={handleInputChange}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          name="imageUrl"
          value={album.imageUrl}
          onChange={handleInputChange}
        />

        {/* Display Image if URL is Provided */}
        {album.imageUrl && (
          <img
            src={album.imageUrl}
            alt="Album Cover"
            style={{ maxWidth: "100px", margin: "10px auto" }}
          />
        )}

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
