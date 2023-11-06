import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* updateAlbum(action) {
  try {
    const { id, updatedAlbum } = action.payload;
    yield axios.put(`/api/collection/${id}`, updatedAlbum);
  } catch (error) {
    console.error('Error updating album:', error);
  }
}

function* editAlbumSaga() {
  yield takeEvery('UPDATE_EDITED_ALBUM', updateAlbum);
}

export default editAlbumSaga;
