import { useState, useEffect } from 'react';
import style from './ContactForm.module.sass';
import PropTypes from 'prop-types';

function ContactForm ({ onSubmit, contact, onDelete, onNew }) {
  const [inputContact, setInputContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const resetState = () => {
    setInputContact({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
  };

  const onInputChange = event => {
    setInputContact({
      ...inputContact,
      [event.target.name]: event.target.value,
    });
  };

  const onInputPressClear = event => {
    setInputContact({
      ...inputContact,
      [event.target.getAttribute('name')]: '',
    });
  };

  const onFormSubmit = event => {
    event.preventDefault();
    onSubmit(inputContact);
    if (!inputContact.id) {
      resetState();
    }
  };

  const onClickNew = event => {
    event.stopPropagation();
    onNew();
    resetState();
  };

  const onDeleteInEdit = event => {
    event.stopPropagation();
    onDelete(inputContact.id);
    resetState();
  };

  useEffect(() => {
    if (contact && contact.id !== inputContact.id) {
      setInputContact(contact);
    }
  }, [contact]);

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div className={style.containerInputs}>
          <div>
            <input
              placeholder='First name'
              name='firstName'
              type='text'
              required
              value={inputContact.firstName}
              onChange={onInputChange}
            />
            <span name='firstName' onClick={onInputPressClear}>
              X
            </span>
          </div>

          <div>
            <input
              placeholder='Last name'
              name='lastName'
              type='text'
              required
              value={inputContact.lastName}
              onChange={onInputChange}
            />
            <span name='lastName' onClick={onInputPressClear}>
              X
            </span>
          </div>
          <div>
            <input
              placeholder='Email'
              name='email'
              type='email'
              required
              value={inputContact.email}
              onChange={onInputChange}
            />
            <span name='email' onClick={onInputPressClear}>
              X
            </span>
          </div>
          <div>
            <input
              placeholder='Phone'
              name='phone'
              type='tel'
              required
              value={inputContact.phone}
              onChange={onInputChange}
            />
            <span name='phone' onClick={onInputPressClear}>
              X
            </span>
          </div>
        </div>

        <div className={style.containerButtons}>
          <button type='button' onClick={onClickNew}>
            New
          </button>
          <div>
            <button>Save</button>
            {inputContact.id && (
              <button type='button' onClick={onDeleteInEdit}>
                Delete
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
