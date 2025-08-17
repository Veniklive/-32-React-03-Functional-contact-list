import { contactsState } from '../../model/initialContacts';

const initialState = {
  contacts: contactsState,
  contactEditId: '',
};

export default function contactsReducer (
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case `changeOperationModeToAddition`:
      return { ...state, contactEditId: '' };

    case `choiceToEdit`:
      return { ...state, contactEditId: payload };

    case `saveContact`:
      if (state.contactEditId === '') {
        return { ...state, contacts: [...state.contacts, payload] };
      } else {
        return {
          ...state,
          contacts: state.contacts.map(item =>
            item.id === payload.id ? payload : item
          ),
        };
      }

    case `deleteContact`:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== payload),
        contactEditId:
          state.contactEditId === payload.id ? '' : state.contactEditId,
      };

    case `getContacts`:
      return { ...state, contacts: payload, contactEditId: '' };

    default:
      return state;
  }
}
