import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactForm from "../../components/ContactForm/ContactForm";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";


export default function ContactsPage() {
 const dispatch = useDispatch();
 useEffect(() => {
   dispatch(fetchContacts());
 }, [dispatch]);

  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && <div> loading...</div>}
      {isError && <div>Some error...</div>}
      <ContactList />
    </>
  );
}
