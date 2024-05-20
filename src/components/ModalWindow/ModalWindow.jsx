import css from "./ModalWindow.module.css";

export default function ModalWindow({ onConfirm, onClose }) {
  return (
    <div className={css.window}>
      <p>Are you sure you want to delete this contact?</p>
      <div className={css.buttons}>
        <button className={css.configButton} onClick={onConfirm}>
          Yes!
        </button>
        <button className={css.configButton} onClick={onClose}>
          No!
        </button>
      </div>
    </div>
  );
}
