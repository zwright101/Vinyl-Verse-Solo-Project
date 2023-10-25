import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* addRecord(action) {
    try {
        yield axios.post('/api/collection', action.payload);
        yield put({ type: 'ADD_RECORD', payload: action.payload})
    } catch (error) {
        console.log(`Error in addRecord POST ${error}`);
    }
}

function* addRecordSaga() {
    yield takeEvery('ADD_RECORD', addRecord)
}

export default addRecordSaga