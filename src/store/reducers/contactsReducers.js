import { contactsState } from '../../model/initialContacts';
import ACTION_TYPES from '../actions/actionsTypes';

const initialState = contactsState;

export default function contactsReducer (
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ACTION_TYPES.POST_CONTACT:
      return [...state, payload];

    case ACTION_TYPES.PUT_CONTACT:
      return state.map(item => (item.id === payload.id ? payload : item));

    case ACTION_TYPES.DELETE_CONTACT:
      return state.filter(contact => contact.id !== payload);

    case ACTION_TYPES.GET_CONTACTS:
      return [...payload];

    default:
      return state;
  }
}
