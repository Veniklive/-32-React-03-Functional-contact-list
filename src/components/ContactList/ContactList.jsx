import ContactItem from '../ContactItem/ContactItem';
import style from './ContactList.module.sass';

import api from '../../api/movie-service';
import { useEffect } from 'react';
import { getContacts } from '../../store/actions/contactsActions';
import { useDispatch, useSelector } from 'react-redux';

function ContactList () {
  const contacts = useSelector(state => state.contactsList);
  const dispatch = useDispatch();
  useEffect(() => {
    api
      .get('/contacts')
      .then(({ data }) => {
        dispatch(getContacts(data));
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <ul className={style.containerContacts}>
        {contacts.map(contact => {
          return <ContactItem key={contact.id} contact={contact} />;
        })}
      </ul>
    </>
  );
}

export default ContactList;
