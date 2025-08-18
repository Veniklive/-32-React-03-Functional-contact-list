import ContactItem from '../ContactItem/ContactItem';
import style from './ContactList.module.sass';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import api from '../../api/movie-service';
import { useEffect } from 'react';
import { getContacts } from '../../store/actions/contactsActions';

function ContactList ({ contacts, getContacts }) {
  useEffect(() => {
    api
      .get('/contacts')
      .then(({ data }) => {
        getContacts(data);
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

function mapStateToProps (state) {
  return {
    contacts: state.contactsList,
  };
}

const mapDispatchToProps = {
  getContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
