import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* addRecord(action) {
  try {
    yield axios.post('/api/collection', {
      artistName: action.payload.artistName,
      albumName: action.payload.albumName,
      releaseDate: action.payload.releaseDate,
      tracklist: action.payload.tracklist,
      imageUrl: action.payload.imageUrl,
    });
    yield put({ type: 'ADD_RECORD', payload: action.payload });
  } catch (error) {
    console.log(`Error in addRecord POST ${error}`);
  }
}

function* addRecordSaga() {
  yield takeEvery('ADD_NEW_RECORD', addRecord);
}

export default addRecordSaga;
