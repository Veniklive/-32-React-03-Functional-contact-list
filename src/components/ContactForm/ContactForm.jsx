import { useState, useEffect } from 'react';
import style from './ContactForm.module.sass';
import { useSelector, useDispatch } from 'react-redux';
import { setEditContactId } from '../../store/slices/editContactSlice';
import {
  changeContact,
  addContact,
  deleteContact,
} from '../../store/slices/contactSlice';
import { Form, Field, Formik } from 'formik';
import { CONTACT_SCHEMA } from '../../utils/validate/validationSchemas';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { coffyTheme } from '../../utils/muiTheme';

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

  const deleteContactInEdit = () => {
    dispatch(deleteContact(contactEditId));
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
    <ThemeProvider theme={coffyTheme}>
      <Formik
        initialValues={inputContact}
        enableReinitialize
        onSubmit={onFormSubmit}
        validationSchema={CONTACT_SCHEMA}
      >
        {formik => {
          const clearInput = inputName => {
            formik.setFieldValue(inputName, '');
            formik.setFieldError(inputName, undefined);
            formik.setFieldTouched(inputName, false);
          };
          return (
            <>
              <Form>
                <div className={style.containerInputs}>
                  <div>
                    <Field
                      as={TextField}
                      variant='filled'
                      fullWidth
                      placeholder='First name'
                      type='text'
                      name='firstName'
                      id='firstName'
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                    />
                    <ClearIcon
                      name='firstName'
                      onClick={() => {
                        clearInput('firstName');
                      }}
                    />
                  </div>

                  <div>
                    <Field
                      as={TextField}
                      variant='filled'
                      fullWidth
                      placeholder='Last name'
                      name='lastName'
                      id='lastName'
                      type='text'
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                    />
                    <ClearIcon
                      name='lastName'
                      onClick={() => {
                        clearInput('lastName');
                      }}
                    />
                  </div>

                  <div>
                    <Field
                      as={TextField}
                      variant='filled'
                      fullWidth
                      placeholder='Email'
                      name='email'
                      id='email'
                      type='email'
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    <ClearIcon
                      name='email'
                      onClick={() => {
                        clearInput('email');
                      }}
                    />
                  </div>

                  <div>
                    <Field
                      as={TextField}
                      variant='filled'
                      fullWidth
                      placeholder='Phone'
                      name='phone'
                      id='phone'
                      type='tel'
                      error={
                        formik.touched.phone && Boolean(formik.errors.phone)
                      }
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                    <ClearIcon
                      name='phone'
                      onClick={() => {
                        clearInput('phone');
                      }}
                    />
                  </div>
                </div>

                <div className={style.containerButtons}>
                  <Button
                    variant='outlined'
                    startIcon={<NoteAddIcon />}
                    type='button'
                    onClick={onClickNew}
                  >
                    New
                  </Button>
                  <div>
                    <Button
                      variant='outlined'
                      startIcon={<SaveIcon />}
                      type='submit'
                    >
                      Save
                    </Button>
                    {inputContact.id && (
                      <Button
                        variant='outlined'
                        startIcon={<DeleteIcon />}
                        type='button'
                        onClick={deleteContactInEdit}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </ThemeProvider>
  );
}

export default ContactForm;
