import React, { Component, useEffect, useState } from 'react';
import ContactForm from './components/ContactForm/ContactForm.jsx';
import style from './App.module.sass';

import ContactList from './components/ContactList/ContactList';

function App () {
  const [contactEditId, setContactEditId] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const localStorageContacts = JSON.parse(localStorage.getItem('contacts'));
    if (!localStorageContacts) {
      setContacts([]);
    } else {
      setContacts(localStorageContacts);
    }
  }, []);

  const changeOperationModeToAddition = () => {
    setContactEditId('');
  };

  const choiceToEdit = id => {
    setContactEditId(id);
  };

  const saveContact = contact => {
    setContacts(prevContacts => {
      let updatedContacts;
      if (contactEditId === '') {
        updatedContacts = [...prevContacts, contact];
      } else {
        updatedContacts = prevContacts.map(item =>
          item.id === contact.id ? contact : item
        );
      }
      saveContactsInLocalStorage(updatedContacts);
      return updatedContacts;
    });
    setContactEditId('');
  };

  const deleteContact = id => {
    setContacts(prevContacts => {
      const updatedContacts = prevContacts.filter(contact => contact.id !== id);
      saveContactsInLocalStorage(updatedContacts);
      return updatedContacts;
    });
    setContactEditId('');
  };

  const saveContactsInLocalStorage = newState => {
    localStorage.setItem(`contacts`, JSON.stringify(newState));
  };

  const getContact = () => {
    const contact = contacts.find(contact => contact.id === contactEditId);
    if (contact) {
      return contact;
    } else {
      return {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      };
    }
  };

  return (
    <>
      <div className={style.contactList}>
        <h1 className={style.title}>Contact list</h1>
        <div className={style.flexContainer}>
          <ContactList
            contacts={contacts}
            contactEditId={contactEditId}
            onChoice={choiceToEdit}
            onDelete={deleteContact}
          />
          <ContactForm
            contact={getContact()}
            onSubmit={saveContact}
            onDelete={deleteContact}
            onNew={changeOperationModeToAddition}
          />
        </div>
      </div>
    </>
  );
}

export default App;
