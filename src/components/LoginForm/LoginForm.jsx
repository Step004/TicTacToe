import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { logIn } from "../../redux/auth/operations";
import { FaUser, FaLock } from "react-icons/fa";
import css from "./LoginForm.module.css";

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then((response) => {
        console.log(response);
        toast.success(`${response.message}!!!`);
      })
      .catch((error) => {
        console.log(error);
        toast.error(`${error}!!!`);
      });

    actions.resetForm();
  };

  return (
    <div className={css.container}>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form className={css.form_main} autoComplete="off">
          <p className={css.heading}>Login</p>
          <div className={css.inputContainer}>
            <FaUser className={css.inputIcon} />
            <Field
              type="text"
              name="username"
              className={css.inputField}
              placeholder="Username"
            />
          </div>
          <div className={css.inputContainer}>
            <FaLock className={css.inputIcon} />
            <Field
              type="password"
              name="password"
              className={css.inputField}
              placeholder="Password"
            />
          </div>
          <button type="submit" className={css.button}>
            Log In
          </button>
          <a className={css.forgotLink} href="#">
            Forgot your password?
          </a>
        </Form>
      </Formik>
    </div>
  );
}
