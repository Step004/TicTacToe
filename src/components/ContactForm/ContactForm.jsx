import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

import css from "./ContactForm.module.css";
import toast from "react-hot-toast";

export default function ContactForm() {
  const dispatch = useDispatch();
  
  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        name: values.username,
        number: values.usernumber,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Contact successfully added!");
      })
      .catch((error) => {
        toast.error(`${error}!!!`);
      });
    actions.resetForm();
  };

  
  const nameFieldId = nanoid();
  const numberFieldId = nanoid();

  const FeedbackSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    usernumber: Yup.string()
      .matches(
        /^\d{3}-\d{2}-\d{2}$/,
        "Must be xxx-xx-xx"
      )
      .required("Required"),
  });

  return (
    <>
      <Formik
        initialValues={{ username: "", usernumber: "" }}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.form}>
          <div>
            <label htmlFor={nameFieldId}>Name</label>
            <Field
              className={css.field}
              id={nameFieldId}
              type="text"
              name="username"
            />
            <ErrorMessage name="username" component="span" />
          </div>

          <div>
            <label htmlFor={numberFieldId}>Number</label>
            <Field
              className={css.field}
              id={numberFieldId}
              type="tel"
              name="usernumber"
            />
            <ErrorMessage name="usernumber" component="span" />
          </div>

          <button className={css.button} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </>
  );
}
