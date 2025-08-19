import style from './ContactItem.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContact,
  choiceToEdit,
} from '../../store/actions/contactsActions';
import api from '../../api/movie-service';

function ContactItem ({ contact }) {
  const contactEditId = useSelector(state => state.contactEditId);

  const dispatch = useDispatch();
  const onContactDelete = event => {
    event.stopPropagation();
    api
      .delete(`/contacts/${contact.id}`)
      .then(dispatch(deleteContact(contact.id)))
      .catch(error => console.error(error));
  };

  return (
    <li
      onDoubleClick={() => dispatch(choiceToEdit(contact.id))}
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
