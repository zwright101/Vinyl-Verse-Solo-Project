import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// GET
function* getAlbumList() {
    try {
        console.log('Fetching album list...'); // Add this console log
        let response = yield axios.get('/api/collection');
        console.log('Fetched album list:', response.data);
        yield put({ type: 'SET_ALBUM_LIST', payload: response.data });
    } catch (error) {
        console.log('Error in getAlbumList', error);
        alert('Something went wrong');
    }
}

// EDIT
function* editAlbum(action) {
    try {
        const updatedAlbum = action.payload;
        yield axios.put(`/api/collection/edit-album/${updatedAlbum.id}`, updatedAlbum);
        yield put({ type: 'FETCH_ALBUM_LIST' }); // Refresh the album list after editing
    } catch (error) {
        console.log('Error in editAlbum', error);
        alert('Failed to edit album');
    }
}

// DELETE
function* deleteAlbum(action) {
    try {
        const albumId = action.payload;
        yield axios.delete(`/api/collection/${albumId}`);
        yield put({ type: 'FETCH_ALBUM_LIST' }); // Refresh the album list after deletion
    } catch (error) {
        console.log('Error in deleteAlbum', error);
        alert('Failed to delete album');
    }
}

function* collectionSaga() {
    yield takeLatest('FETCH_ALBUM_LIST', getAlbumList);
    yield takeLatest('DELETE_ALBUM', deleteAlbum);
    yield takeLatest('EDIT_ALBUM', editAlbum); // Add this line to call editAlbum on 'EDIT_ALBUM' action
}

export default collectionSaga;
