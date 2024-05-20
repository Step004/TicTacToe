import { Field, Form, Formik } from "formik";
import css from "./UpdateContact.module.css";

export default function UpdateContact({ handleUpdate, onClose }) {
  return (
    <div className={css.window}>
      <p>Update Contact Information</p>
      <Formik
        initialValues={{
          name: "",
          number: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleUpdate(values);
          setSubmitting(false);
          onClose();
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.form} autoComplete="off">
            <label className={css.label}>
              Name
              <Field type="text" name="name" />
            </label>
            <label className={css.label}>
              Number
              <Field type="text" name="number" />
            </label>
            <button type="submit" disabled={isSubmitting}>
              Update
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
