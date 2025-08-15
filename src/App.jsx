import React, { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm/ContactForm.jsx';
import style from './App.module.sass';

import ContactList from './components/ContactList/ContactList';
import api from './api/movie-service.js';

function App () {
  const [contactEditId, setContactEditId] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    api.get('/').then(({ data }) => {
      if (!data) {
        setContacts([]);
      } else {
        setContacts(data);
      }
    });
  }, []);

  const changeOperationModeToAddition = () => {
    setContactEditId('');
  };

  const choiceToEdit = id => {
    setContactEditId(id);
  };

  const saveContact = contact => {
    if (contactEditId === '') {
      api.post('/', contact).then(({ data }) => {
        setContacts(prevContacts => [...prevContacts, data]);
      });
    } else {
      api.put(`/${contact.id}`, contact).then(({ data }) => {
        setContacts(prevContacts =>
          prevContacts.map(item => (item.id === data.id ? data : item))
        );
      });
    }
  };

  const deleteContact = id => {
    api
      .delete(`/${id}`)
      .then(() => {
        setContacts(contacts.filter(contact => contact.id !== id));
        if (contactEditId === id) {
          setContactEditId('');
        }
      })
      .catch(error => console.error(error));
  };

  const getContact = () => {
    const contact = contacts.find(contact => contact.id === contactEditId);
    if (contact) {
      return contact;
    } else {
      return {
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
