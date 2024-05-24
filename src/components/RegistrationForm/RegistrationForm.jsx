import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";
import toast from "react-hot-toast";
import { FaUser, FaLock } from "react-icons/fa";
import { createGameInfo } from "../../redux/contacts/operations";

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then((response) => {
        const gameInfo = { username: response.username, time: 0, victory: 0, allGames:0 };
        dispatch(createGameInfo(gameInfo));
        toast.success("Success!!!");
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
          <p className={css.heading}>Registration</p>
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
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}
