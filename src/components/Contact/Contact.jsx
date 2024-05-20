import css from "./Contact.module.css";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact, updateContact } from "../../redux/contacts/operations";
import ModalWindow from "../ModalWindow/ModalWindow";
import UpdateContact from "../UpdateContact/UpdateContact";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact({ contact: { id, name, number } }) {
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success("Contact successfully deleted!");
      })
      .catch((error) => {
        toast.error(`${error}!!!`);
      });
    setIsDeleteModalOpen(false);
  };

  const handleUpdate = (values) => {
    dispatch(updateContact({ id, ...values }))
      .unwrap()
      .then(() => {
        toast.success("Contact successfully updated!");
      })
      .catch((error) => {
        toast.error(`${error}!!!`);
      });
    setIsUpdateModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setIsUpdateModalOpen(false);
  };

  return (
    <div className={css.contactCard}>
      <div>
        <p className={css.name}>
          <FaUser />
          {name}
        </p>
        <p className={css.number}>
          <FaPhoneAlt />
          {number}
        </p>
      </div>
      <div className={css.buttons}>
        <button className={css.button} onClick={handleOpenUpdateModal}>
          Update
        </button>
        <button className={css.button} onClick={handleOpenDeleteModal}>
          Delete
        </button>
      </div>
      {isDeleteModalOpen && (
        <>
          <div className={css.backdrop} onClick={handleCloseModal}></div>
          <ModalWindow onConfirm={handleDelete} onClose={handleCloseModal} />
        </>
      )}
      {isUpdateModalOpen && (
        <>
          <div className={css.backdrop} onClick={handleCloseModal}></div>
          <UpdateContact
            handleUpdate={handleUpdate}
            onClose={handleCloseModal}
          />
        </>
      )}
    </div>
  );
}
