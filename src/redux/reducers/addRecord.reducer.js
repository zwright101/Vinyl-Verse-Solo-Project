const initialState = {
    collection: [],
  };
  
  const addRecordReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_RECORD':
        return {
          ...state,
          collection: [...state.collection, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default addRecordReducer;