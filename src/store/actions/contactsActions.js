import ACTION_TYPES from './actionsTypes';

export const changeOperationModeToAddition = () => {
  return {
    type: ACTION_TYPES.CHANGE_OPERATION_MODE_TO_ADDITION,
  };
};

export const choiceToEdit = id => {
  return {
    type: ACTION_TYPES.CHOICE_TO_EDIT,
    payload: id,
  };
};

export const saveContact = contact => {
  return {
    type: ACTION_TYPES.PUT_CONTACT,
    payload: contact,
  };
};

export const addContact = contact => {
  return {
    type: ACTION_TYPES.POST_CONTACT,
    payload: contact,
  };
};

export const deleteContact = id => {
  return {
    type: ACTION_TYPES.DELETE_CONTACT,
    payload: id,
  };
};

export const getContacts = contacts => {
  return {
    type: ACTION_TYPES.GET_CONTACTS,
    payload: contacts,
  };
};
