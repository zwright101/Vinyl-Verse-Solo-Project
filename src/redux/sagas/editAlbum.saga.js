import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* fetchAlbumForEditing(action) {
    try {
      const albumId = action.payload;
      const response = yield axios.get(`/api/collection/edit-album/${albumId}`);
      yield put({ type: 'SET_EDITED_ALBUM', payload: response.data });
    } catch (error) {
      console.error('Error fetching album for editing:', error);
    }
  }

  
  function* editAlbumSaga() {
    yield takeEvery('FETCH_ALBUM_FOR_EDITING', fetchAlbumForEditing);
  }
  
  export default editAlbumSaga;
  