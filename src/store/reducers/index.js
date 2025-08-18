import { combineReducers } from 'redux';
import contactsReducer from './contactsReducers';
import editContactReducer from './editContactReducers';

export default combineReducers({
  contactsList: contactsReducer,
  contactEditId: editContactReducer,
});
