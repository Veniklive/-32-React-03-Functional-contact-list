import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import style from './ContactForm.module.sass';
import PropTypes from 'prop-types';
import api from './../../api/movie-service';

import { connect } from 'react-redux';
import {
  saveContact,
  deleteContact,
  changeOperationModeToAddition,
} from '../../store/actions/contactsActions';

function ContactForm ({
  saveContact,
  contacts,
  contactEditId,
  deleteContact,
  changeOperationModeToAddition,
}) {
  const dispatch = useDispatch();
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
    if (!inputContact.id) {
      api
        .post('/contacts', inputContact)
        .then(({ data }) => saveContact(data))
        .catch(error => console.error(error));
      resetState();
    } else {
      api
        .put(`/contacts/${inputContact.id}`, inputContact)
        .then(({ data }) => saveContact(data))
        .catch(error => console.error(error));
    }
  };

  const onClickNew = event => {
    event.stopPropagation();
    changeOperationModeToAddition();
    resetState();
  };

  const deleteContactInEdit = event => {
    event.stopPropagation();
    api
      .delete(`/contacts/${inputContact.id}`)
      .then(({ status }) => {
        console.log(status);
      })
      .catch(error => console.error(error));
    dispatch(deleteContact(inputContact.id));
    resetState();
  };

  useEffect(() => {
    const contact = contacts.find(contact => contact.id === contactEditId);
    if (contact) {
      setInputContact(contact);
    } else if (contactEditId === inputContact.id) {
      setInputContact({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      });
    }
  }, [contacts, contactEditId]);

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
              <button type='button' onClick={deleteContactInEdit}>
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
  saveContact: PropTypes.func.isRequired,
};

function mapStateToProps (state) {
  return {
    contacts: state.contacts,
    contactEditId: state.contactEditId,
  };
}

const mapDispatchToProps = {
  saveContact,
  deleteContact,
  changeOperationModeToAddition,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
