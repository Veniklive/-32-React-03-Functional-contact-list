import { createSlice } from '@reduxjs/toolkit';
import { EDIT_CONTACT_SLICE_NAME } from '../../constants/constants';
import { deleteContact } from './contactSlice';

const initialState = '';

const editContactSlice = createSlice({
  name: EDIT_CONTACT_SLICE_NAME,
  initialState,
  reducers: {
    setEditContactId (_, { payload }) {
      return payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(deleteContact.fulfilled, (state, { payload }) => {
      if (state === payload) {
        return '';
      }
    });
  },
});

const { actions, reducer } = editContactSlice;
export const { setEditContactId } = actions;
export default reducer;
