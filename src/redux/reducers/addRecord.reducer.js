const initialState = {
  collection: [],
  editedAlbum: null,
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
    case 'UPDATE_EDITED_ALBUM':
      const updatedAlbum = action.payload;
      const updatedCollection = state.collection.map((item) =>
        item.id === updatedAlbum.id ? { ...item, ...updatedAlbum } : item
      );
      return {
        ...state,
        collection: updatedCollection,
        editedAlbum: updatedAlbum,
      };
    default:
      return state;
  }
};

export default addRecordReducer;
