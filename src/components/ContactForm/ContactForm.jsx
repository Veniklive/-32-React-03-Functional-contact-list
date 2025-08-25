import { useState, useEffect } from 'react';
import style from './ContactForm.module.sass';
import { useSelector, useDispatch } from 'react-redux';
import { setEditContactId } from '../../store/slices/editContactSlice';
import {
  changeContact,
  addContact,
  deleteContact,
} from '../../store/slices/contactSlice';
import { Form, Field, Formik, ErrorMessage } from 'formik';
import { CONTACT_SCHEMA } from '../../utils/validate/validationSchemas';

function ContactForm () {
  const contacts = useSelector(state => state.contactList.contacts);
  const contactEditId = useSelector(state => state.contactEditId);

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

  const onClickNew = () => {
    dispatch(setEditContactId(''));
  };

  const deleteContactInEdit = values => {
    dispatch(deleteContact(values.id));
  };

  const onFormSubmit = values => {
    if (!values.id) {
      dispatch(addContact(values));
      resetState();
    } else {
      dispatch(changeContact(values));
    }
  };

  useEffect(() => {
    if (contactEditId !== inputContact.id) {
      const contact = contacts.find(contact => contact.id === contactEditId);
      if (contact) {
        setInputContact(contact);
      } else {
        resetState();
      }
    }
  }, [contacts, contactEditId]);

  return (
    <>
      <Formik
        initialValues={inputContact}
        enableReinitialize
        onSubmit={onFormSubmit}
        validationSchema={CONTACT_SCHEMA}
      >
        {formik => (
          <Form>
            <div className={style.containerInputs}>
              <div>
                <Field
                  placeholder='First name'
                  type='text'
                  name='firstName'
                  id='firstName'
                />
                <ErrorMessage name='firstName'>
                  {msg => <div className='error'>{msg}</div>}
                </ErrorMessage>
                <span
                  name='firstName'
                  onClick={() => {
                    formik.setFieldValue('firstName', '');
                    formik.setFieldError('firstName', undefined);
                    formik.setFieldTouched('firstName', false);
                  }}
                >
                  X
                </span>
              </div>

              <div>
                <Field
                  placeholder='Last name'
                  name='lastName'
                  id='lastName'
                  type='text'
                />
                <ErrorMessage name='lastName'>
                  {msg => <div className='error'>{msg}</div>}
                </ErrorMessage>
                <span
                  name='lastName'
                  onClick={() => {
                    formik.setFieldValue('lastName', '');
                    formik.setFieldError('lastName', undefined);
                    formik.setFieldTouched('lastName', false);
                  }}
                >
                  X
                </span>
              </div>

              <div>
                <Field
                  placeholder='Email'
                  name='email'
                  id='email'
                  type='email'
                />
                <ErrorMessage name='email'>
                  {msg => <div className='error'>{msg}</div>}
                </ErrorMessage>
                <span
                  name='email'
                  onClick={() => {
                    formik.setFieldValue('email', '');
                    formik.setFieldError('email', undefined);
                    formik.setFieldTouched('email', false);
                  }}
                >
                  X
                </span>
              </div>

              <div>
                <Field placeholder='Phone' name='phone' id='phone' type='tel' />
                <ErrorMessage name='phone'>
                  {msg => <div className='error'>{msg}</div>}
                </ErrorMessage>
                <span
                  name='phone'
                  onClick={() => {
                    formik.setFieldValue('phone', '');
                    formik.setFieldError('phone', undefined);
                    formik.setFieldTouched('phone', false);
                  }}
                >
                  X
                </span>
              </div>
            </div>

            <div className={style.containerButtons}>
              <button type='button' onClick={onClickNew}>
                New
              </button>
              <div>
                <button type='submit'>Save</button>
                {inputContact.id && (
                  <button type='button' onClick={deleteContactInEdit}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ContactForm;
