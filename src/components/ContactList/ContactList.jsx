import ContactItem from '../ContactItem/ContactItem';
import style from './ContactList.module.sass';
import { useEffect } from 'react';
import { getContacts } from '../../store/slices/contactSlice';
import { useDispatch, useSelector } from 'react-redux';

function ContactList () {
  const contacts = useSelector(state => state.contactList.contacts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContacts());
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
