import style from './ContactItem.module.sass';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  deleteContact,
  choiceToEdit,
} from '../../store/actions/contactsActions';
import api from '../../api/movie-service';

function ContactItem ({ contact, contactEditId, deleteContact, choiceToEdit }) {
  const dispatch = useDispatch();
  const onContactDelete = event => {
    event.stopPropagation();
    api
      .delete(`/contacts/${contact.id}`)
      .then(deleteContact(contact.id))
      .catch(error => console.error(error));
  };

  return (
    <li
      onDoubleClick={() => choiceToEdit(contact.id)}
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

function mapStateToProps (state) {
  return {
    contactEditId: state.contactEditId,
  };
}

const mapDispatchToProps = { choiceToEdit, deleteContact };

export default connect(mapStateToProps, mapDispatchToProps)(ContactItem);
