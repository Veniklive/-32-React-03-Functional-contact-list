import style from './ContactItem.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../store/slices/contactSlice';
import { setEditContactId } from '../../store/slices/editContactSlice';

function ContactItem ({ contact }) {
  const contactEditId = useSelector(state => state.contactEditId);

  const dispatch = useDispatch();
  const onContactDelete = event => {
    event.stopPropagation();
    dispatch(deleteContact(contact.id));
  };

  return (
    <li
      onDoubleClick={() => dispatch(setEditContactId(contact.id))}
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
