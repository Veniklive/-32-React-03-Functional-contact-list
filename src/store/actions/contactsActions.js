export const changeOperationModeToAddition = () => {
  return {
    type: `changeOperationModeToAddition`,
  };
};

export const choiceToEdit = id => {
  return {
    type: `choiceToEdit`,
    payload: id,
  };
};

export const saveContact = contact => {
  return {
    type: `saveContact`,
    payload: contact,
  };
};

export const deleteContact = id => {
  return {
    type: `deleteContact`,
    payload: id,
  };
};

export const getContacts = contacts => {
  return {
    type: `getContacts`,
    payload: contacts,
  };
};
