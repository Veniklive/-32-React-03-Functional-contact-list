import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './slices/contactSlice';
import editContactSlice from './slices/editContactSlice';

export default configureStore({
  reducer: { contactList: contactReducer, contactEditId: editContactSlice },
});
