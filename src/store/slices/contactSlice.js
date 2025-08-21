import { createSlice, createAsyncThunk, isPending } from '@reduxjs/toolkit';
import { contactsState } from '../../model/initialContacts';
import { CONTACT_SLICE_NAME } from '../../constants/constants';
import api from '../../api/contact-service';

const initialState = { contacts: contactsState, isPending: false, error: null };

export const getContacts = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/getContacts`,
  async function (_, { rejectWithValue }) {
    try {
      const response = await api.get(`/${CONTACT_SLICE_NAME}`);
      if (response.status >= 400) {
        throw new Error('Failed to fetch contacts');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/deleteContact`,
  async (contactId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/${CONTACT_SLICE_NAME}/${contactId}`);
      if (response.status >= 400) {
        throw new Error('Failed to delete contact');
      }
      return contactId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeContact = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/changeContact`,
  async (contact, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/${CONTACT_SLICE_NAME}/${contact.id}`,
        contact
      );
      if (response.status >= 400) {
        throw new Error('Failed to update contact');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  `${CONTACT_SLICE_NAME}/addContact`,
  async (contact, { rejectWithValue }) => {
    try {
      const response = await api.post(`/${CONTACT_SLICE_NAME}`, contact);
      if (response.status >= 400) {
        throw new Error('Failed to create contact');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const contactSlice = createSlice({
  name: CONTACT_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getContacts.fulfilled, (state, { payload }) => {
        state.contacts = payload;
        state.error = null;
        state.isPending = false;
      })
      .addCase(getContacts.pending, state => {
        state.error = null;
        state.isPending = true;
      })
      .addCase(getContacts.rejected, (state, { payload }) => {
        state.error = payload;
        state.isPending = false;
      })

      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts.push(payload);
        state.error = null;
        state.isPending = false;
      })
      .addCase(addContact.pending, state => {
        state.error = null;
        state.isPending = true;
      })
      .addCase(addContact.rejected, (state, { payload }) => {
        state.error = payload;
        state.isPending = false;
      })

      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.contacts = state.contacts.filter(
          contact => contact.id !== payload
        );
        state.error = null;
        state.isPending = false;
      })
      .addCase(deleteContact.pending, state => {
        state.error = null;
        state.isPending = true;
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.error = payload;
        state.isPending = false;
      })

      .addCase(changeContact.fulfilled, (state, { payload }) => {
        state.contacts = state.contacts.map(contact =>
          contact.id === payload.id ? payload : contact
        );
        state.error = null;
        state.isPending = false;
      })
      .addCase(changeContact.pending, state => {
        state.error = null;
        state.isPending = true;
      })
      .addCase(changeContact.rejected, (state, { payload }) => {
        state.error = payload;
        state.isPending = false;
      });
  },
});

const { reducer } = contactSlice;

export default reducer;
export const contactSliceName = CONTACT_SLICE_NAME;
