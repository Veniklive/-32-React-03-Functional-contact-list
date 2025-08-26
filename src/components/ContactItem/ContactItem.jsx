import style from './ContactItem.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../store/slices/contactSlice';
import { setEditContactId } from '../../store/slices/editContactSlice';
import { ThemeProvider } from '@mui/material/styles';
import { coffyTheme } from '../../utils/muiTheme';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function ContactItem ({ contact }) {
  const contactEditId = useSelector(state => state.contactEditId);

  const dispatch = useDispatch();
  const onContactDelete = event => {
    event.stopPropagation();
    dispatch(deleteContact(contact.id));
  };

  return (
    <ThemeProvider theme={coffyTheme}>
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
        <DeleteForeverIcon color='secondary' onClick={onContactDelete} />
      </li>
    </ThemeProvider>
  );
}

export default ContactItem;
