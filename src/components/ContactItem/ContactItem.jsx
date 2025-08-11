import React, { Component } from 'react';
import style from './ContactItem.module.sass';

function ContactItem ({ onDelete, onChoice, contact, contactEditId }) {
  const onContactDelete = event => {
    event.stopPropagation();
    onDelete(contact.id);
  };

  return (
    <li
      onDoubleClick={() => onChoice(contact.id)}
      className={
        style.containerContactItem +
        ' ' +
        (contactEditId == contact.id ? style.edit : '')
      }
    >
      <p>
        {contact.firstName} {contact.lastName}
      </p>
      <button onClick={onContactDelete}>X</button>
    </li>
  );
}

export default ContactItem;
