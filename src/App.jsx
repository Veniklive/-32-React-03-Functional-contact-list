import { ThemeProvider } from '@mui/material/styles';
import ContactForm from './components/ContactForm/ContactForm.jsx';
import ContactList from './components/ContactList/ContactList';
import style from './App.module.sass';
import { coffyTheme } from './utils/muiTheme.js';

function App () {
  return (
    <>
      <ThemeProvider theme={coffyTheme}>
        <div className={style.contactList}>
          <h1 className={style.title}>Contact list</h1>
          <div className={style.flexContainer}>
            <ContactList />
            <ContactForm />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
