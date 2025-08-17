import ContactForm from './components/ContactForm/ContactForm.jsx';
import ContactList from './components/ContactList/ContactList';
import style from './App.module.sass';

function App () {
  return (
    <>
      <div className={style.contactList}>
        <h1 className={style.title}>Contact list</h1>
        <div className={style.flexContainer}>
          <ContactList />
          <ContactForm />
        </div>
      </div>
    </>
  );
}

export default App;
