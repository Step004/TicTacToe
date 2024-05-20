import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css"
import {  selectFilteredContacts } from "../../redux/contacts/selectors";


export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);
 
  return (
    <>
      <ul className={css.cardList}>
        {contacts.map((contact) => (
          <li className={css.card} key={contact.id}>
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    </>
  );
}
