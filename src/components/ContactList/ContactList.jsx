import ContactItem from '../ContactItem/ContactItem';
import style from './ContactList.module.sass';
import PropTypes from 'prop-types';

function ContactList ({ contacts, contactEditId, onChoice, onDelete }) {
  return (
    <>
      <ul className={style.containerContacts}>
        {contacts.map(contact => {
          return (
            <ContactItem
              contactEditId={contactEditId}
              key={contact.id}
              contact={contact}
              onChoice={onChoice}
              onDelete={onDelete}
            />
          );
        })}
      </ul>
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.number.isRequired,
    })
  ).isRequired,
};

ContactList.defaultProps = {
  contacts: [],
};

export default ContactList;
