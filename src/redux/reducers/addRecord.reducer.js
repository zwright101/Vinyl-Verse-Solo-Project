const initialState = {
  collection: [],
  editedAlbum: null, // Add this property to store the album being edited
};

const addRecordReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_RECORD':
      return {
        ...state,
        collection: [...state.collection, action.payload],
      };
    case 'SET_EDITED_ALBUM':
      return {
        ...state,
        editedAlbum: action.payload,
      };
    default:
      return state;
  }
};

export default addRecordReducer;
